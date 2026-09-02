import ACTIVE_CONFIG from '../config';

export const GOOGLE_SHEET_SCRIPT_URL = ACTIVE_CONFIG.integrations?.googleSheetScriptUrl || "";

// Production-safe lead submission helper (Google Sheets + Meta Pixel ready)
export const submitLeadToGoogleSheet = async (leadData) => {
  // 1. Safe Meta Pixel Lead Conversion Tracking
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', 'Lead', {
        content_name: leadData.source || 'Website Lead',
        currency: 'INR'
      });
    } catch (pixelErr) {
      console.warn('Meta Pixel tracking warning:', pixelErr);
    }
  }

  // 2. Safe Google Sheet Webhook Dispatch
  const webhookUrl = ACTIVE_CONFIG.integrations?.googleSheetScriptUrl || GOOGLE_SHEET_SCRIPT_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          propertyId: ACTIVE_CONFIG.property?.id || 'real-estate-project',
          propertyName: ACTIVE_CONFIG.property?.name || '',
          submittedAt: new Date().toLocaleString()
        })
      });
    } catch (err) {
      console.error('Google Sheet submission warning:', err);
    }
  }
};

export const RERA_DETAILS = {
  dtcpApproved: ACTIVE_CONFIG.legal?.dtcpNumber || "256/2022",
  tnReraNumber: ACTIVE_CONFIG.legal?.tnReraNumber || "16807/2022",
  reraLayoutNumber: ACTIVE_CONFIG.legal?.reraLayoutNumber || "TN/10/Layout/0010/2023",
  registrationNumber: ACTIVE_CONFIG.legal?.registrationNumber || "TN/10/Layout/0010/2023",
  authorityName: ACTIVE_CONFIG.legal?.authorityName || "DTCP & TN RERA",
  projectName: ACTIVE_CONFIG.property?.name || "Thenshirdi Sai Residency",
  developerName: ACTIVE_CONFIG.legal?.developerName || ACTIVE_CONFIG.property?.developer?.name || "Thenshirdi Infra & Living Developers Pvt Ltd",
  possessionDate: ACTIVE_CONFIG.legal?.possessionDate || "Immediate Registration",
  sanctionedPlans: ACTIVE_CONFIG.legal?.sanctionedPlans || "DTCP: 256/2022 | RERA: TN/10/Layout/0010/2023",
  disclaimer: ACTIVE_CONFIG.legal?.disclaimer || "Disclaimer: All layout plans, dimensions, and specifications published herein are subject to DTCP & TN RERA sanctioned guidelines."
};

export const PROJECT_STATS = ACTIVE_CONFIG.stats || [];

export const AMENITIES = ACTIVE_CONFIG.amenities || [];

export const LOCATION_HOTSPOTS = ACTIVE_CONFIG.locationHotspots || [];

export const FAQS = ACTIVE_CONFIG.faqs || [];

export default {
  submitLeadToGoogleSheet,
  RERA_DETAILS,
  PROJECT_STATS,
  AMENITIES,
  LOCATION_HOTSPOTS,
  FAQS,
};
