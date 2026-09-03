import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  depthIntensity?: number;
  id?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  depthIntensity = 10,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });

  // Spring physics for buttery-smooth responsive tilt
  const springConfig = { stiffness: 350, damping: 28, mass: 0.6 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [depthIntensity, -depthIntensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-depthIntensity, depthIntensity]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalised -0.5 to 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    setGlarePos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
      opacity: 0.15
    });
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, [mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      id={id}
      style={{ perspective: 1100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015, z: 20 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative rounded-xl transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Dynamic Specular Sheen / Ambient Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 -z-0"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent 70%)`,
            opacity: glarePos.opacity > 0 ? 1 : 0,
          }}
        />
      </motion.div>
    </div>
  );
};
