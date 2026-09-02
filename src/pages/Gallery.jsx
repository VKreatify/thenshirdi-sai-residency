import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Image as ImageIcon, Play } from 'lucide-react';
import BentoCard from '../components/BentoCard';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';
import { HERO_IMAGES, SITE_GALLERY_IMAGES } from '../assets/images';

export default function Gallery() {
  const { property, content, gallery, assets } = useProperty();
  useSEO({
    title: content?.gallery?.title || 'Architectural Gallery',
    description: content?.gallery?.subtitle || property?.tagline
  });

  const galleryContent = content?.gallery || {};
  const [activeSection, setActiveSection] = useState('photos');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const galleryImages = gallery?.images || [
    {
      title: "Gated Layout Entrance Arch & Access Road",
      category: "Exterior",
      url: SITE_GALLERY_IMAGES.gallery1
    },
    {
      title: "30ft & 40ft Internal Paved Blacktop Roads",
      category: "Infrastructure",
      url: SITE_GALLERY_IMAGES.gallery2
    },
    {
      title: "Dedicated Park & Landscaping Space",
      category: "Environment",
      url: SITE_GALLERY_IMAGES.gallery3
    },
    {
      title: "Underground Drainage & Water Infrastructure",
      category: "Infrastructure",
      url: SITE_GALLERY_IMAGES.gallery4
    },
    {
      title: "Layout Perimeter Compound Wall",
      category: "Exterior",
      url: SITE_GALLERY_IMAGES.gallery5
    },
    {
      title: "Surrounding Environment & Highway Connectivity",
      category: "Environment",
      url: SITE_GALLERY_IMAGES.gallery6
    }
  ];

  const videoTour = gallery?.videoTour || {
    url: SITE_GALLERY_IMAGES.galleryVideo,
    title: `${property?.name || 'Property'} — Visual Tour & Overview`,
    description: 'Aerial drone footage and walkthrough highlighting the gated layout infrastructure, wide blacktop roads, surrounding environment, and immediate ready plots.'
  };

  const bgImage = assets?.pageBackgrounds?.gallery || HERO_IMAGES.galleryPageBg;
  const filteredImages = galleryImages;

  // Toggle video play / pause on click
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Autoplay video whenever the Video Showcase section is active
  useEffect(() => {
    if (activeSection === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else if (activeSection === 'photos' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeSection]);

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
      {/* Full-bleed Fixed Background Layer with 5px blur */}
      {bgImage && (
        <div
          style={{
            position: 'fixed',
            inset: '-10px',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(5px) brightness(0.85)',
            transform: 'scale(1.02)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
      {/* Soft atmospheric gradient tint over the blur */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(21, 19, 15, 0.35) 0%, rgba(21, 19, 15, 0.7) 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span
              className="eyebrow-label"
              style={{
                background: 'rgba(21, 19, 15, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 160, 99, 0.5)',
                color: 'var(--gold-accent)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                marginBottom: '1.25rem'
              }}
            >
              {galleryContent.eyebrow || 'VISUAL DOCUMENTATION'}
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
              {galleryContent.title || 'Architectural Gallery'}
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              {galleryContent.subtitle || 'Tap or click any photograph to expand in high-definition full-screen view.'}
            </p>

            {/* Section Switcher Tabs directly below the header content */}
            <div className="gallery-nav-group" role="tablist" aria-label="Visual Documentation Sections">
              <button
                role="tab"
                aria-selected={activeSection === 'photos'}
                onClick={() => setActiveSection('photos')}
                className={`gallery-nav-btn ${activeSection === 'photos' ? 'active' : ''}`}
              >
                <ImageIcon size={17} /> Photo Gallery
              </button>
              {videoTour?.url && (
                <button
                  role="tab"
                  aria-selected={activeSection === 'video'}
                  onClick={() => setActiveSection('video')}
                  className={`gallery-nav-btn ${activeSection === 'video' ? 'active' : ''}`}
                >
                  <Play size={17} /> Video Showcase
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Photo Gallery Bento Cards Grid */}
          <div
            className="bento-grid"
            style={{
              display: activeSection === 'photos' ? 'grid' : 'none',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            {filteredImages.map((img, i) => (
              <BentoCard
                key={img.id || i}
                span="bento-col-4"
                className="spawn-visible"
                style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                onClick={() => setSelectedIndex(i)}
              >
                <div className="gallery-card-thumb">
                  {img.url && (
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      decoding="async"
                      className="gallery-img"
                    />
                  )}

                  {/* Subtle Hover Overlay */}
                  <div className="gallery-hover-overlay">
                    <span
                      style={{
                        background: 'rgba(15, 13, 10, 0.88)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid var(--gold-accent)',
                        color: 'var(--gold-accent)',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <Eye size={15} /> TAP TO VIEW
                    </span>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>

          {/* TAB 2: Dedicated Video Showcase Section */}
          {videoTour?.url && (
            <div
              className="gallery-video-showcase"
              style={{
                display: activeSection === 'video' ? 'block' : 'none',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              <div
                className="gallery-video-player-box"
                onClick={toggleVideoPlay}
                title={isPlaying ? "Click to Pause" : "Click to Play"}
              >
                <video
                  ref={videoRef}
                  src={videoTour.url}
                  playsInline
                  autoPlay={activeSection === 'video'}
                  muted
                  loop
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                  className="gallery-video-element"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Minimalist Center Play Overlay shown when video is paused */}
                {!isPlaying && (
                  <div className="gallery-video-play-overlay">
                    <div className="gallery-video-play-icon">
                      <Play size={28} fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              <div className="gallery-video-details">
                <div>
                  <h2 className="gallery-video-title">
                    {videoTour.title || `${property?.name} — Visual Tour & Overview`}
                  </h2>
                  <p className="gallery-video-desc">
                    {videoTour.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL VIEWER */}
      {selectedIndex !== null && filteredImages[selectedIndex] && (
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
            justifyContent: 'center',
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
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '0.75rem'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, paddingTop: '0.25rem' }}>
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

            {/* Lightbox Main Image Viewport Area */}
            <div
              className="lightbox-image-wrapper"
              onClick={() => setSelectedIndex(null)}
            >
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
