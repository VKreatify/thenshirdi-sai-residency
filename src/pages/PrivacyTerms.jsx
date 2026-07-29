import React from 'react';
import { RERA_DETAILS } from '../data/propertyData';

export default function PrivacyTerms() {
  return (
    <div className="privacy-terms-page" style={{ paddingTop: '8rem' }}>
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-sand)' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="eyebrow-label eyebrow-clay">REGULATORY & LEGAL POLICIES</span>
          <h1 className="hero-title-fluid font-serif" style={{ color: 'var(--ink-dark)', marginBottom: '2rem' }}>
            Privacy Policy & Terms of Service
          </h1>

          <div className="glass-card-light" style={{ padding: '3rem', fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--text-body)' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.75rem' }}>
              1. MahaRERA Regulatory Disclosures
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Thenshirdi Sai Residency is registered and approved under MahaRERA regulatory guidelines. All marketing materials, renders, dimensions, and floor plans displayed on this website are for illustrative purposes and subject to regulatory sanctions.
            </p>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.75rem' }}>
              2. Data Protection & Lead Privacy
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We respect your privacy. Any personal information (name, phone number, email address) collected via booking forms or enquiry requests is kept strictly confidential and used solely by {RERA_DETAILS.developerName} for sales communication. We do not sell or share user data with third-party telemarketers.
            </p>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.75rem' }}>
              3. Copyright & Intellectual Property
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              All architectural renders, floorplan graphics, text content, and branding logos published herein are the exclusive property of {RERA_DETAILS.developerName}. Unauthorized reproduction or commercial distribution is prohibited.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
