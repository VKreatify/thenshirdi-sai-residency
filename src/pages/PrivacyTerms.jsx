import React from 'react';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';

export default function PrivacyTerms() {
  const { property, legal, content } = useProperty();
  useSEO({
    title: 'Privacy Policy & Terms of Service',
    description: `Privacy policy, DTCP and RERA regulatory disclosures for ${property?.name}.`
  });

  const developerName = legal?.developerName || property?.developer?.name || property?.name;

  return (
    <div className="privacy-terms-page" style={{ paddingTop: '8rem' }}>
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-sand)' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="eyebrow-label eyebrow-clay">
            {content?.privacy?.eyebrow || 'REGULATORY & LEGAL POLICIES'}
          </span>
          <h1 className="hero-title-fluid font-serif" style={{ color: 'var(--ink-dark)', marginBottom: '2rem' }}>
            {content?.privacy?.title || 'Privacy Policy & Terms of Service'}
          </h1>

          <div className="glass-card-light" style={{ padding: '3rem', fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--text-body)' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.75rem' }}>
              1. Regulatory Disclosures & Approvals
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              {property?.name} is registered and approved under {legal?.authorityName || 'DTCP & TN RERA'} (Approval No. {legal?.dtcpNumber || '256/2022'}) and {legal?.reraLayoutNumber || 'TN/10/Layout/0010/2023'} regulatory guidelines. All layout maps, plot dimensions, and specifications displayed on this website are subject to sanctioned regulatory plans.
            </p>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.75rem' }}>
              2. Data Protection & Lead Privacy
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We respect your privacy. Any personal information (name, phone number, email address) collected via booking forms or callback requests is kept strictly confidential and used solely by {developerName} for sales communication. We do not sell or share user data with third-party telemarketers.
            </p>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.75rem' }}>
              3. Copyright & Intellectual Property
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              All architectural renders, floorplan graphics, text content, and branding logos published herein are the exclusive property of {developerName}. Unauthorized reproduction or commercial distribution is prohibited.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
