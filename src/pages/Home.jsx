import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BentoCard from '../components/BentoCard';
import InteractiveMap from '../components/InteractiveMap';
import EMICalculator from '../components/EMICalculator';
import { PROJECT_STATS, RESIDENCES, AMENITIES, TESTIMONIALS, FAQS, RERA_DETAILS } from '../data/propertyData';
import { ArrowRight, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';
import saiEstateBg from '../../sai estate.png?url';

// Background-position-y per section (0% = top of image / rooftop, 100% = bottom / ground)
const SECTION_Y = [92, 78, 64, 50, 38, 27, 17, 9, 2];

export default function Home({ onOpenBooking }) {
  const [openFaq, setOpenFaq] = useState(0);
  const bgRef    = useRef(null);
  const secRefs  = useRef([]);
  const lerpY    = useRef(SECTION_Y[0]);
  const targetY  = useRef(SECTION_Y[0]);
  const rafId    = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    // Continuous lerp loop — runs only while needed
    const tick = () => {
      const diff = targetY.current - lerpY.current;
      if (Math.abs(diff) > 0.05) {
        lerpY.current += diff * 0.07;
        bg.style.backgroundPositionY = lerpY.current + '%';
        rafId.current = requestAnimationFrame(tick);
      } else {
        lerpY.current = targetY.current;
        bg.style.backgroundPositionY = targetY.current + '%';
        rafId.current = null;
      }
    };

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = 0, bestD = Infinity;
      secRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs((r.top + r.height / 2) - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      targetY.current = SECTION_Y[best];
      if (!rafId.current) rafId.current = requestAnimationFrame(tick);
    };

    bg.style.backgroundPositionY = SECTION_Y[0] + '%';
    // Make html/body transparent so fixed bg shows
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  const ref = (i) => (el) => { secRefs.current[i] = el; };

  return (
    <div className="home-page-container">

      {/* ── SAI ESTATE FIXED BACKGROUND ── */}
      <div
        ref={bgRef}
        className="home-photo-bg"
        style={{ backgroundImage: `url(${saiEstateBg})` }}
      />

      {/* 1. HERO */}
      <section ref={ref(0)} className="hero-dark-wrapper">
        {/* Cinematic gradient overlay — replaces 3D canvas */}
        <div className="hero-photo-overlay" />

        <div className="container hero-content-layer">
          <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            VIP TEMPLE CORRIDOR — SHIRDI
          </span>

          <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.5rem' }}>
            Architectural Restraint. <br />
            <span style={{ color: 'var(--gold-accent)' }}>Bespoke Living.</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted-dark)', maxWidth: '680px', margin: '0 auto 2.5rem', fontWeight: 400 }}>
            72 low-density 2 & 3 BHK luxury residences and sky penthouses with 100% Vastu compliance, elevated sky pavilion, and 5-minute proximity to Shirdi Sai Temple.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button onClick={onOpenBooking} className="btn-architectural btn-clay">
              Schedule Private Viewing <ArrowRight size={16} />
            </button>
            <Link to="/properties" className="btn-architectural btn-glass-dark">
              Explore Residences
            </Link>
          </div>

          {/* Hero Bento Stats Quick Bar */}
          <div className="bento-grid" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {PROJECT_STATS.slice(0, 4).map((stat, idx) => (
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
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow-label eyebrow-clay">THE ARCHITECTURAL VISION</span>
            <h2 className="section-title-fluid font-serif" style={{ marginBottom: '2rem', color: 'var(--ink-dark)' }}>
              "Designed not for crowd, but for legacy. A sanctuary where quiet luxury meets sacred stillness."
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: '1.8' }}>
              Unlike generic residential towers, Thenshirdi Sai Residency respects proportion, natural illumination, and sacred geometry. Every apartment has been laid out with double-height ceiling voids, private foyer entryways, and acoustic double-glazed windows facing the morning temple sunrise.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED RESIDENCES */}
      <section ref={ref(2)} className="section-padding home-scrim">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <span className="eyebrow-label">CURATED LIVING SPACES</span>
              <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)' }}>
                Bespoke Floor Configurations
              </h2>
            </div>
            <Link to="/properties" className="btn-architectural btn-gold-outline">
              View All Floor Plans <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bento-grid">
            {RESIDENCES.map((res) => (
              <BentoCard key={res.id} span="bento-col-4" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={res.image}
                    alt={res.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--ink-dark)', color: 'var(--gold-accent)', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                    {res.type}
                  </span>
                </div>

                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>{res.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{res.tagline}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem', background: '#FFF', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(27, 26, 23, 0.08)' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Carpet Area</span>
                        <strong className="tabular-nums">{res.carpetArea}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Orientation</span>
                        <strong style={{ color: 'var(--clay-accent)' }}>Vastu Aligned</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Starting from</span>
                      <strong className="tabular-nums" style={{ fontSize: '1.4rem', color: 'var(--ink-dark)', fontFamily: 'var(--font-serif)' }}>
                        {res.startingPrice}
                      </strong>
                    </div>

                    <Link
                      to={`/properties/${res.id}`}
                      className="btn-architectural btn-sand-outline"
                      style={{ width: '100%', fontSize: '0.82rem', padding: '0.75rem' }}
                    >
                      Residency Details
                    </Link>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIFE HERE (Amenities) */}
      <section ref={ref(3)} className="section-padding home-scrim">
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
            <span className="eyebrow-label eyebrow-clay">LIFE HERE — AMENITIES</span>
            <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)' }}>
              An Experience, Not a Checklist
            </h2>
          </div>

          <div className="bento-grid">
            {AMENITIES.map((item) => (
              <BentoCard key={item.id} span={item.span} style={{ position: 'relative', minHeight: '340px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'brightness(0.65)' }}
                />

                <div style={{ position: 'relative', zIndex: 2, color: '#FAF8F4' }}>
                  <span style={{ display: 'inline-block', backgroundColor: 'var(--gold-accent)', color: 'var(--ink-dark)', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'rgba(250, 248, 244, 0.85)', maxWidth: '520px', lineHeight: '1.6' }}>
                    {item.description}
                  </p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>



      {/* 5. LOCATION */}
      <section ref={ref(4)} className="section-padding home-scrim">
        <div className="container">
          <InteractiveMap />
        </div>
      </section>

      {/* 6. EMI CALCULATOR */}
      <section ref={ref(5)} className="section-padding home-scrim">
        <div className="container">
          <EMICalculator />
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section ref={ref(6)} className="section-padding home-scrim">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
            <span className="eyebrow-label">RESIDENT VOICES</span>
            <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)' }}>
              Verified Buyer Experiences
            </h2>
          </div>

          <div className="bento-grid">
            {TESTIMONIALS.map((t, i) => (
              <BentoCard key={i} span="bento-col-4" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', lineHeight: '1.7', marginBottom: '2rem' }}>
                  "{t.quote}"
                </p>

                <div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--ink-dark)' }}>{t.author}</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--clay-accent)', fontWeight: 600, display: 'block' }}>{t.designation}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.location}</span>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section ref={ref(7)} className="section-padding home-scrim">
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="eyebrow-label eyebrow-clay">TRANSPARENCY & CLARITY</span>
              <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {FAQS.map((faq, idx) => (
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

      {/* 9. CONTACT */}
      <section ref={ref(8)} className="section-padding home-scrim home-scrim--dark" style={{ color: 'var(--text-on-dark)' }}>
        <div className="container">
          <div className="bento-grid" style={{ alignItems: 'center' }}>
            <div className="bento-col-6">
              <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>BEGIN YOUR RESIDENCY</span>
              <h2 className="section-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.5rem' }}>
                Arrange a Private Advisory Session
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted-dark)', lineHeight: '1.8', marginBottom: '2rem' }}>
                Experience the spatial craftsmanship firsthand. Our Senior Sales Director will provide a guided walkthrough of the site, floorplan options, and custom payment schedules.
              </p>
            </div>

            <BentoCard span="bento-col-6" dark={true} style={{ padding: '3rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FAF8F4', marginBottom: '1.5rem' }}>
                Request Callback
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Callback requested successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }}
                />
                <button type="submit" className="btn-architectural btn-clay" style={{ marginTop: '0.5rem' }}>
                  Submit Enquiry
                </button>
              </form>
            </BentoCard>
          </div>
        </div>
      </section>
    </div>
  );
}
