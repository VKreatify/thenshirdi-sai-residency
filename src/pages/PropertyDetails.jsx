import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESIDENCES } from '../data/propertyData';
import BentoCard from '../components/BentoCard';
import EMICalculator from '../components/EMICalculator';
import { ArrowLeft, CheckCircle2, Download, PhoneCall, Layers, TrendingUp } from 'lucide-react';

export default function PropertyDetails({ onOpenBooking, onDownloadBrochure }) {
  const { id } = useParams();
  const residence = RESIDENCES.find((r) => r.id === id) || RESIDENCES[0];

  return (
    <div className="property-details-page" style={{ paddingTop: '7.5rem' }}>
      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-on-dark)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <Link to="/properties" style={{ color: 'var(--gold-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Residence Collection
          </Link>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>{residence.type} CONFIGURATION</span>
              <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', margin: '0.5rem 0' }}>
                {residence.title}
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted-dark)', maxWidth: '650px' }}>
                {residence.tagline}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted-dark)', display: 'block' }}>Starting Price</span>
              <strong className="tabular-nums" style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-accent)' }}>
                {residence.startingPrice}
              </strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block' }}>Est. EMI: {residence.emiStarting}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Specs */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-sand)' }}>
        <div className="container">
          <div className="bento-grid" style={{ marginBottom: '4rem' }}>
            {/* Gallery Image */}
            <BentoCard span="bento-col-7" style={{ overflow: 'hidden', padding: 0 }}>
              <img
                src={residence.image}
                alt={residence.title}
                style={{ width: '100%', height: '100%', minHeight: '440px', objectFit: 'cover' }}
              />
            </BentoCard>

            {/* Key Specifications Panel */}
            <BentoCard span="bento-col-5" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', color: 'var(--ink-dark)' }}>
                  Architectural Specifications
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ background: 'var(--bg-sand-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carpet Area</span>
                    <strong className="tabular-nums" style={{ fontSize: '1.2rem', display: 'block' }}>{residence.carpetArea}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-sand-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Balcony Space</span>
                    <strong className="tabular-nums" style={{ fontSize: '1.2rem', display: 'block' }}>{residence.balconyArea}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-sand-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Orientation</span>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--clay-accent)' }}>{residence.orientation}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-sand-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bedrooms / Baths</span>
                    <strong className="tabular-nums" style={{ fontSize: '1.2rem', display: 'block' }}>{residence.bedrooms} Beds / {residence.bathrooms} Baths</strong>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--ink-dark)' }}>Key Features:</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  {residence.features.map((f, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--clay-accent)', flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={onOpenBooking} className="btn-architectural btn-clay" style={{ flex: 1 }}>
                  <PhoneCall size={16} /> Schedule Viewing
                </button>
                <button onClick={onDownloadBrochure} className="btn-architectural btn-sand-outline">
                  <Download size={16} /> e-Brochure
                </button>
              </div>
            </BentoCard>
          </div>

          {/* Floorplan Section */}
          <BentoCard span="bento-col-12" style={{ padding: '3rem', marginBottom: '4rem' }}>
            <div style={{ maxWidth: '600px', marginBottom: '2rem' }}>
              <span className="eyebrow-label eyebrow-clay">VASTU-COMPLIANT ARCHITECTURE</span>
              <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)' }}>
                Official Layout & Floorplan
              </h3>
            </div>

            <div className="bento-grid" style={{ alignItems: 'center' }}>
              <div className="bento-col-7">
                <img
                  src={residence.floorPlanImage}
                  alt={`${residence.title} Floor Plan`}
                  style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201,160,99,0.3)' }}
                />
              </div>

              <div className="bento-col-5" style={{ background: 'var(--bg-sand-muted)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
                  Spatial Highlights
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  Layout planned with zero corridor wastage. East-facing main door entry opens directly into a sunlit 14ft ceiling reception foyer.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-accent)', fontSize: '0.88rem', fontWeight: 600 }}>
                  <Layers size={18} />
                  <span>Approved by Shirdi Municipal Engineering Board</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Investment & Appreciation Info */}
          <BentoCard span="bento-col-12" dark={true} style={{ padding: '3rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <TrendingUp size={24} style={{ color: 'var(--gold-accent)' }} />
              <span className="eyebrow-label" style={{ color: 'var(--gold-accent)', marginBottom: 0 }}>INVESTMENT INTELLIGENCE</span>
            </div>
            <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', marginBottom: '1.5rem' }}>
              Shirdi VIP Corridor Growth Thesis
            </h3>

            <div className="bento-grid">
              <div className="bento-col-4">
                <strong style={{ color: 'var(--gold-accent)', fontSize: '1.8rem', fontFamily: 'var(--font-serif)', display: 'block' }} className="tabular-nums">14.2% YoY</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted-dark)' }}>Historical capital appreciation along VIP Temple corridor over the past 3 years.</span>
              </div>
              <div className="bento-col-4">
                <strong style={{ color: 'var(--gold-accent)', fontSize: '1.8rem', fontFamily: 'var(--font-serif)', display: 'block' }} className="tabular-nums">High Yield</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted-dark)' }}>Strong pilgrim & executive rental demand for high-end Vastu-aligned residences.</span>
              </div>
              <div className="bento-col-4">
                <strong style={{ color: 'var(--gold-accent)', fontSize: '1.8rem', fontFamily: 'var(--font-serif)', display: 'block' }} className="tabular-nums">RERA Clear</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted-dark)' }}>Zero litigation risk with verified clear land title & MahaRERA backing.</span>
              </div>
            </div>
          </BentoCard>

          {/* EMI Calculator */}
          <EMICalculator />
        </div>
      </section>
    </div>
  );
}
