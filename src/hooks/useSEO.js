import { useEffect } from 'react';
import useProperty from './useProperty';

/**
 * Custom hook to dynamically apply SEO metadata and Schema.org structured data
 * per page or globally from active configuration.
 */
export function useSEO({ title, description, keywords, image } = {}) {
  const { property, legal, seo, assets } = useProperty();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Page Title
    const finalTitle = title 
      ? (seo?.titleTemplate ? seo.titleTemplate.replace('%s', title) : `${title} | ${property.name}`)
      : (seo?.siteTitle || property.name);
    document.title = finalTitle;

    // 2. Meta Description
    const finalDescription = description || seo?.metaDescription || property.tagline;
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = finalDescription;

    // 3. Meta Keywords
    const finalKeywords = keywords || seo?.keywords || property.name;
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = finalKeywords;

    // 4. OpenGraph Tags
    const updateOrCreateMeta = (propertyAttr, contentVal) => {
      let el = document.querySelector(`meta[property='${propertyAttr}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', propertyAttr);
        document.head.appendChild(el);
      }
      el.content = contentVal;
    };

    updateOrCreateMeta('og:title', title ? `${title} | ${property.name}` : (seo?.ogTitle || property.name));
    updateOrCreateMeta('og:description', finalDescription);
    updateOrCreateMeta('og:image', image || seo?.ogImage || assets?.heroBackground || '');
    updateOrCreateMeta('og:url', typeof window !== 'undefined' ? window.location.href : (seo?.siteUrl || ''));

    // 5. Schema.org JSON-LD Structured Data
    const schemaScriptId = 'real-estate-jsonld-schema';
    let schemaScript = document.getElementById(schemaScriptId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaScriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': seo?.schemaType || 'RealEstateAgent',
      '@id': `${seo?.siteUrl || 'https://thenshirdisairesidency.com'}#organization`,
      name: property.name,
      url: seo?.siteUrl || 'https://thenshirdisairesidency.com',
      description: property.tagline || finalDescription,
      telephone: property.contact?.phone || '',
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.location?.roadFrontage || '',
        addressLocality: property.location?.city || '',
        addressRegion: property.location?.state || '',
        postalCode: property.location?.postalCode || '',
        addressCountry: 'IN'
      }
    };

    schemaScript.text = JSON.stringify(jsonLdData);

  }, [title, description, keywords, image, property, legal, seo, assets]);
}

export default useSEO;
