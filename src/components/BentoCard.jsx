import React, { useRef, useState } from 'react';

export default function BentoCard({
  children,
  className = '',
  span = 'bento-col-4',
  dark = false,
  tilt = true,
  spotlightSize = 400,
  spotlightColor,
  style = {},
  onClick
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });

    // Disable 3D tilt on touch devices or hover:none for glitch-free mobile scrolling
    const isTouchDevice = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    if (!tilt || isTouchDevice) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -10).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * 10).toFixed(2);

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!tilt) return;
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const baseClass = dark ? 'glass-card-dark' : 'glass-card-light';

  const defaultSpotlightColor = spotlightColor
    ? spotlightColor
    : dark
    ? 'rgba(201, 160, 99, 0.15)'
    : 'rgba(201, 160, 99, 0.12)';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${span} ${baseClass} spawn-on-scroll ${className}`}
      style={{
        position: 'relative',
        ...(tilt ? { transformStyle: 'preserve-3d' } : {}),
        transition: isHovered
          ? 'transform 0.15s ease-out, box-shadow 0.35s ease, border-color 0.35s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.5s ease',
        ...(tilt && isHovered && transform ? { transform } : {}),
        willChange: 'transform, opacity, filter',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* Radial Hover Spotlight Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(${spotlightSize}px circle at ${glowPos.x}% ${glowPos.y}%, ${defaultSpotlightColor}, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 3,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: style.justifyContent || 'inherit',
          transform: tilt && isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
          transition: 'transform 0.35s ease'
        }}
      >
        {children}
      </div>
    </div>
  );
}
