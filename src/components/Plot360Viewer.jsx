import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Eye, Play, Pause, Maximize2, X, Sparkles, MapPin, ZoomIn, ZoomOut } from 'lucide-react';

// Panoramic 360 degree renders for different unit types and view modes
const PANORAMA_TEXTURES = {
  vastu: {
    '2 BHK Executive Suite': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    '3 BHK Royal Sanctuary': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    '4 BHK Duplex Penthouse': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
  },
  interior: {
    '2 BHK Executive Suite': 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
    '3 BHK Royal Sanctuary': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
    '4 BHK Duplex Penthouse': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
  },
  balcony: {
    '2 BHK Executive Suite': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
    '3 BHK Royal Sanctuary': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80',
    '4 BHK Duplex Penthouse': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
  }
};

// Interactive Hotspots per unit orientation
const HOTSPOTS_BY_FACING = {
  'East Facing (Vastu Supreme)': [
    { id: 1, angle: 45, label: 'Shirdi Sai Temple Axis (5 Mins)' },
    { id: 2, angle: 135, label: 'Sunrise Vastu Balcony Deck' },
    { id: 3, angle: 250, label: 'Private Lift Foyer Entrance' }
  ],
  'North-East Facing (Morning Sun)': [
    { id: 1, angle: 30, label: 'Morning Sun Energy Corridor' },
    { id: 2, angle: 180, label: 'VIP Temple Access Boulevard' },
    { id: 3, angle: 290, label: 'Acoustic Double-Glazed Lounge' }
  ],
  'Temple Sunrise Panoramic Facing': [
    { id: 1, angle: 10, label: '360° Temple Horizon Panorama' },
    { id: 2, angle: 120, label: 'Private Rooftop Plunge Pool' },
    { id: 3, angle: 210, label: 'Double-Height 22ft Living Ceiling' }
  ]
};

