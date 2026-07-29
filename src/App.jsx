import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { jsPDF } from 'jspdf';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Streamlined Pages
import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import PrivacyTerms from './pages/PrivacyTerms';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Smooth Entrance Spawn Observer on Scroll
function ScrollSpawnObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip spawn animations on the Residences page to preserve pure CSS scroll stacking
    if (pathname === '/properties') return;

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
  const [bookingOpen, setBookingOpen] = useState(false);

  // Initialize Lenis Smooth Scroll (Optimized for Mobile & Low-Power Devices)
  useEffect(() => {
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

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis smooth scroll fallback:', e);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  // PDF e-Brochure Generation
  const handleDownloadBrochure = () => {
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      // Sand Paper Background
      doc.setFillColor(250, 248, 244);
      doc.rect(0, 0, 210, 297, 'F');

      // Double Gold Border Frame
      doc.setDrawColor(201, 160, 99);
      doc.setLineWidth(0.8);
      doc.rect(10, 10, 190, 277);
      doc.rect(12, 12, 186, 273);

      // Title & Branding
      doc.setTextColor(27, 26, 23);
      doc.setFont('times', 'bold');
      doc.setFontSize(24);
      doc.text('THENSHIRDI SAI RESIDENCY', 105, 40, { align: 'center' });

      doc.setFontSize(11);
      doc.setTextColor(168, 92, 60);
      doc.text('OFFICIAL ARCHITECTURAL E-BROCHURE — MAHARERA APPROVED', 105, 48, { align: 'center' });

      doc.setFontSize(10);
      doc.setTextColor(58, 54, 47);

      const bulletPoints = [
        '• 72 Low-Density Executive 2 & 3 BHK Luxury Residences',
        '• 100% Vastu-Compliant Orientation (East & North-East Door Entries)',
        '• 5-Minute Direct Proximity to Sacred Shirdi Sai Baba Temple',
        '• 10,000 Sq.Ft. Rooftop Sky Pavilion Clubhouse & Heated Pool',
        '• 5-Tier Biometric & IoT Smart Home Security Protection',
        '• Pre-Approved Home Loans from SBI, HDFC Bank, ICICI & Axis Bank'
      ];

      let yPos = 75;
      bulletPoints.forEach((pt) => {
        doc.text(pt, 25, yPos);
        yPos += 12;
      });

      doc.setFontSize(9);
      doc.setTextColor(108, 102, 92);
      doc.text('Site Address: VIP Temple Road, Off Highway 160, Shirdi, Maharashtra', 105, 260, { align: 'center' });
      doc.text('Contact Advisory: +91 98765 43210 | residences@thenshirdi.com', 105, 266, { align: 'center' });

      doc.save('Thenshirdi_Sai_Residency_Architectural_Brochure.pdf');
    } catch (err) {
      console.error('PDF Generation Error:', err);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <ScrollSpawnObserver />

      <Navbar
        onOpenBooking={() => setBookingOpen(true)}
        onDownloadBrochure={handleDownloadBrochure}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails onOpenBooking={() => setBookingOpen(true)} onDownloadBrochure={handleDownloadBrochure} />} />
          <Route path="/projects" element={<Projects onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/amenities" element={<Home onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/location" element={<Locations />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-terms" element={<PrivacyTerms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </Router>
  );
}
