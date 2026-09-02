/**
 * Real Estate Template — Central Theme & Design System Configuration
 * 
 * Change brand colors, typography fonts, border radii, and glassmorphism styling
 * across the entire application from here.
 */

export const defaultTheme = {
  colors: {
    // Primary brand accents
    goldAccent: '#C9A063',
    goldGlow: 'rgba(201, 160, 99, 0.35)',
    goldHover: '#b08a4f',
    
    clayAccent: '#A85C3C',
    clayHover: '#8e4c30',

    // Light Theme Surfaces
    bgSand: '#FAF8F4',
    bgSandMuted: '#F2EDE4',
    inkDark: '#1B1A17',
    textBody: '#3A362F',
    textMuted: '#6C665C',

    // Dark Theme Surfaces & Overlays
    bgDark: '#15130F',
    bgDarkCard: '#1B1A17',
    textOnDark: '#FAF8F4',
    textMutedDark: '#A59E92',

    // Status Colors (Available, Sold, Reserved)
    statusAvailable: '#4ade80',
    statusSold: '#C8BFB5',
    statusReserved: '#F5E6DF',
  },

  typography: {
    fontSerif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
    fontHeading: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontDisplay: "'Outfit', 'Plus Jakarta Sans', sans-serif",
  },

  borderRadius: {
    sm: '10px',
    md: '18px',
    lg: '26px',
    xl: '34px',
    full: '9999px',
  },

  glassmorphism: {
    lightBg: 'rgba(250, 248, 244, 0.72)',
    lightBorder: 'rgba(201, 160, 99, 0.25)',
    lightShadow: '0 20px 45px -10px rgba(27, 26, 23, 0.06), 0 4px 16px rgba(0, 0, 0, 0.02)',
    lightHoverBorder: 'rgba(201, 160, 99, 0.55)',

    darkBg: 'rgba(27, 26, 23, 0.72)',
    darkBorder: 'rgba(201, 160, 99, 0.3)',
    darkShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.45)',
    darkHoverBorder: 'rgba(201, 160, 99, 0.65)',
  }
};

export default defaultTheme;
