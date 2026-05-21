import { useEffect, useRef } from 'react';

interface HeroProps {
  lang: 'pt' | 'en';
}

const CONTENT = {
  pt: {
    label: 'ASSESSORIA INTERNACIONAL',
    headline: 'CONECTANDO VOCÊ A SOLUÇÕES JURÍDICAS, ONDE VOCÊ ESTIVER.',
    subheadline:
      'Atuamos no Brasil, Portugal e Reino Unido oferecendo suporte jurídico especializado com excelência, ética e compromisso com resultados.',
    ctaPrimary: 'NOSSOS SERVICOS',
    ctaSecondary: 'FALE CONOSCO',
    scroll: 'scroll',
  },
  en: {
    label: 'INTERNATIONAL ADVISORY',
    headline: 'CONNECTING YOU TO LEGAL SOLUTIONS, WHEREVER YOU ARE.',
    subheadline:
      'We operate in Brazil, Portugal and the United Kingdom providing specialized legal support with excellence, ethics and commitment to results.',
    ctaPrimary: 'OUR SERVICES',
    ctaSecondary: 'CONTACT US',
    scroll: 'scroll',
  },
};

// Classical Pillar Column component
function PillarColumn({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`absolute top-0 bottom-0 w-[60px] md:w-[100px] lg:w-[140px] pointer-events-none select-none ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{ perspective: '600px' }}
    >
      <div
        className={`w-full h-full relative ${side === 'left' ? 'origin-left' : 'origin-right'}`}
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              rgba(201,168,76,0.08) 0px,
              rgba(201,168,76,0.15) 8px,
              rgba(201,168,76,0.05) 16px,
              rgba(201,168,76,0.12) 24px,
              rgba(201,168,76,0.08) 32px
            )
          `,
          boxShadow: side === 'left'
            ? 'inset -10px 0 30px rgba(0,0,0,0.6), 5px 0 20px rgba(201,168,76,0.1)'
            : 'inset 10px 0 30px rgba(0,0,0,0.6), -5px 0 20px rgba(201,168,76,0.1)',
        }}
      >
        {/* Pillar flutes (vertical lines) */}
        <div className="absolute inset-0 flex justify-around opacity-30">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-[1px] h-full"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.4) 20%, rgba(201,168,76,0.3) 80%, transparent 100%)',
              }}
            />
          ))}
        </div>

        {/* Top capital */}
        <div
          className="absolute -top-4 left-0 right-0 h-10"
          style={{
            background: 'linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.12) 100%)',
            borderRadius: side === 'left' ? '0 0 50% 0' : '0 0 0 50%',
            boxShadow: '0 2px 15px rgba(201,168,76,0.15)',
          }}
        />

        {/* Bottom base */}
        <div
          className="absolute -bottom-4 left-0 right-0 h-10"
          style={{
            background: 'linear-gradient(0deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.12) 100%)',
            borderRadius: side === 'left' ? '0 50% 0 0' : '50% 0 0 0',
            boxShadow: '0 -2px 15px rgba(201,168,76,0.15)',
          }}
        />

        {/* Gold edge highlight */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] ${side === 'left' ? 'right-0' : 'left-0'}`}
          style={{
            background: 'linear-gradient(180deg, transparent 5%, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.6) 70%, transparent 95%)',
          }}
        />
      </div>
    </div>
  );
}

export default function Hero({ lang }: HeroProps) {
  const c = CONTENT[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle gold dust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initParticles() {
      particles.length = 0;
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.2,
          dx: (Math.random() - 0.5) * 0.2,
          dy: -Math.random() * 0.3 - 0.1,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(232, 213, 163, ${p.alpha})`;
        ctx!.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < -5) p.y = h;
        if (p.y > h) p.y = 0;
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', () => { resize(); initParticles(); });
    return () => { cancelAnimationFrame(raf); };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Local overlay for text readability over global justice bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(7,13,26,0.4) 0%, rgba(11,17,32,0.2) 40%, rgba(11,17,32,0.3) 60%, rgba(7,13,26,0.5) 100%)',
        }}
      />

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* Classical Pillars */}
      <PillarColumn side="left" />
      <PillarColumn side="right" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-[80px] pb-16 w-full max-w-[900px] mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] bg-[#c9a84c]" />
          <span
            className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-medium"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {c.label}
          </span>
          <span className="w-10 h-[1px] bg-[#c9a84c]" />
        </div>

        {/* Logo between pillars */}
        <div className="relative w-full max-w-[420px] mb-8">
          {/* Glow behind logo */}
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-2xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)',
              transform: 'scale(1.2)',
            }}
          />
          <img
            src="/assets/logo-symbol.jpg"
            alt="JR Global Support"
            className="relative w-full h-auto rounded-2xl"
            style={{
              filter: 'drop-shadow(0 8px 40px rgba(201,168,76,0.3)) drop-shadow(0 0 60px rgba(201,168,76,0.15))',
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className="text-white max-w-[800px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 0 60px rgba(11,17,32,0.9), 0 1px 4px rgba(0,0,0,0.9)',
          }}
        >
          {c.headline}
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 text-[#e2e8f0] max-w-[560px]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1rem',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            textShadow: '0 1px 15px rgba(0,0,0,0.8), 0 0 30px rgba(11,17,32,0.9)',
          }}
        >
          {c.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={() => handleScrollTo('services')}
            className="px-8 py-3.5 bg-[#c9a84c] text-[#0B1120] rounded-full font-semibold text-xs tracking-[0.1em] uppercase transition-all duration-200 hover:bg-[#e8d5a3] hover:shadow-[0_0_30px_rgba(201,168,76,0.35)]"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {c.ctaPrimary}
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="px-8 py-3.5 bg-transparent border-2 border-[#c9a84c] text-[#c9a84c] rounded-full font-semibold text-xs tracking-[0.1em] uppercase transition-all duration-200 hover:bg-[rgba(201,168,76,0.1)]"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {c.ctaSecondary}
          </button>
        </div>

        {/* HD Flags */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-12">
          {[
            { src: '/assets/flag-brazil-hd.png', alt: 'Brasil' },
            { src: '/assets/flag-portugal-hd.png', alt: 'Portugal' },
            { src: '/assets/flag-uk-hd.png', alt: 'Reino Unido' },
          ].map((flag) => (
            <div
              key={flag.alt}
              className="w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 border-[rgba(201,168,76,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-[rgba(201,168,76,0.7)] hover:scale-110 transition-all duration-300"
            >
              <img src={flag.src} alt={flag.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="relative w-[1px] h-10 bg-[#c9a84c]/40">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#c9a84c]"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
        <span className="text-[#c9a84c]/60 text-[10px] tracking-[0.15em] uppercase">
          {c.scroll}
        </span>
      </div>
    </section>
  );
}
