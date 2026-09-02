/**
 * Real Estate Template — Navigation Links & Header CTA Configuration
 */

export const navigationConfig = {
  links: [
    { name: 'Home', path: '/' },
    { name: 'The Vision', path: '/about' },
    { name: 'Your Vista', path: '/master-plan' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location', path: '/location' },
    { name: 'Contact', path: '/contact' },
  ],

  headerCtas: {
    brochureButtonText: 'e-Brochure',
    showBrochureButton: true,
  },

  footerLinks: [
    { name: 'Home', path: '/' },
    { name: 'The Vision', path: '/about' },
    { name: 'Your Vista', path: '/master-plan' },
    { name: 'Architectural Gallery', path: '/gallery' },
    { name: 'Location & Connectivity', path: '/location' },
    { name: 'Contact', path: '/contact' },
  ],

  legalLinks: [
    { name: 'Privacy Policy & Terms', path: '/privacy-terms' },
  ]
};

export default navigationConfig;
