export const RERA_DETAILS = {
  registrationNumber: "Approved & Sanctioned",
  authorityName: "MahaRERA (Maharashtra Real Estate Regulatory Authority)",
  projectName: "Thenshirdi Sai Residency",
  developerName: "Thenshirdi Infra & Living Developers Pvt Ltd",
  possessionDate: "December 2026",
  sanctionedPlans: "MC/SHIRDI/PL-2024/09",
  disclaimer: "Disclaimer: All information, renders, floor plans, and specifications published herein are indicative and subject to change per regulatory guidelines."
};

export const PROJECT_STATS = [
  { label: "Bespoke Residences", value: "72", suffix: "Units", detail: "Low-density executive layout" },
  { label: "Possession Target", value: "Q4", suffix: "2026", detail: "On-schedule structural delivery" },
  { label: "Sky Clubhouse", value: "10k", suffix: "Sq.Ft.", detail: "Rooftop wellness & lounge" },
  { label: "Temple Proximity", value: "5", suffix: "Mins", detail: "Direct access to Sai Temple" }
];

export const RESIDENCES = [
  {
    id: "2bhk-executive",
    title: "The Executive 2 BHK Suite",
    tagline: "Thoughtfully proportioned luxury for modern urban families",
    type: "2 BHK",
    carpetArea: "1,150 Sq.Ft.",
    balconyArea: "140 Sq.Ft.",
    orientation: "East Facing (100% Vastu Aligned)",
    startingPrice: "₹78 Lakhs",
    emiStarting: "₹52,400 / mo",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    floorPlanImage: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
    features: [
      "Teakwood main door with biometric smart lock",
      "Italian marble flooring in living & dining areas",
      "Full-height acoustic double-glazed windows",
      "Modular kitchen with integrated Bosch appliances",
      "Spacious covered balcony with panoramic temple views"
    ]
  },
  {
    id: "3bhk-royal",
    title: "The Royal 3 BHK Residence",
    tagline: "Expansive sanctuary with dual master suites & private sky deck",
    type: "3 BHK",
    carpetArea: "1,680 Sq.Ft.",
    balconyArea: "210 Sq.Ft.",
    orientation: "North-East Facing (Vastu Compliant)",
    startingPrice: "₹1.25 Cr",
    emiStarting: "₹84,000 / mo",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    floorPlanImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    features: [
      "Private elevator foyer entry",
      "Walk-in wardrobe in Master Suite",
      "VRV air conditioning in all rooms",
      "Dedicated maid's quarters with bath",
      "Corner wrap-around sky deck"
    ]
  },
  {
    id: "sky-penthouse",
    title: "The Signature Sky Duplex Penthouse",
    tagline: "The pinnacle of architectural grandeur with private plunge pool",
    type: "Sky Duplex",
    carpetArea: "2,850 Sq.Ft.",
    balconyArea: "550 Sq.Ft. Private Terrace",
    orientation: "East-North East Quad (Vastu Supreme)",
    startingPrice: "₹2.45 Cr",
    emiStarting: "₹1,65,000 / mo",
    bedrooms: 4,
    bathrooms: 5,
    balconies: 4,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    floorPlanImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    features: [
      "Double-height 22ft living room ceiling",
      "Private rooftop temperature-controlled plunge pool",
      "Personal internal elevator",
      "Automated Lutron smart lighting & climate control",
      "Exclusive access to Penthouse Sky Lounge"
    ]
  }
];

export const AMENITIES = [
  {
    id: "sky-clubhouse",
    title: "The Sky Pavilion Clubhouse",
    category: "Wellness & Social",
    span: "bento-col-8",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    description: "10,000 Sq.Ft. elevated sanctuary featuring a heated infinity pool, private dining suite, and executive lounge overlooking the Shirdi skyline."
  },
  {
    id: "zen-garden",
    title: "Zen Meditation & Reflexology Courtyard",
    category: "Serenity",
    span: "bento-col-4",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    description: "Lushly landscaped sanctuary designed according to Vastu energy pathways with water cascades."
  },
  {
    id: "fitness-suite",
    title: "Technogym Athletic Suite",
    category: "Health & Fitness",
    span: "bento-col-4",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    description: "State-of-the-art fitness center with personal training bays, yoga studio, and steam sauna rooms."
  },
  {
    id: "smart-security",
    title: "5-Tier Biometric & IoT Protection",
    category: "Safety & Automation",
    span: "bento-col-8",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80",
    description: "24/7 AI-powered perimeter surveillance, automatic vehicle license plate recognition, and smart video door phones in every home."
  }
];

export const LOCATION_HOTSPOTS = [
  { id: 1, name: "Shirdi Sai Baba Temple (VIP Gate)", category: "Temple", distance: "1.2 km", travelTime: "5 mins", x: 45, y: 35 },
  { id: 2, name: "Shirdi International Airport (SAG)", category: "Transit", distance: "14 km", travelTime: "18 mins", x: 75, y: 20 },
  { id: 3, name: "Sainagar Shirdi Railway Station", category: "Transit", distance: "3.5 km", travelTime: "8 mins", x: 25, y: 55 },
  { id: 4, name: "Super Specialty Hospital & Research Centre", category: "Healthcare", distance: "2.1 km", travelTime: "6 mins", x: 60, y: 65 },
  { id: 5, name: "Shirdi International School", category: "Education", distance: "1.8 km", travelTime: "5 mins", x: 30, y: 30 }
];

export const TESTIMONIALS = [
  {
    quote: "Thenshirdi Sai Residency achieved something rare: absolute architectural refinement while preserving a sense of spiritual peace. The East-facing balcony view towards the temple morning sunrise is unmatched.",
    author: "Rajan & Meera Malhotra",
    designation: "Resident — Royal 3 BHK Suite",
    location: "Mumbai / Shirdi"
  },
  {
    quote: "The quality of finishes — from Italian marble to the double-glazed windows — rivals prime Mumbai residential towers. The sales transparency and MahaRERA compliance gave us complete confidence.",
    author: "Dr. Ananya Deshmukh",
    designation: "Owner — Executive 2 BHK",
    location: "Pune"
  },
  {
    quote: "As an NRI investor, finding a Vastu-authentic property with world-class facilities and full rental management was key. Thenshirdi delivers exceptional peace of mind.",
    author: "Vikramjit Singh",
    designation: "Owner — Sky Duplex Penthouse",
    location: "Dubai, UAE"
  }
];

export const FAQS = [
  {
    question: "How are the residences aligned with Vastu principles?",
    answer: "Every residence in Thenshirdi Sai Residency has been designed in strict consultation with accredited Vastu masters. Features include East and North-East entry doors, kitchen positioning in the South-East (Agneya), and master bedrooms in the South-West (Nairutya)."
  },
  {
    question: "Is the project MahaRERA approved?",
    answer: "Yes, Thenshirdi Sai Residency is fully registered and approved by the Maharashtra Real Estate Regulatory Authority. All sanction plans and title deeds are verified."
  },
  {
    question: "What financial partners offer home loan approvals?",
    answer: "Pre-approved home loans are available through major banking institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda at competitive interest rates."
  },
  {
    question: "What is the expected possession timeline?",
    answer: "Structural framing is currently 85% complete. Interior finishing and clubhouse fitments are on track for delivery in Q4 2026."
  }
];
