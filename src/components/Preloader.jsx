import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import useProperty from '../hooks/useProperty';
import { HERO_IMAGES, AMENITY_IMAGES, SITE_GALLERY_IMAGES } from '../assets/images';

export default function Preloader({ onComplete }) {
  const [assetProgress, setAssetProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [videoPlaybackFailed, setVideoPlaybackFailed] = useState(false);

  const videoRef = useRef(null);
  const { property, legal, assets } = useProperty();

  // 1. Ultimate Failsafe Timer: Guarantees website unlock within 6s regardless of network or device state
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      setAssetProgress(100);
      setVideoProgress(100);
      setVideoEnded(true);
      setShowOverlay(true);
      setFadeOut(true);
      if (onComplete) onComplete();
    }, 6000);

    return () => clearTimeout(failsafeTimer);
  }, [onComplete]);

  // Fallback for Overlay Contents if video autoplay is blocked
  useEffect(() => {
    if (videoPlaybackFailed) {
      setShowOverlay(true);
    }
  }, [videoPlaybackFailed]);

  // 2. Parallel Preload of all critical website images
  useEffect(() => {
    const imagesToPreload = [
      assets?.preloaderLogo || HERO_IMAGES.saiPreloaderLogo,
      assets?.logo || HERO_IMAGES.saiLogo,
      assets?.heroBackground || HERO_IMAGES.saiEstateBg,
      assets?.droneShot || HERO_IMAGES.saiDroneShot,
      assets?.pageBackgrounds?.location || HERO_IMAGES.locationPageBg,
      assets?.pageBackgrounds?.contact || HERO_IMAGES.contactPageBg,
      assets?.pageBackgrounds?.gallery || HERO_IMAGES.galleryPageBg,
      assets?.pageBackgrounds?.masterPlan || HERO_IMAGES.residenciesPageBg,
      assets?.blueprint?.image || HERO_IMAGES.saiResidencyBlueprint,
      assets?.brochure?.file || HERO_IMAGES.saiResidencyBrochure,
      AMENITY_IMAGES.cctvSecurity,
      AMENITY_IMAGES.solarLighting,
      AMENITY_IMAGES.wideRoads,
      AMENITY_IMAGES.waterresource,
      SITE_GALLERY_IMAGES.gallery1,
      SITE_GALLERY_IMAGES.gallery2,
      SITE_GALLERY_IMAGES.gallery3,
      SITE_GALLERY_IMAGES.gallery4,
      SITE_GALLERY_IMAGES.gallery5,
      SITE_GALLERY_IMAGES.gallery6,
    ].filter(Boolean);

    let loadedCount = 0;
    const total = imagesToPreload.length;

    if (total === 0) {
      setAssetProgress(100);
      return;
    }

    const updateAssetProgress = () => {
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / total) * 100));
      setAssetProgress(pct);
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateAssetProgress;
      img.onerror = updateAssetProgress;
    });

    const assetTimeout = setTimeout(() => {
      setAssetProgress(100);
    }, 4000);

    return () => clearTimeout(assetTimeout);
  }, [assets]);

  // 3. Video Playback & Instant Autoplay Optimization
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Preloader video autoplay prevented or delayed:', error);
          setVideoPlaybackFailed(true);
        });
      }
    } else if (!assets?.preloaderVideo) {
      setVideoEnded(true);
      setShowOverlay(true);
    }
  }, [assets]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const pct = Math.min(100, Math.round((current / duration) * 100));
      setVideoProgress(pct);

      // Trigger Logo & Loading Bar overlay entrance 3 seconds BEFORE video ends
      if (duration - current <= 3.0 && !showOverlay) {
        setShowOverlay(true);
      }

      // Trigger cross-dissolve < 0.5s (0.45s) before background video ends
      if (duration - current <= 0.45) {
        setVideoEnded(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setVideoProgress(100);
    setVideoEnded(true);
  };

  // 4. Combined Progress Calculation
  const combinedProgress = Math.min(
    100,
    Math.round(assetProgress * 0.4 + videoProgress * 0.6)
  );

  // 5. Trigger website view unlock IMMEDIATELY when video ends AND assets are loaded
  useEffect(() => {
    const isReadyToUnlock = videoEnded || (videoPlaybackFailed && assetProgress >= 100) || !assets?.preloaderVideo;

    if (isReadyToUnlock && assetProgress >= 100) {
      // Instant trigger with 0ms delay for seamless cross dissolve
      setFadeOut(true);
      if (onComplete) onComplete();

      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 1200);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [videoEnded, assetProgress, videoPlaybackFailed, assets, onComplete]);

  if (hidden) return null;

  const preloaderLogo = assets?.preloaderLogo || assets?.logo;
  const videoSrc = assets?.preloaderVideo || HERO_IMAGES.preloaderBgVideo;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 1.0s cubic-bezier(0.25, 1, 0.5, 1), transform 1.0s cubic-bezier(0.25, 1, 0.5, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Background Video — Full Screen */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Transparent Mild Dark Layer Over Background Video (matching Home Hero section) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(10, 8, 5, 0.65) 0%, rgba(15, 12, 8, 0.45) 45%, rgba(21, 17, 12, 0.75) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Direct Floating Content Overlay — Appears smoothly after 3 seconds */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '520px',
          padding: '1rem',
          textAlign: 'center',
          opacity: showOverlay ? 1 : 0,
          transform: showOverlay ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: showOverlay ? 'auto' : 'none',
        }}
      >
        {/* Brand Crest / Logo */}
        {preloaderLogo && (
          <img
            src={preloaderLogo}
            alt={`${property?.name || 'Property'} Logo`}
            style={{
              width: '340px',
              maxWidth: '85vw',
              height: 'auto',
              maxHeight: '340px',
              objectFit: 'contain',
              marginBottom: '0.4rem',
              filter: 'drop-shadow(0 4px 16px rgba(201, 160, 99, 0.35))',
            }}
          />
        )}

        <p
          style={{
            fontSize: '1.08rem',
            color: '#D8D2C6',
            marginTop: '0.2rem',
            letterSpacing: '0.06em',
            fontWeight: 500,
          }}
        >
          {property?.location?.locality} · {property?.location?.city}
        </p>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            marginTop: '1rem',
          }}
        >
          {/* Track */}
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(201, 160, 99, 0.22)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Fill */}
            <div
              style={{
                height: '100%',
                width: `${combinedProgress}%`,
                backgroundColor: 'var(--gold-accent, #C9A063)',
                boxShadow: '0 0 14px rgba(201, 160, 99, 0.9)',
                transition: 'width 0.2s ease-out',
                borderRadius: '999px',
              }}
            />
          </div>

          {/* Status Label & Percentage Counter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.85rem',
              fontSize: '0.92rem',
              color: '#FAF8F4',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <span
              style={{
                color: '#B5AFA4',
                fontSize: '0.86rem',
                letterSpacing: '0.1em',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {combinedProgress < 100
                ? assetProgress < 100
                  ? 'Preparing Layout...'
                  : 'Completing Video Presentation...'
                : `Welcome to ${property?.name || 'Thenshirdi Sai'}`}
            </span>
            <span
              style={{
                color: 'var(--gold-accent, #C9A063)',
                fontWeight: 800,
                fontSize: '0.95rem',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {combinedProgress}%
            </span>
          </div>

          {/* Fallback button if video autoplay is blocked by mobile browser settings */}
          {videoPlaybackFailed && !videoEnded && (
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                  setVideoPlaybackFailed(false);
                } else {
                  setVideoEnded(true);
                }
              }}
              style={{
                marginTop: '1.25rem',
                padding: '0.6rem 1.4rem',
                backgroundColor: 'var(--gold-accent, #C9A063)',
                color: '#15130F',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(201, 160, 99, 0.3)',
                transition: 'transform 0.2s ease',
              }}
            >
              ▶ Play Presentation
            </button>
          )}
        </div>
      </div>

      {/* Responsive Style to hide badges on Mobile Views */}
      <style>{`
        @media (max-width: 768px) {
          .preloader-desktop-badge {
            display: none !important;
          }
        }
      `}</style>

      {/* ── REAL ESTATE BRAND WATERMARK OVERLAYS (Desktop Only) ── */}

      {/* Bottom Right Watermark Overlay Badge — DTCP & TN RERA Approved Badge */}
      <div
        className="preloader-desktop-badge"
        style={{
          position: 'absolute',
          bottom: '3.8rem',
          right: '1.5rem',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '0.75rem 1.15rem',
          backgroundColor: 'rgba(18, 15, 11, 0.84)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 160, 99, 0.45)',
          borderRadius: '16px',
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.55), 0 0 15px rgba(201, 160, 99, 0.15)',
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          maxWidth: 'calc(100vw - 3rem)',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(201, 160, 99, 0.18)',
            border: '1px solid rgba(201, 160, 99, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-accent, #C9A063)',
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={20} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#FAF8F4', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              {legal?.authorityName || 'DTCP & TN RERA'} APPROVED
            </span>
            <CheckCircle2 size={13} style={{ color: 'var(--gold-accent, #C9A063)' }} />
          </div>
          <span style={{ color: '#B5AFA4', fontSize: '0.74rem', fontWeight: 500, display: 'block', marginTop: '0.1rem' }}>
            Layout No. {legal?.dtcpNumber || '256/2022'} · 100% Clear Titles
          </span>
        </div>
      </div>

      {/* Bottom Left Watermark Overlay Badge — Sanctioned Township Highlights */}
      <div
        className="preloader-desktop-badge"
        style={{
          position: 'absolute',
          bottom: '3.8rem',
          left: '1.5rem',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.15rem',
          backgroundColor: 'rgba(18, 15, 11, 0.84)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 160, 99, 0.45)',
          borderRadius: '16px',
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.55), 0 0 15px rgba(201, 160, 99, 0.15)',
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          maxWidth: 'calc(100vw - 3rem)',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(201, 160, 99, 0.18)',
            border: '1px solid rgba(201, 160, 99, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-accent, #C9A063)',
            flexShrink: 0,
          }}
        >
          <MapPin size={19} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <span style={{ color: '#FAF8F4', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '0.04em', display: 'block' }}>
            {property?.totalPlots || 145} SANCTIONED PLOTS
          </span>
          <span style={{ color: '#B5AFA4', fontSize: '0.74rem', fontWeight: 500, display: 'block', marginTop: '0.1rem' }}>
            {property?.location?.locality}, {property?.location?.city}
          </span>
        </div>
      </div>
    </div>
  );
}
