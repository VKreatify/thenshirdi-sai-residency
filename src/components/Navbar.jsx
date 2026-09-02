import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import useProperty from '../hooks/useProperty';

export default function Navbar({ onOpenBooking, onDownloadBrochure }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { property, assets, navigation } = useProperty();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = navigation?.links || [
    { name: 'Home', path: '/' },
    { name: 'The Vision', path: '/about' },
    { name: 'Your Vista', path: '/master-plan' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location', path: '/location' },
    { name: 'Contact', path: '/contact' }
  ];

  const logoSrc = assets?.logo;
  const preloaderLogoSrc = assets?.preloaderLogo || logoSrc;

  return (
    <header className={`nav-fixed-header ${scrolled ? 'header-scrolled' : ''}`}>
      {/* Top Left Corner Logo (Outside Navbar Container - Desktop Only) */}
      {logoSrc && (
        <Link to="/" className={`top-left-site-logo ${scrolled ? 'logo-scrolled' : ''}`} aria-label={`${property?.name || 'Property'} Home`}>
          <img
            src={logoSrc}
            alt={`${property?.name || 'Property'} Logo`}
            className="site-logo-img"
          />
        </Link>
      )}

      <nav className={`nav-bar-container ${scrolled ? 'nav-scrolled' : ''}`}>
        {/* Brand Logo & Title */}
        <Link to="/" className="nav-logo" aria-label={`${property?.name || 'Property'} Home`}>
          {(scrolled ? preloaderLogoSrc : logoSrc) && (
            <img
              src={scrolled ? preloaderLogoSrc : logoSrc}
              alt={`${property?.name || 'Property'} Logo`}
              className="nav-title-logo-img"
            />
          )}
          <div className="nav-logo-text-wrapper">
            <span className="logo-brand-mark">{property?.brandMark || property?.name}</span>
            {property?.brandText && (
              <span className="logo-brand-text">{property?.brandText}</span>
            )}
          </div>
        </Link>

        {/* Desktop & Laptop Menu Links (Visible on >= 1025px) */}
        <ul className="nav-menu-links hidden-mobile-laptop">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action CTAs */}
        <div className="nav-actions-wrapper">
          {navigation?.headerCtas?.showBrochureButton !== false && (
            <button
              onClick={onDownloadBrochure}
              className="btn-architectural btn-sand-outline nav-cta-btn hidden-mobile-laptop"
              title="Download Official e-Brochure"
            >
              <FileText size={15} />
              <span>{navigation?.headerCtas?.brochureButtonText || 'e-Brochure'}</span>
            </button>
          )}

          {/* Mobile & Tablet Hamburger Toggle Button (Visible on < 1025px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="mobile-toggle-label">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Full Screen Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-drawer-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header inside drawer */}
            <div className="mobile-drawer-header">
              <span className="eyebrow-label eyebrow-clay" style={{ marginBottom: 0 }}>
                NAVIGATION MENU
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-close-btn"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="mobile-active-dot" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-drawer-actions">
              {navigation?.headerCtas?.showBrochureButton !== false && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDownloadBrochure();
                  }}
                  className="btn-architectural btn-sand-outline"
                  style={{ width: '100%', padding: '0.85rem', justifyContent: 'center' }}
                >
                  <FileText size={16} />
                  <span>Download {navigation?.headerCtas?.brochureButtonText || 'e-Brochure'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
