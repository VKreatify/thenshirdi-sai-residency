import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import useProperty from '../hooks/useProperty';

export default function Footer() {
  const location = useLocation();
  const isPrivacyPage = location.pathname === '/privacy-terms';
  const { property, navigation } = useProperty();

  const footerLinks = navigation?.footerLinks || [
    { name: 'Home', path: '/' },
    { name: 'The Vision', path: '/about' },
    { name: 'Your Vista', path: '/master-plan' },
    { name: 'Architectural Gallery', path: '/gallery' },
    { name: 'Location & Connectivity', path: '/location' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className={`site-footer ${isPrivacyPage ? 'privacy-footer-bg' : ''}`}>
      <div className="container">
        <div className="bento-grid" style={{ marginBottom: '4rem' }}>
          {/* Brand & Overview */}
          <div className="bento-col-5">
            <span className="eyebrow-label footer-brand-label">
              {property?.brandMark || property?.name}
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1.25rem', fontWeight: 600 }}>
              {property?.type ? `${property.type} in ${property.location?.locality || property.location?.city}` : property?.name}
            </h3>
            <p className="footer-contact-text" style={{ maxWidth: '420px', marginBottom: '2rem', fontSize: '0.98rem' }}>
              {property?.tagline 
                ? `A DTCP & TN RERA approved residential layout at ${property.location?.locality}, ${property.location?.city}. Developed with clear titles, wide blacktop roads, and essential infrastructure.` 
                : property?.tagline}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="bento-col-3">
            <h4 className="footer-heading">
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="bento-col-4">
            <h4 className="footer-heading">
              Experience Center & Site Address
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {property?.contact?.experienceCenterAddress && (
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <MapPin size={18} className="footer-icon" style={{ marginTop: '3px' }} />
                  <span className="footer-contact-text">{property.contact.experienceCenterAddress}</span>
                </div>
              )}
              {property?.contact?.phone && (
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <Phone size={18} className="footer-icon" />
                  <span className="footer-contact-text">
                    <a href={`tel:${property.contact.phoneTel || property.contact.phone}`} className="footer-contact-link">
                      {property.contact.phone}
                    </a>
                  </span>
                </div>
              )}
              {property?.contact?.email && (
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <Mail size={18} className="footer-icon" />
                  <span className="footer-contact-text">
                    <a href={`mailto:${property.contact.email}`} className="footer-contact-link">
                      {property.contact.email}
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '2rem', fontSize: '0.88rem' }}>
          <div style={{ color: '#D4CEC3' }}>
            © {new Date().getFullYear()} {property?.name}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy-terms" className="footer-link" style={{ fontSize: '0.88rem', color: '#D4CEC3' }}>
              Privacy Policy & Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
