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
import saiResidencyBlueprint from '../../../sai blueprint final.png?url';
import saiResidencyBrochure from '../../../sai residency brochure.jpg?url';
import saiLogo from '../../../sai logo final-Photoroom.png?url';
import saiPreloaderLogo from '../../../sai logo final-Photoroom.png?url';
import preloaderBgVideo from '../../../Land Transforming Into Residency 60.mp4?url';

import cctvSecurity from '../../../amenities2.png?url';
import solarLighting from '../../../amenities1.png?url';
import wideRoads from '../../../amenities3.png?url';
import waterresource from '../../../amenities4.png?url';

import gallery1 from '../../../gallery1.png?url';
import gallery2 from '../../../gallery2.png?url';
import gallery3 from '../../../gallery3.png?url';
import gallery4 from '../../../gallery4.png?url';
import gallery5 from '../../../gallery5.png?url';
import gallery6 from '../../../gallery6.png?url';
import galleryVideo from '../../../Sai Website Stuff - 2.mp4?url';
import bhavanisagarDam from '../../../bavani sagar dam.jpg?url';
import kodiveriDam from '../../../kodiveri dam.jpg?url';
import dhimbamViewpoint from '../../../dhimbam viewpoint talamalai.jpg?url';
import bannariAmmanTemple from '../../../Arulmigu Sri Bannari Mariamman.jpg?url';
import coimbatoreAirport from '../../../COIMBATORE airport.png?url';
import bannariAmmanInstitute from '../../../BIT.jpg?url';
import puliyampattiBusStand from '../../../puliyampatti bus stand.jpg?url';
import puliyampattiHospitals from '../../../hospital1.png?url';

export const LOCATION_LANDMARK_IMAGES = {
  bhavanisagarDam,
  kodiveriDam,
  dhimbamViewpoint,
  bannariAmmanTemple,
  coimbatoreAirport,
  bannariAmmanInstitute,
  puliyampattiBusStand,
  puliyampattiHospitals,
};

export const SITE_GALLERY_IMAGES = {
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  galleryVideo,
};

export const HERO_IMAGES = {
  saiLogo,
  saiPreloaderLogo,
  saiEstateBg,
  buildingRender: saiEstateBg,
  saiDroneShot,
  residenciesPageBg,
  projectsPageBg,
  galleryPageBg,
  locationPageBg,
  contactPageBg,
  saiResidencyBlueprint,
  saiResidencyBrochure,
  preloaderBgVideo,
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
  cctvSecurity,
  solarLighting,
  wideRoads,
  waterresource,
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
