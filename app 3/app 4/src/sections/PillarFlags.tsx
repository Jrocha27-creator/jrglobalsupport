import { useMemo } from 'react';

const SLICE_COUNT = 64;
const SLICE_WIDTH = 29;
const CYLINDER_HEIGHT = 250;

interface PillarProps {
  backgroundImage: string;
  backgroundSize: string;
}

function Pillar({ backgroundImage, backgroundSize }: PillarProps) {
  const slices = useMemo(() => {
    return Array.from({ length: SLICE_COUNT }, (_, i) => {
      const angle = i * 5.625;
      const bgPosition = `${i * -10}px 0`;
      const transform = `rotateY(${angle}deg) translateZ(91px)`;
      return {
        id: i,
        transform,
        bgPosition,
        width: SLICE_WIDTH,
        height: CYLINDER_HEIGHT,
      };
    });
  }, []);

  return (
    <div className="pillar-scene" style={{ width: 200, height: CYLINDER_HEIGHT }}>
      <div
        className="pillar-cylinder"
        style={{
          width: 200,
          height: CYLINDER_HEIGHT,
          left: '50%',
          marginLeft: -100,
        }}
      >
        {slices.map((slice) => (
          <div
            key={slice.id}
            className="pillar-slice"
            style={{
              transform: slice.transform,
              width: slice.width,
              height: slice.height,
              backgroundImage,
              backgroundPosition: slice.bgPosition,
              backgroundSize,
              backfaceVisibility: 'hidden',
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface PillarFlagsProps {
  className?: string;
}

export default function PillarFlags({ className = '' }: PillarFlagsProps) {
  return (
    <div
      className={`flex items-end justify-center gap-[30px] md:gap-[60px] ${className}`}
      aria-hidden="true"
    >
      <div className="scale-50 md:scale-100 origin-bottom">
        <Pillar
          backgroundImage="url(/assets/flag-brazil.svg)"
          backgroundSize="370px 250px"
        />
      </div>
      <div className="scale-50 md:scale-100 origin-bottom">
        <Pillar
          backgroundImage="url(/assets/flag-portugal.svg)"
          backgroundSize="370px 250px"
        />
      </div>
      <div className="scale-50 md:scale-100 origin-bottom">
        <Pillar
          backgroundImage="url(/assets/flag-uk.svg)"
          backgroundSize="370px 250px"
        />
      </div>
    </div>
  );
}
