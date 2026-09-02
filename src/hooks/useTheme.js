import { useEffect } from 'react';
import useProperty from './useProperty';

/**
 * Custom hook that automatically injects theme CSS variables into the document root.
 */
export function useTheme() {
  const { theme } = useProperty();

  useEffect(() => {
    if (typeof document === 'undefined' || !theme) return;
    const root = document.documentElement;

    if (theme.colors) {
      if (theme.colors.goldAccent) root.style.setProperty('--gold-accent', theme.colors.goldAccent);
      if (theme.colors.goldGlow) root.style.setProperty('--gold-glow', theme.colors.goldGlow);
      if (theme.colors.goldHover) root.style.setProperty('--gold-hover', theme.colors.goldHover);
      if (theme.colors.clayAccent) root.style.setProperty('--clay-accent', theme.colors.clayAccent);
      if (theme.colors.clayHover) root.style.setProperty('--clay-hover', theme.colors.clayHover);
      if (theme.colors.bgSand) root.style.setProperty('--bg-sand', theme.colors.bgSand);
      if (theme.colors.bgDark) root.style.setProperty('--bg-dark', theme.colors.bgDark);
    }

    if (theme.typography) {
      if (theme.typography.fontSerif) root.style.setProperty('--font-serif', theme.typography.fontSerif);
      if (theme.typography.fontSans) root.style.setProperty('--font-sans', theme.typography.fontSans);
    }
  }, [theme]);

  return theme;
}

export default useTheme;
