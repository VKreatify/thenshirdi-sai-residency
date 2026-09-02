import siteConfig from './siteConfig';
import samplePropertyConfig from './sampleProperty';

/**
 * ACTIVE PROPERTY SELECTOR
 * 
 * Set ACTIVE_CONFIG to:
 * - siteConfig (Thenshirdi Sai Residency - Default)
 * - samplePropertyConfig (Green Valley Residency - Demo/Test)
 * 
 * Or plug in any custom property config object conforming to the schema.
 */
export const ACTIVE_CONFIG = siteConfig;

export { siteConfig, samplePropertyConfig };
export default ACTIVE_CONFIG;
