import { useMemo } from 'react';
import ACTIVE_CONFIG from '../config';

/**
 * Custom hook to access the active property configuration, theme, copy, and assets.
 * 
 * Usage:
 * const { property, legal, stats, content, amenities, locationHotspots, faqs, gallery, assets, theme, navigation } = useProperty();
 */
export function useProperty() {
  const config = useMemo(() => ACTIVE_CONFIG, []);
  return config;
}

export default useProperty;
