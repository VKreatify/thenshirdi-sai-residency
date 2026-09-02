import { HERO_IMAGES, AMENITY_IMAGES, SITE_GALLERY_IMAGES, LOCATION_LANDMARK_IMAGES } from '../assets/images';
import defaultTheme from './theme';
import navigationConfig from './navigation';

/**
 * Primary Real-Estate Property Configuration: Thenshirdi Sai Residency
 * 
 * To create a new project, you can simply duplicate this file or modify the fields below.
 * All UI components, animations, and pages dynamically consume this configuration.
 */
export const siteConfig = {
  // ── 1. Property Identity & Branding ──────────────────────────────────────
  property: {
    id: 'thenshirdi-sai-residency',
    name: 'Thenshirdi Sai Residency',
    brandMark: 'THENSHIRDI',
    brandText: 'Sai Residency',
    tagline: 'Thoughtful Planning. Secure Living.',
    type: 'Gated Residential Layout',
    status: 'Ready for Immediate Registration',
    totalPlots: 145,
    
    developer: {
      name: 'Thenshirdi Infra & Living Developers Pvt Ltd',
      experience: 'Premium Land Development & Infrastructure',
    },

    location: {
      locality: 'Panayampalli',
      city: 'Punjai Puliyampatti',
      district: 'Erode',
      state: 'Tamil Nadu',
      country: 'India',
      postalCode: '638459',
      addressString: 'Punjai Puliyampatti, Avinashi-Puliampatty-Bhavanisagar Rd, Panayampalli, Tamil Nadu 638459',
      roadFrontage: 'Main Avinashi-Puliampatty-Bhavanisagar Road',
      googleMapsUrl: 'https://maps.google.com/?q=Panayampalli+Punjai+Puliyampatti',
    },

    contact: {
      phone: '+91 90423 91100',
      phoneTel: '+919042391100',
      email: 'contactus@thenshirdisairesidency.com',
      whatsapp: '+919042391100',
      salesHours: 'Monday – Sunday: 9:00 AM – 7:30 PM (IST)',
      experienceCenterAddress: 'Punjai Puliyampatti, Avinashi-Puliampatty-Bhavanisagar Rd, Panayampalli, Tamil Nadu 638459',
    },
  },

  // ── 2. Legal, Regulatory & Approvals ─────────────────────────────────────
  legal: {
    dtcpNumber: '256/2022',
    tnReraNumber: '16807/2022',
    reraLayoutNumber: 'TN/10/Layout/0010/2023',
    registrationNumber: 'TN/10/Layout/0010/2023',
    authorityName: 'DTCP & TN RERA',
    projectName: 'Thenshirdi Sai Residency',
    developerName: 'Thenshirdi Infra & Living Developers Pvt Ltd',
    possessionDate: 'Immediate Registration',
    sanctionedPlans: 'DTCP: 256/2022 | RERA: TN/10/Layout/0010/2023',
    disclaimer: 'Disclaimer: All layout plans, dimensions, and specifications published herein are subject to DTCP & TN RERA sanctioned guidelines.',
    badges: [
      { label: 'DTCP APPROVED', value: '256/2022' },
      { label: 'TN RERA NO.', value: '16807/2022' },
      { label: 'RERA APPROVED LAYOUT', value: 'TN/10/Layout/0010/2023', fullSpan: true }
    ]
  },

  // ── 3. Project Key Statistics ────────────────────────────────────────────
  stats: [
    { label: 'DTCP Approval', value: '256', suffix: '/ 2022', detail: 'Sanctioned Layout Approval' },
    { label: 'TN RERA Registered', value: 'RERA', suffix: 'Approved', detail: 'Complete Legal Transparency' },
    { label: 'Total Plots', value: '145', suffix: '', detail: 'Sanctioned Residential Layout' },
    { label: 'Clear Titles', value: '100%', suffix: 'Verified', detail: 'Bank Loan Approved' }
  ],

  // ── 4. Hero & Content Copy Per Section ───────────────────────────────────
  content: {
    home: {
      hero: {
        eyebrow: 'SANCTIONED GATED LAYOUT',
        titleLine1: 'Thoughtful Planning.',
        titleLine2: 'Secure Living.',
        description: 'A DTCP & TN RERA approved residential layout at Panayampalli, Punjai Puliyampatti. Developed with wide blacktop roads, underground utilities, and 100% clear legal titles.',
        primaryCtaText: 'Your Vista',
        primaryCtaLink: '/master-plan',
        secondaryCtaText: 'Explore Gallery',
        secondaryCtaLink: '/gallery',
      },
      vision: {
        eyebrow: 'THE TOWNSHIP VISION',
        quote: '"Developed with clarity, legal security, and long-term value."',
        description: 'Thenshirdi Sai Residency is a well-planned gated layout situated on the main Avinashi-Puliampatty-Bhavanisagar Road at Panayampalli. Built with proper infrastructure—including wide internal roads, street lights, compound wall, and underground water supply lines—the project offers a calm residential environment with easy access to nearby towns and essential services.',
      },
      amenities: {
        eyebrow: 'INFRASTRUCTURE & FEATURES',
        title: 'Quality Infrastructure & Amenities',
      },
      faq: {
        eyebrow: 'TRANSPARENCY & CLARITY',
        title: 'Frequently Asked Questions',
      },
      contact: {
        eyebrow: 'GET IN TOUCH',
        title: 'Schedule a Site Walkthrough',
        description: 'Interested in inspecting the layout? Our team will assist you with site directions, layout maps, plot availability, and bank loan process.',
        formTitle: 'Request Callback',
        formSuccessTitle: 'Request Received',
        formSuccessMsg: 'Our sales team will reach out with layout maps and plot details shortly.',
      }
    },

    about: {
      eyebrow: 'THE ARCHITECTURAL VISION',
      title: 'A Sanctioned Gated Residential Township',
      description: 'Thenshirdi Sai Residency is a thoughtfully developed gated residential layout situated on the Avinashi-Puliampatty-Bhavanisagar Road at Panayampalli. Built with full DTCP and TN RERA approvals, the township combines clear legal titles with quality infrastructure, wide paved internal roads, and peaceful living.',
      features: [
        {
          icon: 'Compass',
          title: 'Vastu Compliant Planning',
          description: 'Oriented with Vastu compliance, each plot is laid out to support natural ventilation, morning sunlight, and comfortable residential design.',
        },
        {
          icon: 'ShieldCheck',
          title: 'DTCP & TN RERA Approved',
          description: 'Fully approved under DTCP (256/2022) & TN RERA (TN/10/Layout/0010/2023) standards. Structural integrity verified by independent engineering audits.',
        }
      ],
      governance: {
        eyebrow: 'GOVERNANCE & COMPLIANCE',
        title: 'DTCP & TN RERA Approved Legal Transparency',
        description: 'Thenshirdi Sai Residency operates with 100% legal clarity. All land titles, DTCP approvals, and RERA layout certifications are fully verified by independent legal counsel.',
      }
    },

    masterPlan: {
      eyebrow: 'MASTER LAYOUT PLAN',
      title: 'Your Vista',
      description: 'A vista is a clear, open view of the future. Discover your perfect plot of land at Thenshirdi Sai Residency-designed for peaceful living, scenic open surroundings, and a secure tomorrow.',
      enquiryCtaText: 'Enquire Us',
    },

    gallery: {
      eyebrow: 'VISUAL DOCUMENTATION',
      title: 'Architectural Gallery',
      subtitle: 'Tap or click any photograph to expand in high-definition full-screen view.',
      videoTourTitle: 'Thenshirdi Sai Residency — Visual Tour & Overview',
      videoTourDesc: 'Aerial drone footage and walkthrough highlighting the gated layout infrastructure, wide blacktop roads, surrounding environment, and immediate DTCP & RERA ready plots.',
    },

    locations: {
      eyebrow: 'CONNECTIVITY & ACCESSIBILITY',
      title: 'Strategic Road Connectivity',
      description: 'Situated directly on the main Avinashi-Puliampatty-Bhavanisagar Road at Panayampalli, offering smooth access to Punjai Puliyampatti town, bus stand, and regional transport routes.',
      blueprintEyebrow: 'MASTER LAYOUT PLAN',
      blueprintTitle: 'Site Blueprint & Plot Layout',
      blueprintDescription: 'Officially approved layout plan for Thenshirdi Sai Residency at Puliyampatti, featuring individually numbered plots, road widths, dimensions, and DTCP-approved demarcations.',
    },

    contact: {
      eyebrow: 'CONNECT WITH OUR ADVISORY TEAM',
      title: 'Arrange Your Private Consultation',
      description: 'Visit our Experience Center at Panayampalli, Punjai Puliyampatti or schedule a video briefing with our Senior Residential Director.',
      formEyebrow: 'DIRECT ADVISORY',
      formTitle: 'Request Dedicated Callback',
      successTitle: 'Request Received',
      successDescription: 'Our sales management team will reach out with layout maps and plot details shortly.',
    },

    privacy: {
      eyebrow: 'REGULATORY & LEGAL POLICIES',
      title: 'Privacy Policy & Terms of Service',
    }
  },

  // ── 5. Amenities Data Collection ─────────────────────────────────────────
  amenities: [
    {
      id: 'cctv-surveillance',
      title: '24/7 CCTV Surveillance & Centralized Monitoring',
      category: 'Safety & Security',
      span: 'bento-col-8',
      image: AMENITY_IMAGES.cctvSecurity,
      description: 'High-resolution 24/7 CCTV camera network with centralized monitoring and real-time recording across all internal roads and layout perimeters.'
    },
    {
      id: 'solar-lighting',
      title: 'Automatic Solar Panel Street Lights',
      category: 'Sustainable Infrastructure',
      span: 'bento-col-4',
      image: AMENITY_IMAGES.solarLighting,
      description: 'Automatic solar LED street lighting with intelligent dusk-to-dawn sensors, long-lasting battery storage, and all-weather performance.'
    },
    {
      id: 'wide-roads',
      title: 'Wide Paved Internal Roads',
      category: 'Infrastructure',
      span: 'bento-col-4',
      image: AMENITY_IMAGES.wideRoads,
      description: 'Well-engineered 30ft & 40ft wide blacktop roads with clear footpaths, street lighting, and avenue trees.'
    },
    {
      id: 'water-resource',
      title: 'Water Resource & Storage Facilities',
      category: 'Essential Utilities',
      span: 'bento-col-8',
      image: AMENITY_IMAGES.waterresource,
      description: 'Dedicated overhead water storage tank and underground distribution network ensuring 24/7 water supply across the layout.'
    }
  ],

  // ── 6. Location Landmarks / Hotspots Collection ──────────────────────────
  locationHotspots: [
    {
      id: 1,
      name: 'Puliyampatti Govt & Private Hospitals',
      shortName: 'Puliyampatti Govt. &\nPrivate Hospitals',
      category: 'Healthcare',
      categoryKey: 'HEALTHCARE KEY LANDMARK',
      distance: '6.9 km',
      travelTime: '11 mins',
      x: 66,
      y: 80,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.puliyampattiHospitals,
      note: '24/7 emergency medical care, multi-specialty clinics, diagnostic centers, and round-the-clock pharmacies.'
    },
    {
      id: 2,
      name: 'Bhavanisagar Dam & Park',
      shortName: 'Bhavanisagar\nDam & Park',
      category: 'Tourism',
      categoryKey: 'TOURISM KEY LANDMARK',
      distance: '10.5 km',
      travelTime: '14 mins',
      x: 16,
      y: 16,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.bhavanisagarDam,
      note: "One of the world's largest earthen dams featuring botanical gardens, boating facilities, and scenic riverfront recreation."
    },
    {
      id: 3,
      name: 'Bannari Amman Institute of Tech (BIT)',
      shortName: 'Bannari Amman\nInstitute (BIT)',
      category: 'Education',
      categoryKey: 'EDUCATION KEY LANDMARK',
      distance: '21.6 km',
      travelTime: '30 mins',
      x: 52,
      y: 14,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.bannariAmmanInstitute,
      note: 'Premier autonomous engineering and technology institution with world-class academic and sports infrastructure.'
    },
    {
      id: 4,
      name: 'Punjai Puliyampatti Town & Bus Stand',
      shortName: 'Punjai Puliyampatti\nBus Stand',
      category: 'Transit',
      categoryKey: 'TRANSIT KEY LANDMARK',
      distance: '7.6 km',
      travelTime: '10 mins',
      x: 72,
      y: 38,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.puliyampattiBusStand,
      note: 'Major municipal town hub with a central bus terminus connecting Coimbatore, Tiruppur, Erode, and Sathyamangalam.'
    },
    {
      id: 6,
      name: 'Coimbatore International Airport',
      shortName: 'Coimbatore\nInternational Airport',
      category: 'Transit',
      categoryKey: 'TRANSIT KEY LANDMARK',
      distance: '49.9 km',
      travelTime: '1 hr',
      x: 20,
      y: 80,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.coimbatoreAirport,
      note: 'Nearest international aviation hub offering daily domestic flights to all major Indian metros and international destinations.'
    },
    {
      id: 7,
      name: 'Kodiveri Waterfalls',
      shortName: 'Kodiveri\nWaterfalls',
      category: 'Tourism',
      categoryKey: 'TOURISM KEY LANDMARK',
      distance: '25.0 km',
      travelTime: '30 mins',
      x: 82,
      y: 62,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.kodiveriDam,
      note: 'Famous natural river cascade and family picnic destination with a historic check dam on the scenic Bhavani River.'
    },
    {
      id: 8,
      name: 'Dhimbam View Point',
      shortName: 'Dhimbam\nView Point',
      category: 'Tourism',
      categoryKey: 'TOURISM KEY LANDMARK',
      distance: '33.9 km',
      travelTime: '50 mins',
      x: 78,
      y: 16,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.dhimbamViewpoint,
      note: 'Spectacular mountain pass featuring 27 scenic hairpin bends with sweeping panoramic vistas of the Nilgiri Biosphere valley.'
    },
    {
      id: 10,
      name: 'Bannari Amman Temple',
      shortName: 'Bannari Amman\nTemple',
      category: 'Tourism',
      categoryKey: 'TOURISM KEY LANDMARK',
      distance: '19.7 km',
      travelTime: '28 mins',
      x: 42,
      y: 84,
      labelPos: 'right',
      image: LOCATION_LANDMARK_IMAGES.bannariAmmanTemple,
      note: 'Renowned spiritual sanctuary set against tranquil reserve forests and picturesque mountain foothills on NH 948.'
    }
  ],

  // ── 7. FAQ Collection ───────────────────────────────────────────────────
  faqs: [
    {
      question: 'What approvals does Thenshirdi Sai Residency hold?',
      answer: 'The layout is fully sanctioned by DTCP (Approval No. 256/2022) and registered under TN RERA (TN/10/Layout/0010/2023), offering complete legal clarity.'
    },
    {
      question: 'Are the plot titles clear and ready for immediate registration?',
      answer: 'Yes, all plots feature 100% verified legal titles and full DTCP & TN RERA sanctioning, enabling hassle-free immediate registration for buyers.'
    },
    {
      question: 'What infrastructure is provided in the development?',
      answer: 'The development includes wide blacktop roads, street lighting, compound wall, gated entry, water supply pipeline infrastructure, and dedicated park areas.'
    },
    {
      question: 'How can I schedule a site visit?',
      answer: 'You can call our direct desk at +91 90423 91100 or submit a callback request through our contact page to schedule a guided site walkthrough at Panayampalli.'
    }
  ],

  // ── 8. Gallery Collections ──────────────────────────────────────────────
  gallery: {
    images: [
      {
        id: 'gal-1',
        title: 'Gated Layout Entrance Arch & Access Road',
        category: 'Exterior',
        url: SITE_GALLERY_IMAGES.gallery1
      },
      {
        id: 'gal-2',
        title: '30ft & 40ft Internal Paved Blacktop Roads',
        category: 'Infrastructure',
        url: SITE_GALLERY_IMAGES.gallery2
      },
      {
        id: 'gal-3',
        title: 'Dedicated Park & Landscaping Space',
        category: 'Environment',
        url: SITE_GALLERY_IMAGES.gallery3
      },
      {
        id: 'gal-4',
        title: 'Underground Drainage & Water Infrastructure',
        category: 'Infrastructure',
        url: SITE_GALLERY_IMAGES.gallery4
      },
      {
        id: 'gal-5',
        title: 'Layout Perimeter Compound Wall',
        category: 'Exterior',
        url: SITE_GALLERY_IMAGES.gallery5
      },
      {
        id: 'gal-6',
        title: 'Surrounding Environment & Highway Connectivity',
        category: 'Environment',
        url: SITE_GALLERY_IMAGES.gallery6
      }
    ],
    videoTour: {
      url: SITE_GALLERY_IMAGES.galleryVideo,
      title: 'Thenshirdi Sai Residency — Visual Tour & Overview',
      description: 'Aerial drone footage and walkthrough highlighting the gated layout infrastructure, wide blacktop roads, surrounding environment, and immediate DTCP & RERA ready plots.'
    }
  },

  // ── 9. Assets & Downloads ───────────────────────────────────────────────
  assets: {
    logo: HERO_IMAGES.saiLogo,
    preloaderLogo: HERO_IMAGES.saiPreloaderLogo,
    favicon: HERO_IMAGES.saiLogo,
    heroBackground: HERO_IMAGES.saiEstateBg,
    droneShot: HERO_IMAGES.saiDroneShot,
    preloaderVideo: HERO_IMAGES.preloaderBgVideo,
    pageBackgrounds: {
      about: HERO_IMAGES.saiDroneShot,
      masterPlan: HERO_IMAGES.locationPageBg,
      gallery: HERO_IMAGES.galleryPageBg,
      location: HERO_IMAGES.locationPageBg,
      contact: HERO_IMAGES.contactPageBg,
    },
    blueprint: {
      image: HERO_IMAGES.saiResidencyBlueprint,
      downloadFilename: 'Thenshirdi_Sai_Residency_Blueprint.png',
      approvalTag: 'DTCP APPROVAL NO.: 256/2022',
      title: 'Official Layout Blueprint',
      subTitle: 'Panayampalli Village · Sathyamangalam Taluk · Erode District',
    },
    brochure: {
      file: HERO_IMAGES.saiResidencyBrochure,
      downloadFilename: 'Thenshirdi_Sai_Residency_Brochure.jpg',
    }
  },

  // ── 10. Integrations & Lead Capture ─────────────────────────────────────
  integrations: {
    googleSheetScriptUrl: 'https://script.google.com/macros/s/AKfycby-08clnvsMb9g-_XxRKL6_6h1EBfl50C6er8bBYUXwFk1LePAPCh2sXqCvGmtnvNOhgg/exec',
    metaPixelId: '28138787879049064',
    googleTagManagerId: 'GTM-PNKZFDJK',
    googleAnalyticsId: 'G-CJRTSN9WYX',
  },

  // ── 11. SEO & Metadata Configuration ────────────────────────────────────
  seo: {
    siteTitle: 'Thenshirdi Sai Residency — Gated Residential Layout',
    titleTemplate: '%s | Thenshirdi Sai Residency',
    metaDescription: 'Thenshirdi Sai Residency offers DTCP & TN RERA approved residential plots at Panayampalli, Punjai Puliyampatti. Clear legal titles, wide paved roads, and essential infrastructure.',
    keywords: 'Thenshirdi Sai Residency, Panayampalli Plots, Punjai Puliyampatti Real Estate, DTCP Approved Layout, TN RERA Approved',
    siteUrl: 'https://thenshirdisairesidency.com',
    ogTitle: 'Thenshirdi Sai Residency — Gated Residential Layout in Panayampalli',
    ogDescription: 'DTCP & TN RERA approved residential plots with wide blacktop roads, clear titles, and complete infrastructure.',
    ogImage: HERO_IMAGES.saiEstateBg,
    twitterCard: 'summary_large_image',
    schemaType: 'RealEstateAgent',
  },

  // ── 12. Theme & Navigation Reference ────────────────────────────────────
  theme: defaultTheme,
  navigation: navigationConfig,
};

export default siteConfig;
