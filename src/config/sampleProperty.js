import { defaultTheme } from './theme';
import { navigationConfig } from './navigation';

/**
 * Sample / Fictional Property Configuration: Green Valley Residency (Pollachi)
 * 
 * Demonstrates how a completely different real estate project can be configured
 * with custom brand colors, amenities, copy, and location details.
 */
export const samplePropertyConfig = {
  property: {
    id: 'green-valley-residency',
    name: 'Green Valley Residency',
    brandMark: 'GREEN VALLEY',
    brandText: 'Eco Living',
    tagline: 'Scenic Serenity. Pure Living.',
    type: 'Eco-Friendly Gated Villa Plots',
    status: 'Bookings Open - Phase 1',
    totalPlots: 85,
    
    developer: {
      name: 'Green Valley Habitat Developers Pvt Ltd',
      experience: '15+ Years in Sustainable Land Developments',
    },

    location: {
      locality: 'Aliyar Foothills',
      city: 'Pollachi',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India',
      postalCode: '642101',
      addressString: 'Aliyar Main Road, Near Foothills Sanctuary, Pollachi, Tamil Nadu 642101',
      roadFrontage: '60ft Pollachi-Aliyar State Highway',
      googleMapsUrl: 'https://maps.google.com/?q=Pollachi+Tamil+Nadu',
    },

    contact: {
      phone: '+91 98400 12345',
      phoneTel: '+919840012345',
      email: 'sales@greenvalleyresidency.com',
      whatsapp: '+919840012345',
      salesHours: 'Monday – Sunday: 8:30 AM – 7:00 PM (IST)',
      experienceCenterAddress: 'Green Valley Welcome Center, Aliyar Main Rd, Pollachi, TN 642101',
    },
  },

  legal: {
    dtcpNumber: '112/2024',
    tnReraNumber: '09876/2024',
    reraLayoutNumber: 'TN/11/Layout/0088/2024',
    registrationNumber: 'TN/11/Layout/0088/2024',
    authorityName: 'DTCP & TN RERA',
    projectName: 'Green Valley Residency',
    developerName: 'Green Valley Habitat Developers Pvt Ltd',
    possessionDate: 'Immediate Handover',
    sanctionedPlans: 'DTCP: 112/2024 | RERA: TN/11/Layout/0088/2024',
    disclaimer: 'Disclaimer: Layout plans and specifications are subject to DTCP sanctioned guidelines.',
    badges: [
      { label: 'DTCP APPROVED', value: '112/2024' },
      { label: 'TN RERA NO.', value: '09876/2024' },
      { label: 'SANCTIONED ECO TOWNSHIP', value: 'TN/11/Layout/0088/2024', fullSpan: true }
    ]
  },

  stats: [
    { label: 'DTCP Sanctioned', value: '112', suffix: '/ 2024', detail: 'Fully Approved Layout' },
    { label: 'RERA Registered', value: 'RERA', suffix: 'Compliant', detail: '100% Legal Transparency' },
    { label: 'Sanctioned Plots', value: '85', suffix: '', detail: 'Scenic Villa Plots' },
    { label: 'Green Cover', value: '45%', suffix: 'Parks', detail: 'Eco-Living Environment' }
  ],

  content: {
    home: {
      hero: {
        eyebrow: 'ECO-FRIENDLY GATED TOWNSHIP',
        titleLine1: 'Pure Greenery.',
        titleLine2: 'Elevated Living.',
        description: 'DTCP & TN RERA sanctioned luxury villa plots nestled against the Western Ghats at Pollachi. Featuring 40ft tree-lined avenue roads, natural stream buffers, and solar infrastructure.',
        primaryCtaText: 'Explore Plots',
        primaryCtaLink: '/master-plan',
        secondaryCtaText: 'View Gallery',
        secondaryCtaLink: '/gallery',
      },
      vision: {
        eyebrow: 'THE TOWNSHIP VISION',
        quote: '"Harmonious living with nature, complete legal clarity, and everlasting peace."',
        description: 'Green Valley Residency is designed as a tranquil residential sanctuary overlooking coconut groves and mountain vistas. Equipped with modern utilities and sustainable amenities.',
      },
      amenities: {
        eyebrow: 'INFRASTRUCTURE & NATURE',
        title: 'Sustainable Infrastructure & Lifestyle Amenities',
      },
      faq: {
        eyebrow: 'BUYER CLARITY',
        title: 'Frequently Asked Questions',
      },
      contact: {
        eyebrow: 'PLAN YOUR VISIT',
        title: 'Schedule a Guided Green Valley Walkthrough',
        description: 'Visit our site at Pollachi. Our advisors will walk you through plot demarcations, vastu orientations, and loan pre-approvals.',
        formTitle: 'Request Callback',
        formSuccessTitle: 'Inquiry Received',
        formSuccessMsg: 'Our Pollachi advisory team will contact you shortly with the layout brochure.',
      }
    },

    about: {
      eyebrow: 'THE GREEN VISION',
      title: 'A Sustainable Gated Sanctuary in Pollachi',
      description: 'Built with complete DTCP & TN RERA approvals, Green Valley Residency offers unpolluted air, perennial ground water, and peaceful countryside living with easy city access.',
      features: [
        {
          icon: 'Compass',
          title: '100% Vastu Orientations',
          description: 'All villa plots designed with east and north facing aspects to capture morning sunshine and mountain breezes.',
        },
        {
          icon: 'ShieldCheck',
          title: 'DTCP & TN RERA Certified',
          description: 'Clear parent title deeds verified for over 40 years by leading legal counsels.',
        }
      ],
      governance: {
        eyebrow: 'REGULATORY TRANSPARENCY',
        title: 'Complete DTCP & TN RERA Compliance',
        description: 'Every plot is individually demarcated with stone boundary markers and clear registry documentation.',
      }
    },

    masterPlan: {
      eyebrow: 'VILLA PLOT LAYOUT',
      title: 'Your Future Horizon',
      description: 'Choose your ideal villa plot surrounded by lush greenery, wide paved roads, and clear blue skies.',
      enquiryCtaText: 'Inquire Now',
    },

    gallery: {
      eyebrow: 'SITE VISUALS',
      title: 'Landscape & Villa Gallery',
      subtitle: 'Click any image to view in high resolution.',
      videoTourTitle: 'Green Valley Residency — Drone Tour & Surroundings',
      videoTourDesc: 'Explore the scenic beauty, mountain views, and ready-to-build layout infrastructure in Pollachi.',
    },

    locations: {
      eyebrow: 'CONNECTIVITY',
      title: 'Highway Access & Scenic Landmarks',
      description: 'Directly situated on the Pollachi-Aliyar highway corridor with fast access to schools, hospitals, and transit points.',
      blueprintEyebrow: 'APPROVED LAYOUT PLAN',
      blueprintTitle: 'Site Layout & Plot Geometry',
      blueprintDescription: 'DTCP Approved Plot demarcations with road widths, avenue plantations, and dedicated park areas.',
    },

    contact: {
      eyebrow: 'GET IN TOUCH',
      title: 'Consult with Our Pollachi Desk',
      description: 'Schedule an on-site walkthrough or video consultation with our senior project directors.',
      formEyebrow: 'DIRECT ADVISORY',
      formTitle: 'Request Call',
      successTitle: 'Thank You',
      successDescription: 'We will reach out with the complete pricing sheet and plot availability.',
    },

    privacy: {
      eyebrow: 'LEGAL & PRIVACY',
      title: 'Privacy Policy & Terms',
    }
  },

  amenities: [
    {
      id: 'solar-lighting',
      title: '100% Solar Powered Street Lighting',
      category: 'Eco Energy',
      span: 'bento-col-8',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      description: 'Automatic dusk-to-dawn solar lighting across all avenue roads.'
    },
    {
      id: 'cctv-security',
      title: 'Gated Entry with 24/7 Security & CCTV',
      category: 'Security',
      span: 'bento-col-4',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      description: 'Secured perimeter compound wall and central surveillance booth.'
    },
    {
      id: 'blacktop-roads',
      title: '40ft & 30ft Wide Tree-Lined Roads',
      category: 'Infrastructure',
      span: 'bento-col-4',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Engineered heavy-duty blacktop roads with pedestrian walkways.'
    },
    {
      id: 'water-abundant',
      title: 'Perennial Mountain Water Supply Network',
      category: 'Utilities',
      span: 'bento-col-8',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      description: 'Dedicated overhead storage tank and individual pipe connection to every plot.'
    }
  ],

  locationHotspots: [
    {
      id: 1,
      name: 'Pollachi City Center & Bus Terminus',
      shortName: 'Pollachi City\nTerminus',
      category: 'Transit',
      categoryKey: 'TRANSIT HUB',
      distance: '8.5 km',
      travelTime: '12 mins',
      x: 50,
      y: 40,
      labelPos: 'right',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      note: 'Central commercial district with bus connectivity across Tamil Nadu and Kerala.'
    },
    {
      id: 2,
      name: 'Aliyar Dam & Botanical Gardens',
      shortName: 'Aliyar Dam\n& Park',
      category: 'Tourism',
      categoryKey: 'SCENIC ATTRACTION',
      distance: '12.0 km',
      travelTime: '15 mins',
      x: 75,
      y: 70,
      labelPos: 'right',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      note: 'Scenic reservoir against Anamalai Tiger Reserve foothills.'
    }
  ],

  faqs: [
    {
      question: 'What approvals are available for Green Valley Residency?',
      answer: 'The project is sanctioned under DTCP Approval No. 112/2024 and registered with TN RERA (TN/11/Layout/0088/2024).'
    },
    {
      question: 'Can I get a bank loan for plot purchase?',
      answer: 'Yes, leading nationalized and private banks (SBI, HDFC, ICICI) have approved the project with up to 80% loan availability.'
    }
  ],

  gallery: {
    images: [
      {
        id: 'gv-1',
        title: 'Scenic Mountain Vistas from Site',
        category: 'Landscape',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'gv-2',
        title: 'Tree-Lined Internal Avenue Roads',
        category: 'Infrastructure',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    videoTour: {
      url: '',
      title: 'Green Valley Residency Aerial Overview',
      description: 'Panoramic drone perspectives showcasing the layout, Western Ghats views, and infrastructure.'
    }
  },

  assets: {
    logo: '',
    preloaderLogo: '',
    favicon: '',
    heroBackground: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
    droneShot: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
    preloaderVideo: '',
    pageBackgrounds: {
      about: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
      masterPlan: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
      gallery: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
      location: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
      contact: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
    },
    blueprint: {
      image: '',
      downloadFilename: 'Green_Valley_Residency_Layout.png',
      approvalTag: 'DTCP APPROVAL NO.: 112/2024',
      title: 'Sanctioned Villa Layout Blueprint',
      subTitle: 'Aliyar Foothills Corridor · Pollachi Taluk',
    },
    brochure: {
      file: '',
      downloadFilename: 'Green_Valley_Residency_Brochure.pdf',
    }
  },

  integrations: {
    googleSheetScriptUrl: '',
    metaPixelId: '',
    googleTagManagerId: '',
    googleAnalyticsId: '',
  },

  seo: {
    siteTitle: 'Green Valley Residency — Eco Villa Plots in Pollachi',
    titleTemplate: '%s | Green Valley Residency',
    metaDescription: 'DTCP & TN RERA approved eco-friendly gated villa plots at Pollachi near Aliyar foothills.',
    keywords: 'Green Valley Residency, Pollachi Plots, Coimbatore Real Estate, Villa Plots Tamil Nadu',
    siteUrl: 'https://greenvalleyresidency.com',
    ogTitle: 'Green Valley Residency — Scenic Villa Plots in Pollachi',
    ogDescription: 'DTCP & TN RERA approved gated villa layout in Pollachi with mountain views and complete infrastructure.',
    ogImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    twitterCard: 'summary_large_image',
    schemaType: 'RealEstateAgent',
  },

  theme: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      goldAccent: '#48bb78', // Eco Green accent
      goldGlow: 'rgba(72, 187, 120, 0.35)',
      goldHover: '#38a169',
      clayAccent: '#2b6cb0', // Deep River Blue secondary
      clayHover: '#2c5282',
    }
  },
  navigation: navigationConfig,
};

export default samplePropertyConfig;