export default function Plot360Viewer({ selectedPlot }) {
  const [viewMode, setViewMode] = useState('vastu'); // 'vastu' | 'interior' | 'balcony'
  const [rotationX, setRotationX] = useState(0); // Horizontal angle (0 - 360)
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const containerRef = useRef(null);

  // Default fallback if plot is not specified
  const currentPlot = selectedPlot || {
    number: 1,
    type: '2 BHK Executive Suite',
    facing: 'East Facing (Vastu Supreme)',
    floor: 'Level 01',
    carpetArea: '1,120 Sq.Ft.',
    price: '₹ 1.15 Cr'
  };

  const imageSrc =
    PANORAMA_TEXTURES[viewMode]?.[currentPlot.type] ||
    PANORAMA_TEXTURES.vastu['2 BHK Executive Suite'];

  const hotspots =
    HOTSPOTS_BY_FACING[currentPlot.facing] ||
    HOTSPOTS_BY_FACING['East Facing (Vastu Supreme)'];

  // Auto-rotation timer loop
  useEffect(() => {
    let animationFrame;
    if (isAutoRotating && !isDragging) {
      const rotate = () => {
        setRotationX((prev) => (prev + 0.22) % 360);
        animationFrame = requestAnimationFrame(rotate);
      };
      animationFrame = requestAnimationFrame(rotate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoRotating, isDragging]);

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentClientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = currentClientX - startX;
    setRotationX((prev) => (prev - deltaX * 0.45 + 360) % 360);
    setStartX(currentClientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      id="plot-360-feature"
      style={{
        marginTop: '3rem',
        background: 'rgba(21, 19, 15, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(201, 160, 99, 0.45)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.25rem',
        color: '#FAF8F4',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.65)',
        position: 'relative'
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '1.75rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid rgba(201, 160, 99, 0.25)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-accent)',
                background: 'rgba(201, 160, 99, 0.15)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(201, 160, 99, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <RotateCcw size={12} className="spin-slow" /> 360° VIRTUAL PANORAMIC EXPERIENCE
            </span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.02em', color: '#FAF8F4', margin: 0 }}>
            360° View — Plot Unit #{currentPlot.number}
          </h3>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted-dark)' }}>
            {currentPlot.type} · {currentPlot.facing} · {currentPlot.floor}
          </span>
        </div>

        {/* View Mode Segmented Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'vastu', label: 'Vastu Horizon' },
            { id: 'interior', label: 'Interior Suite' },
            { id: 'balcony', label: 'Sky Deck' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                padding: '0.5rem 1.1rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: viewMode === mode.id ? 'var(--gold-accent)' : 'rgba(255, 255, 255, 0.08)',
                color: viewMode === mode.id ? 'var(--ink-dark)' : '#FAF8F4',
                border: viewMode === mode.id ? '1px solid var(--gold-accent)' : '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 360 Viewport Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{
          position: 'relative',
          height: '440px',
          width: '100%',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 15px 35px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(201, 160, 99, 0.3)'
        }}
      >
        {/* Dynamic 360 Panorama Texture Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: `${(rotationX / 360) * 100}% center`,
            transform: `scale(${zoomLevel})`,
            transition: isDragging ? 'none' : 'background-position 0.1s linear, transform 0.3s ease',
            filter: 'brightness(0.95) contrast(1.05)'
          }}
        />

        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 45%, rgba(15, 13, 10, 0.65) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Drag Hint */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(15, 13, 10, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '0.4rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(201, 160, 99, 0.4)',
            fontSize: '0.75rem',
            color: 'var(--gold-accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          <Eye size={14} />
          <span>CLICK & DRAG TO ROTATE 360°</span>
        </div>

        {/* Hotspots */}
        {hotspots.map((hs) => {
          const visibleAngle = ((hs.angle - rotationX + 540) % 360) - 180;
          const isVisible = visibleAngle > -80 && visibleAngle < 80;
          const leftPercent = 50 + (visibleAngle / 80) * 40;

          if (!isVisible) return null;

          return (
            <div
              key={hs.id}
              style={{
                position: 'absolute',
                top: `${48 + (hs.id % 2 === 0 ? 8 : -8)}%`,
                left: `${leftPercent}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 6,
                transition: 'all 0.1s linear'
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 13, 10, 0.88)',
                  border: '1px solid var(--gold-accent)',
                  color: '#FAF8F4',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  whiteSpace: 'nowrap'
                }}
              >
                <MapPin size={13} style={{ color: 'var(--gold-accent)' }} />
                <span>{hs.label}</span>
              </div>
            </div>
          );
        })}

        {/* Viewport Floating Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 5
          }}
        >
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            style={{
              padding: '0.5rem 0.85rem',
              background: 'rgba(15, 13, 10, 0.85)',
              border: '1px solid rgba(201, 160, 99, 0.4)',
              color: '#FAF8F4',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(12px)'
            }}
          >
            {isAutoRotating ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoRotating ? 'Pause 360°' : 'Auto Rotate'}</span>
          </button>

          <button
            onClick={() => setZoomLevel((prev) => (prev >= 1.4 ? 1 : prev + 0.2))}
            style={{
              padding: '0.5rem',
              background: 'rgba(15, 13, 10, 0.85)',
              border: '1px solid rgba(201, 160, 99, 0.4)',
              color: '#FAF8F4',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
            title="Zoom View"
          >
            {zoomLevel > 1 ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </button>

          <button
            onClick={() => setIsFullScreen(true)}
            style={{
              padding: '0.5rem 0.85rem',
              background: 'var(--gold-accent)',
              border: '1px solid var(--gold-accent)',
              color: 'var(--ink-dark)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Maximize2 size={14} />
            <span>Fullscreen 360°</span>
          </button>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div
        style={{
          marginTop: '1.25rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted-dark)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>Unit: <strong style={{ color: 'var(--gold-accent)' }}>Plot #{currentPlot.number}</strong></span>
          <span>Carpet Area: <strong style={{ color: '#FAF8F4' }}>{currentPlot.carpetArea}</strong></span>
          <span>Valuation: <strong style={{ color: 'var(--gold-accent)' }}>{currentPlot.price}</strong></span>
        </div>
      </div>

      {/* FULLSCREEN 360° TOUR MODAL */}
      {isFullScreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 13, 10, 0.96)',
            backdropFilter: 'blur(28px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.02em', color: '#FAF8F4', display: 'block' }}>
                Full-Screen 360° Tour — Plot Unit #{currentPlot.number} ({currentPlot.type})
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)' }}>
                {currentPlot.facing} · {currentPlot.carpetArea} · {currentPlot.price}
              </span>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              style={{
                padding: '0.6rem 1.25rem',
                background: 'var(--gold-accent)',
                color: 'var(--ink-dark)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <X size={16} /> Close 360° Tour
            </button>
          </div>

          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{
              flex: 1,
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
              border: '1px solid rgba(201, 160, 99, 0.4)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: `${(rotationX / 360) * 100}% center`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
