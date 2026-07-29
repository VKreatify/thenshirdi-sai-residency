/**
 * Thenshirdi Sai Residency — Centralized Image Assets Registry
 * 
 * All images used throughout the web application are registered here
 * for easy maintenance, clean imports, and asset management.
 */

// Local Building & Hero Renders
import saiEstateBg from '../../../sai estate.png?url';
import saiDroneShot from '../../../sai drone shot.png?url';
import residenciesPageBg from '../../../residencies page.png?url';
import projectsPageBg from '../../../projects page.png?url';
import galleryPageBg from '../../../gallery page.png?url';
import locationPageBg from '../../../location page.png?url';
import contactPageBg from '../../../contact page.png?url';

export const HERO_IMAGES = {
  saiEstateBg,
  buildingRender: saiEstateBg,
  saiDroneShot,
  residenciesPageBg,
  projectsPageBg,
  galleryPageBg,
  locationPageBg,
  contactPageBg,
};

// Residence & Suite Renders (Unsplash High-Res Real Estate Renders)
export const RESIDENCE_IMAGES = {
  pageBg: residenciesPageBg,
  executive2Bhk: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  executive2BhkFloorplan: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
  royal3Bhk: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  royal3BhkFloorplan: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
  skyPenthouse: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  skyPenthouseFloorplan: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
};

// Amenities & Lifestyle Renders
export const AMENITY_IMAGES = {
  skyClubhouse: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
  zenGarden: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
  fitnessSuite: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  smartSecurity: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
};

// Gallery Collections
export const GALLERY_IMAGES = [
  { id: 'ext-1', title: 'Grand Entry Plaza', category: 'Exterior', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'int-1', title: 'Living Lounge & Sky Deck', category: 'Interior', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sky-1', title: 'Sky Pavilion Clubhouse Pool', category: 'Amenities', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80' },
  { id: 'int-2', title: 'Master Bedroom Suite', category: 'Interior', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' },
];

export default {
  HERO_IMAGES,
  RESIDENCE_IMAGES,
  AMENITY_IMAGES,
  GALLERY_IMAGES,
};
