import React from 'react';

interface PaperTearDividerProps {
  className?: string;
  position?: 'top' | 'bottom';
  invert?: boolean;
}

export const PaperTearDivider: React.FC<PaperTearDividerProps> = ({
  className = '',
  position = 'bottom',
  invert = false
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height: '24px' }}
      aria-hidden="true"
    >
      {/* Torn paper serrated teeth path */}
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className={`w-full h-full text-[var(--surface)] fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)] ${
          position === 'top' ? 'rotate-180' : ''
        } ${invert ? 'scale-x-[-1]' : ''}`}
      >
        <path d="M0,0 L0,12 Q20,18 35,9 L55,16 L70,8 L95,19 L115,10 L140,18 L165,7 L190,17 L215,9 L240,18 L265,8 L290,19 L315,11 L340,18 L365,7 L390,16 L415,8 L440,19 L465,10 L490,18 L515,8 L540,17 L565,9 L590,19 L615,8 L640,17 L665,9 L690,19 L715,10 L740,18 L765,8 L790,17 L815,9 L840,18 L865,8 L890,19 L915,11 L940,17 L965,8 L990,18 L1015,10 L1040,19 L1065,9 L1090,18 L1115,8 L1140,17 L1165,10 L1185,18 L1200,12 L1200,0 Z" />
      </svg>
    </div>
  );
};
