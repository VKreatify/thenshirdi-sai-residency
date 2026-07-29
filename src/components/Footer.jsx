import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RERA_DETAILS } from '../data/propertyData';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isPrivacyPage = location.pathname === '/privacy-terms';
  const isPropertyDetailsPage = Boolean(location.pathname.match(/^\/properties\/.+/));

  return (
    <footer className={`site-footer ${isPrivacyPage ? 'privacy-footer-bg' : ''} ${isPropertyDetailsPage ? 'property-details-footer-bg' : ''}`}>
      <div className="container">
        <div className="bento-grid" style={{ marginBottom: '4rem' }}>
          {/* Brand & Overview */}
          <div className="bento-col-5">
            <span className="eyebrow-label footer-brand-label">THENSHIRDI SAI RESIDENCY</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1.25rem', fontWeight: 600 }}>
              Architectural Refinement Near Shirdi Temple
            </h3>
            <p className="footer-contact-text" style={{ maxWidth: '420px', marginBottom: '2rem', fontSize: '0.98rem' }}>
              Low-density luxury residences and sky penthouses engineered with 100% Vastu compliance, private sky deck lounges, and 5-tier security.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="bento-col-3">
            <h4 className="footer-heading">
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li><Link to="/about" className="footer-link">The Vision</Link></li>
              <li><Link to="/properties" className="footer-link">Featured Residences</Link></li>
              <li><Link to="/projects" className="footer-link">Projects & Floorplans</Link></li>
              <li><Link to="/gallery" className="footer-link">Architectural Gallery</Link></li>
              <li><Link to="/location" className="footer-link">Location & Connectivity</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="bento-col-4">
            <h4 className="footer-heading">
              Experience Center & Site Address
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <MapPin size={18} className="footer-icon" style={{ marginTop: '3px' }} />
                <span className="footer-contact-text">VIP Temple Road, Off Highway 160, Near Sai Ashram, Shirdi, Maharashtra — 423109</span>
              </div>
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <Phone size={18} className="footer-icon" />
                <span className="footer-contact-text">
                  <a href="tel:+919876543210" className="footer-contact-link">+91 98765 43210</a> / <a href="tel:+919876543211" className="footer-contact-link">+91 98765 43211</a>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <Mail size={18} className="footer-icon" />
                <a href="mailto:residences@thenshirdi.com" className="footer-contact-link footer-contact-text">
                  residences@thenshirdi.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '2rem', fontSize: '0.88rem' }}>
          <div style={{ color: '#D4CEC3' }}>
            © {new Date().getFullYear()} {RERA_DETAILS.developerName}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy-terms" className="footer-link" style={{ fontSize: '0.88rem', color: '#D4CEC3' }}>Privacy Policy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

