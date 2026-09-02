import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Preloader from './components/Preloader';

// Hooks
import useProperty from './hooks/useProperty';
import useTheme from './hooks/useTheme';

// Streamlined Pages
import Home from './pages/Home';
import About from './pages/About';
import MasterPlan from './pages/MasterPlan';
import Gallery from './pages/Gallery';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import PrivacyTerms from './pages/PrivacyTerms';
import NotFound from './pages/NotFound';

import { HERO_IMAGES } from './assets/images';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScrollToTop = () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Execute scroll reset immediately
    resetScrollToTop();

    // Secondary reset on next tick to guarantee position after DOM paint/layout
    const timer = setTimeout(resetScrollToTop, 0);
    const anim = requestAnimationFrame(resetScrollToTop);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(anim);
    };
  }, [pathname, search]);

  return null;
}

// Smooth Entrance Spawn Observer on Scroll
function ScrollSpawnObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Select elements to animate cleanly on scroll
    const targets = document.querySelectorAll(
      '.spawn-on-scroll, .section-title-fluid, .eyebrow-label, .bento-grid > div, .glass-card-light, .glass-card-dark'
    );

    targets.forEach((el, idx) => {
      if (!el.classList.contains('spawn-on-scroll')) {
        el.classList.add('spawn-on-scroll');
      }
      // Apply staggered delays for grid items
      if (el.parentElement && el.parentElement.classList.contains('bento-grid')) {
        const delayMod = (idx % 4) + 1;
        el.classList.add(`spawn-delay-${delayMod}`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('spawn-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

export default function App() {
  const { property, assets } = useProperty();
  useTheme(); // Injects dynamic CSS variables for colors and fonts

  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPlot, setBookingPlot] = useState(null);

  const openBooking = (plot = null) => {
    setBookingPlot(plot);
    setBookingOpen(true);
  };

  // Initialize Lenis Smooth Scroll (Optimized for Mobile & Low-Power Devices)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    
    if (prefersReducedMotion || isTouchDevice) return;

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        infinite: false
      });
      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis smooth scroll fallback:', e);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  // Download e-Brochure
  const handleDownloadBrochure = () => {
    try {
      const brochureFile = assets?.brochure?.file || HERO_IMAGES.saiResidencyBrochure;
      const downloadName = assets?.brochure?.downloadFilename || `${property?.name?.replace(/\s+/g, '_')}_Brochure.jpg`;
      
      if (!brochureFile) return;

      const link = document.createElement('a');
      link.href = brochureFile;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Brochure Download Error:', err);
    }
  };

  return (
    <Router>
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      <ScrollToTop />
      <ScrollSpawnObserver />

      <div
        style={{
          visibility: preloaderComplete ? 'visible' : 'hidden',
          opacity: preloaderComplete ? 1 : 0,
          transition: 'opacity 1.0s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <Navbar
          onOpenBooking={openBooking}
          onDownloadBrochure={handleDownloadBrochure}
        />

        <main>
          <Routes>
            <Route path="/" element={<Home onOpenBooking={openBooking} />} />
            <Route path="/about" element={<About />} />
            <Route path="/master-plan" element={<MasterPlan onOpenBooking={openBooking} />} />
            <Route path="/your-vista" element={<MasterPlan onOpenBooking={openBooking} />} />
            <Route path="/plots" element={<MasterPlan onOpenBooking={openBooking} />} />
            <Route path="/layout" element={<MasterPlan onOpenBooking={openBooking} />} />
            <Route path="/amenities" element={<Home onOpenBooking={openBooking} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/location" element={<Locations />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-terms" element={<PrivacyTerms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => { setBookingOpen(false); setBookingPlot(null); }}
        selectedPlot={bookingPlot}
      />
    </Router>
  );
}
