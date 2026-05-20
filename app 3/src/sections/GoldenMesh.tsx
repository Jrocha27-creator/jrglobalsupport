import { useRef, useEffect } from 'react';

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;
uniform float u_lineCount;
uniform vec2 u_mouse;
uniform float u_rotateSpeed;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

vec2 rot2(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

float rectG(vec2 p, vec2 b, float r) {
  vec2 d = abs(p) - b + vec2(r);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

void main() {
  float tm = u_time;
  float rspd = u_rotateSpeed;
  float wv = u_waveSpeed;
  vec2 FC = gl_FragCoord.xy;

  vec2 p = (FC - u_res * 0.5) / min(u_res.x, u_res.y);

  vec2 mouseOffset = vec2(u_mouse.x * 1.7, -u_mouse.y * 1.7) * 0.5;
  p = p - mouseOffset * 0.15;

  float angle = tm * 0.05 * rspd;
  float ca = cos(angle);
  float sa = sin(angle);
  float zoom = 0.58 + 0.06 * sin(tm * 0.12);
  float persp = 0.85 + 0.07 * sin(tm * 0.18 + 1.0);

  vec2 gp = p * zoom;
  gp = rot2(gp, -angle);
  gp.y *= persp;

  float wave1 = sin(tm * wv * 0.3) * 0.04;
  float wave2 = cos(tm * wv * 0.2) * 0.03;
  float px = gp.x + wave1;
  float py = gp.y + wave2;

  float sp = 1.0 / u_lineCount;
  vec2 id = floor(vec2(px, py) / sp);
  vec2 fp = mod(vec2(px, py), sp) - sp * 0.5;

  vec2 rnd = vec2(hash(id), hash(id + vec2(77.0, 33.0)));

  vec3 off;
  off.x = (rnd.x - 0.5) * 0.18;
  off.y = (rnd.y - 0.5) * 0.18;
  off.z = 0.09 + rnd.x * 0.06;

  float depth = (off.z + 0.15) / 0.4;

  off.xy = rot2(off.xy, tm * 0.08 * rspd + rnd.y * 5.0);

  float sh = 1.0 / (1.0 + off.z * 1.6);
  fp *= sh;

  float bs = sp * 0.38 * depth * sh;
  float rr = 0.012 * depth * sh;

  float d = rectG(fp + off.xy * sh, vec2(bs), rr);

  float lw = 0.0032 * sh;
  float edg = 0.006 * sh;
  float l = 1.0 - smoothstep(lw, lw + edg, abs(d));

  float cv = depth + rnd.x * 0.25;
  float hueShift = sin(tm * wv * 0.15 + rnd.y * 6.28) * 0.04;

  vec3 gold1 = vec3(0.89, 0.78, 0.52);
  vec3 gold2 = vec3(0.79, 0.66, 0.30);
  vec3 gold3 = vec3(0.96, 0.89, 0.65);

  float wm = smoothstep(0.0, 1.0, cv);
  vec3 cc = mix(gold1, gold2, wm);
  cc = mix(cc, gold3, smoothstep(0.4, 1.0, cv + hueShift) * 0.3);

  float mShift = 1.0 + (u_mouse.x + u_mouse.y) * 0.15;
  cc *= mShift;

  float fa = 0.12 * smoothstep(-0.008, 0.016, d) * depth;
  fa = min(fa, 0.08);
  float aa = l * (0.55 + 0.45 * depth);

  vec3 fcol = cc * fa + (cc + vec3(0.06, 0.04, 0.0)) * aa;

  float ao = 0.6 + 0.4 * smoothstep(-0.015, 0.0, d);
  fcol *= ao;

  vec2 gFp = fp - off.xy * sh;
  float g = exp(-dot(gFp, gFp) * 220.0 * sh) * 0.11 * depth;
  fcol += gold2 * g;

  float distToMouse = length(FC - u_mouse * u_res - u_res * 0.5);
  float prox = exp(-distToMouse * distToMouse * 0.000002);
  fcol += gold3 * prox * 0.15;

  vec3 bg = vec3(0.043, 0.067, 0.125);
  vec3 col = bg + fcol;

  vec2 vp = FC / u_res - 0.5;
  col *= 0.7 + (1.0 - dot(vp, vp) * 0.7) * 0.3;

  gl_FragColor = vec4(pow(col, vec3(0.95)), 1.0);
}
`;

export default function GoldenMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const vertS = createShader(gl.VERTEX_SHADER, VERT);
    const fragS = createShader(gl.FRAGMENT_SHADER, FRAG);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vertS);
    gl.attachShader(prog, fragS);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uWaveSpeed = gl.getUniformLocation(prog, 'u_waveSpeed');
    const uLineCount = gl.getUniformLocation(prog, 'u_lineCount');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uRotateSpeed = gl.getUniformLocation(prog, 'u_rotateSpeed');

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (cw > 0 && ch > 0) {
        targetMouseX = e.clientX / cw;
        targetMouseY = 1.0 - e.clientY / ch;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(container!.clientWidth * dpr);
      const h = Math.round(container!.clientHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
        gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      }
    }

    window.addEventListener('resize', resize);
    resize();

    function render(time: number) {
      resize();
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      gl!.uniform1f(uTime, time * 0.001);
      gl!.uniform1f(uWaveSpeed, 0.4);
      gl!.uniform1f(uLineCount, 9.0);
      gl!.uniform2f(uMouse, mouseX, mouseY);
      gl!.uniform1f(uRotateSpeed, 0.5);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      gl.deleteShader(fragS);
      gl.deleteShader(vertS);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#0B1120',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
