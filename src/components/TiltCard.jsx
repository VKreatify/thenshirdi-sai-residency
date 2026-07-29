import React, { useRef, useState } from 'react';

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 12,
  scale = 1.025,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  showGlow = true
}) {
  const cardRef = useRef(null);
  const initialRectRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;

    // Use initial Rect baseline to prevent bounding box transform feedback jitter
    const rect = initialRectRef.current || cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`);
    if (showGlow) {
      setGlowPos({
        x: Math.max(0, Math.min(100, (x / rect.width) * 100)).toFixed(1),
        y: Math.max(0, Math.min(100, (y / rect.height) * 100)).toFixed(1),
        opacity: 0.15
      });
    }
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    if (cardRef.current) {
      initialRectRef.current = cardRef.current.getBoundingClientRect();
    }
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    initialRectRef.current = null;
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: disabled ? 'none' : transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        zIndex: isHovered && !disabled ? 25 : 1,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        boxShadow: isHovered && !disabled
          ? '0 25px 50px -12px rgba(168, 92, 60, 0.25), 0 0 30px rgba(201, 160, 99, 0.15)'
          : '0 10px 30px -10px rgba(27, 26, 23, 0.08)',
        ...style
      }}
    >
      {/* Dynamic Cursor Light Reflection Overlay */}
      {showGlow && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(201, 160, 99, 0.15) 35%, transparent 70%)`,
            opacity: glowPos.opacity,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
      {children}
    </div>
  );
}
