import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import BentoCard from '../components/BentoCard';
import { HERO_IMAGES } from '../assets/images';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const galleryImages = [
    {
      title: "Sky Pavilion Rooftop Lounge & Infinity View",
      category: "Exterior",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
      description: "Elevated 10,000 Sq.Ft. rooftop pavilion overlooking the Shirdi horizon."
    },
    {
      title: "Duplex Penthouse Living Foyer & Double Ceiling",
      category: "Interior",
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      description: "22ft ceiling height living lounge featuring acoustic double glazing."
    },
    {
      title: "Royal 3 BHK Master Suite & Private Sky Deck",
      category: "Interior",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      description: "Expansive master suite with Italian marble flooring and walk-in wardrobe."
    },
    {
      title: "Zen Meditation Courtyard & Water Feature",
      category: "Landscape",
      url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=85",
      description: "Tranquil outdoor zen gardens designed with Vastu alignment geometry."
    },
    {
      title: "Technogym Athletic Suite & Wellness Center",
      category: "Amenities",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85",
      description: "State-of-the-art gym equipped with commercial fitness technology."
    },
    {
      title: "Executive 2 BHK Living Lounge & Dining Suite",
      category: "Interior",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      description: "Proportioned urban suite featuring bespoke teakwood finishes."
    },
    {
      title: "Grand Entrance Plaza & Architectural Facade",
      category: "Exterior",
      url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
      description: "Modern architectural portal with biometrics and VIP security access."
    },
    {
      title: "Private Balcony Sky Deck with Temple Horizon",
      category: "Exterior",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      description: "Covered outdoor sky deck with direct views of the Sai Temple corridor."
    }
  ];

  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === filter);

  // Keyboard controls for Lightbox (Left / Right arrows & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  // Touch Swipe Handlers for Mobile Lightbox Navigation
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (selectedIndex === null || !touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 40) {
      // Swipe Right -> Previous Image
      setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    } else if (deltaX < -40) {
      // Swipe Left -> Next Image
      setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
    }
  };

  return (
    <div className="gallery-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
      {/* Full-bleed Fixed Background Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${HERO_IMAGES.galleryPageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="eyebrow-label eyebrow-clay" style={{ background: 'rgba(201, 160, 99, 0.2)', border: '1px solid rgba(201, 160, 99, 0.4)', color: 'var(--gold-accent)' }}>
              VISUAL DOCUMENTATION
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
              Architectural Gallery
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              Tap or click any photograph to expand in high-definition full-screen view.
            </p>

            {/* Category Filter Chips */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {['All', 'Interior', 'Exterior', 'Amenities', 'Landscape'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setSelectedIndex(null);
                  }}
                  className={`map-filter-chip ${filter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Gallery Cards Grid */}
          <div className="bento-grid">
            {filteredImages.map((img, i) => (
              <BentoCard
                key={i}
                span="bento-col-4"
                style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                onClick={() => setSelectedIndex(i)}
              >
                <div
                  style={{
                    position: 'relative',
                    height: '320px',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                  
                  {/* Gradient Overlay & High-Res View Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(0deg, rgba(15,13,10,0.9) 0%, rgba(15,13,10,0.2) 50%, transparent 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span
                        style={{
                          background: 'rgba(15, 13, 10, 0.75)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1px solid rgba(201, 160, 99, 0.4)',
                          color: 'var(--gold-accent)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <Eye size={13} /> TAP TO VIEW
                      </span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--gold-accent)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                        {img.category}
                      </span>
                      <h3 style={{ color: '#FAF8F4', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginTop: '0.2rem' }}>
                        {img.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL VIEWER */}
      {selectedIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(12, 10, 8, 0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'center',
            alignItems: 'center',
            padding: '1.5rem 0.75rem',
            animation: 'fadeIn 0.25s ease',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Fixed Screen-Edge Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
            }}
            className="lightbox-nav-btn lightbox-nav-left"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
            }}
            className="lightbox-nav-btn lightbox-nav-right"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Main Container Box */}
          <div
            className="lightbox-modal-content"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Lightbox Top Header Bar */}
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '1rem',
                gap: '0.75rem'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--gold-accent)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>
                  {filteredImages[selectedIndex].category} COLLECTION
                </span>
                <h2 style={{ fontSize: 'clamp(1.05rem, 3.8vw, 1.4rem)', fontFamily: 'var(--font-serif)', color: '#FAF8F4', margin: 0, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {filteredImages[selectedIndex].title}
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#FAF8F4',
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {selectedIndex + 1} / {filteredImages.length}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(null);
                  }}
                  style={{
                    padding: '0.45rem 1rem',
                    background: 'var(--gold-accent)',
                    color: 'var(--ink-dark)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    boxShadow: '0 4px 20px rgba(201, 160, 99, 0.3)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <X size={15} /> CLOSE
                </button>
              </div>
            </div>

            {/* Lightbox Main Image Viewport Area — Centered Vertically & Horizontally */}
            <div
              className="lightbox-image-wrapper"
              onClick={() => setSelectedIndex(null)}
            >
              {/* High-Resolution Responsive Image Viewport (Stops propagation so image clicks don't close) */}
              <img
                src={filteredImages[selectedIndex].url}
                alt={filteredImages[selectedIndex].title}
                className="lightbox-viewport-img"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
