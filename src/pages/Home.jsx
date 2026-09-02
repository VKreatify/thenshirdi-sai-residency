import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BentoCard from '../components/BentoCard';
import InteractiveMap from '../components/InteractiveMap';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';
import { submitLeadToGoogleSheet } from '../data/propertyData';
import { validateIndianMobile, sanitizePhoneInput } from '../utils/validation';
import { ArrowRight, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { HERO_IMAGES } from '../assets/images';

// Background-position-y per section (0% = top of image / rooftop, 100% = bottom / ground)
const SECTION_Y = [100, 80, 60, 40, 20, 0];

export default function Home({ onOpenBooking }) {
  const { property, stats, content, amenities, faqs, assets } = useProperty();
  useSEO();

  const [openFaq, setOpenFaq] = useState(0);
  const [callbackData, setCallbackData] = useState({ fullName: '', phone: '' });
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const homeContent = content?.home || {};
  const heroContent = homeContent.hero || {};
  const visionContent = homeContent.vision || {};
  const amenitiesContent = homeContent.amenities || {};
  const faqContent = homeContent.faq || {};
  const contactContent = homeContent.contact || {};

  const heroBg = assets?.heroBackground || HERO_IMAGES.saiEstateBg;

  const handlePhoneChange = (e) => {
    const sanitized = sanitizePhoneInput(e.target.value);
    setCallbackData({ ...callbackData, phone: sanitized });
    if (phoneError) {
      const check = validateIndianMobile(sanitized);
      if (check.isValid) setPhoneError('');
    }
  };

  const handleHomeCallbackSubmit = async (e) => {
    e.preventDefault();
    const validation = validateIndianMobile(callbackData.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      return;
    }
    setPhoneError('');
    setCallbackSubmitting(true);
    await submitLeadToGoogleSheet({
      fullName: callbackData.fullName,
      phone: validation.cleaned,
      source: 'Home Page Quick Callback Form'
    });
    setCallbackSubmitting(false);
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackData({ fullName: '', phone: '' });
      setPhoneError('');
    }, 2500);
  };

  const bgRef   = useRef(null);
  const secRefs = useRef([]);
  const lerpY   = useRef(SECTION_Y[0]);
  const targetY = useRef(SECTION_Y[0]);
  const rafId   = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    // Continuous smooth lerp loop — ultra-fluid floor navigation
    const tick = () => {
      const diff = targetY.current - lerpY.current;
      if (Math.abs(diff) > 0.03) {
        lerpY.current += diff * 0.09;
        bg.style.backgroundPositionY = `${lerpY.current.toFixed(2)}%`;
        rafId.current = requestAnimationFrame(tick);
      } else {
        lerpY.current = targetY.current;
        bg.style.backgroundPositionY = `${targetY.current.toFixed(2)}%`;
        rafId.current = null;
      }
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - vh;

      // Handle top / bottom edges smoothly
      if (scrollY <= 10) {
        targetY.current = SECTION_Y[0];
        if (!rafId.current) rafId.current = requestAnimationFrame(tick);
        return;
      }

      if (maxScroll > 0 && scrollY >= maxScroll - 30) {
        targetY.current = SECTION_Y[SECTION_Y.length - 1];
        if (!rafId.current) rafId.current = requestAnimationFrame(tick);
        return;
      }

      const mid = vh / 2;
      const totalSecs = secRefs.current.length;

      // Continuous fractional floor transit between adjacent sections
      let calculatedY = null;
      for (let i = 0; i < totalSecs - 1; i++) {
        const el1 = secRefs.current[i];
        const el2 = secRefs.current[i + 1];
        if (!el1 || !el2) continue;

        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        const c1 = r1.top + r1.height / 2;
        const c2 = r2.top + r2.height / 2;

        if (mid >= c1 && mid <= c2 && c2 > c1) {
          const progress = (mid - c1) / (c2 - c1);
          const y1 = SECTION_Y[i];
          const y2 = SECTION_Y[i + 1];
          calculatedY = y1 + (y2 - y1) * progress;
          break;
        }
      }

      if (calculatedY !== null) {
        targetY.current = calculatedY;
      } else {
        // Find closest section fallback
        let best = 0, bestD = Infinity;
        secRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs((r.top + r.height / 2) - mid);
          if (d < bestD) { bestD = d; best = i; }
        });
        targetY.current = SECTION_Y[best] !== undefined ? SECTION_Y[best] : SECTION_Y[0];
      }

      if (!rafId.current) rafId.current = requestAnimationFrame(tick);
    };

    bg.style.backgroundPositionY = `${SECTION_Y[0]}%`;
    // Make html/body transparent so fixed bg shows
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  const ref = (i) => (el) => { secRefs.current[i] = el; };

  return (
    <div className="home-page-container">
      {/* ── FIXED BACKGROUND WITH LERP FLOOR PARALLAX ── */}
      {heroBg && (
        <div
          ref={bgRef}
          className="home-photo-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
      )}

      {/* 1. HERO */}
      <section ref={ref(0)} className="hero-dark-wrapper">
        <div className="hero-photo-overlay" />

        <div className="container hero-content-layer">
          <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.5rem' }}>
            {heroContent.titleLine1 || 'Thoughtful Planning.'} <br />
            <span style={{ color: 'var(--gold-accent)' }}>
              {heroContent.titleLine2 || 'Secure Living.'}
            </span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted-dark)', maxWidth: '680px', margin: '0 auto 2.5rem', fontWeight: 400 }}>
            {heroContent.description || property?.tagline}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link to={heroContent.primaryCtaLink || '/master-plan'} className="btn-architectural btn-clay">
              {heroContent.primaryCtaText || 'Your Vista'} <ArrowRight size={16} />
            </Link>
            <Link to={heroContent.secondaryCtaLink || '/gallery'} className="btn-architectural btn-sand-outline" style={{ color: '#FAF8F4', borderColor: 'rgba(255, 255, 255, 0.35)' }}>
              {heroContent.secondaryCtaText || 'Explore Gallery'}
            </Link>
          </div>

          {/* Hero Bento Stats Quick Bar */}
          <div className="bento-grid" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {(stats || []).slice(0, 4).map((stat, idx) => (
              <BentoCard key={idx} span="bento-col-3" dark={true} style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
                <span className="tabular-nums" style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-accent)', display: 'block', lineHeight: 1 }}>
                  {stat.value} <span style={{ fontSize: '1.2rem', color: '#FAF8F4' }}>{stat.suffix}</span>
                </span>
                <strong style={{ fontSize: '0.88rem', color: '#FAF8F4', display: 'block', marginTop: '0.35rem' }}>
                  {stat.label}
                </strong>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE VISION */}
      <section ref={ref(1)} className="section-padding home-scrim">
        <div className="container">
          <div className="fluid-liquid-capsule">
            <span
              className="eyebrow-label"
              style={{
                background: 'rgba(21, 19, 15, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 160, 99, 0.55)',
                color: 'var(--gold-accent)',
                padding: '0.45rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                marginBottom: '1.5rem',
                display: 'inline-block'
              }}
            >
              {visionContent.eyebrow || 'THE TOWNSHIP VISION'}
            </span>
            <h2 className="section-title-fluid font-serif" style={{ marginBottom: '1.75rem', color: '#FAF8F4', textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)' }}>
              {visionContent.quote || '"Developed with clarity, legal security, and long-term value."'}
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#EAE5DD', lineHeight: '1.85', maxWidth: '740px', margin: '0 auto', textShadow: '0 1px 6px rgba(0, 0, 0, 0.35)' }}>
              {visionContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. LOCATION */}
      <section ref={ref(2)} className="section-padding home-scrim">
        <div className="container">
          <InteractiveMap />
        </div>
      </section>

      {/* 4. LIFE HERE (Amenities) */}
      <section ref={ref(3)} className="section-padding home-scrim">
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
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
              {amenitiesContent.eyebrow || 'INFRASTRUCTURE & FEATURES'}
            </span>
            <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)' }}>
              {amenitiesContent.title || 'Quality Infrastructure & Amenities'}
            </h2>
          </div>

          <div className="bento-grid">
            {(amenities || []).map((item) => (
              <BentoCard
                key={item.id}
                span={item.span || 'bento-col-4'}
                dark={true}
                tilt={false}
                spotlightSize={400}
                spotlightColor="rgba(201, 160, 99, 0.18)"
                style={{
                  position: 'relative',
                  minHeight: '340px',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 0
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-lg)',
                      zIndex: 1,
                      filter: 'brightness(0.7)'
                    }}
                  />
                )}

                {/* Dark Gradient Backdrop to guarantee text legibility */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 13, 10, 0.2) 0%, rgba(15, 13, 10, 0.88) 100%)',
                    zIndex: 1,
                    borderRadius: 'var(--radius-lg)'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2, color: '#FAF8F4', padding: '2.5rem' }}>
                  <span style={{ display: 'inline-block', backgroundColor: 'var(--gold-accent)', color: 'var(--ink-dark)', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.7rem', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'rgba(250, 248, 244, 0.9)', maxWidth: '520px', lineHeight: '1.6', textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)' }}>
                    {item.description}
                  </p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section ref={ref(4)} className="section-padding home-scrim">
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
                {faqContent.eyebrow || 'TRANSPARENCY & CLARITY'}
              </span>
              <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)' }}>
                {faqContent.title || 'Frequently Asked Questions'}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(faqs || []).map((faq, idx) => (
                <BentoCard
                  key={idx}
                  span="bento-col-12"
                  style={{ borderRadius: 'var(--radius-md)', padding: '1.5rem 2rem', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)' }}>
                      {faq.question}
                    </h3>
                    <ChevronDown size={20} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', color: 'var(--clay-accent)' }} />
                  </div>
                  {openFaq === idx && (
                    <p style={{ marginTop: '1rem', color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: '1.7', borderTop: '1px solid rgba(27,26,23,0.08)', paddingTop: '1rem' }}>
                      {faq.answer}
                    </p>
                  )}
                </BentoCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT / CALLBACK */}
      <section ref={ref(5)} className="section-padding home-scrim home-scrim--dark" style={{ color: 'var(--text-on-dark)' }}>
        <div className="container">
          <div className="bento-grid" style={{ alignItems: 'center' }}>
            <div className="bento-col-6">
              <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>
                {contactContent.eyebrow || 'GET IN TOUCH'}
              </span>
              <h2 className="section-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.5rem' }}>
                {contactContent.title || 'Schedule a Site Walkthrough'}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted-dark)', lineHeight: '1.8', marginBottom: '2rem' }}>
                {contactContent.description || 'Interested in inspecting the layout? Our team will assist you with site directions, layout maps, plot availability, and bank loan process.'}
              </p>
            </div>

            <BentoCard span="bento-col-6" dark={true} style={{ padding: '3rem' }}>
              {callbackSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={50} style={{ color: 'var(--gold-accent)', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FAF8F4', marginBottom: '0.5rem' }}>
                    {contactContent.formSuccessTitle || 'Request Received'}
                  </h3>
                  <p style={{ color: 'var(--text-muted-dark)', fontSize: '0.95rem' }}>
                    {contactContent.formSuccessMsg || 'Our sales team will reach out with layout maps and plot details shortly.'}
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FAF8F4', marginBottom: '1.5rem' }}>
                    {contactContent.formTitle || 'Request Callback'}
                  </h3>
                  <form onSubmit={handleHomeCallbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={callbackData.fullName}
                      onChange={(e) => setCallbackData({ ...callbackData, fullName: e.target.value })}
                      style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }}
                    />
                    <div>
                      <input
                        type="tel"
                        required
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        minLength={10}
                        title="Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)"
                        placeholder="10-Digit Mobile Number"
                        value={callbackData.phone}
                        onChange={handlePhoneChange}
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.2rem',
                          borderRadius: 'var(--radius-md)',
                          border: phoneError ? '1px solid #ef4444' : '1px solid var(--glass-dark-border)',
                          background: 'rgba(0,0,0,0.4)',
                          color: '#FFF',
                          outline: 'none'
                        }}
                      />
                      {phoneError && (
                        <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <AlertCircle size={14} />
                          {phoneError}
                        </span>
                      )}
                    </div>
                    <button type="submit" disabled={callbackSubmitting} className="btn-architectural btn-clay" style={{ marginTop: '0.5rem', opacity: callbackSubmitting ? 0.7 : 1 }}>
                      {callbackSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </form>
                </>
              )}
            </BentoCard>
          </div>
        </div>
      </section>
    </div>
  );
}
