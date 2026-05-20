import type {SectionSpacing, SectionTheme} from '@/types';

export const sectionThemeClasses: Record<SectionTheme, string> = {
  light: 'bg-surface-light text-navy',
  dark: 'bg-ink text-white',
  accent: 'bg-deep text-white',
};

export const sectionSpacingClasses: Record<SectionSpacing, string> = {
  compact: 'py-[clamp(3rem,6vw,4.5rem)]',
  regular: 'py-[clamp(4rem,8vw,6rem)]',
  spacious: 'py-[clamp(5rem,10vw,8rem)]',
};

export function getSectionTheme(theme?: SectionTheme) {
  return sectionThemeClasses[theme ?? 'light'];
}

export function getSectionSpacing(spacing?: SectionSpacing) {
  return sectionSpacingClasses[spacing ?? 'regular'];
}

export function getEyebrowClass(theme?: SectionTheme) {
  return theme === 'dark' || theme === 'accent' ? 'section-tag' : 'section-tag section-tag-dark';
}

export function isInverseTheme(theme?: SectionTheme) {
  return theme === 'dark' || theme === 'accent';
}

export function getSectionMutedTextClass(theme?: SectionTheme) {
  return isInverseTheme(theme) ? 'text-white/68' : 'text-navy/70';
}

export function getSectionSubtleTextClass(theme?: SectionTheme) {
  return isInverseTheme(theme) ? 'text-white/55' : 'text-navy/55';
}

export function getSectionCardClass(theme?: SectionTheme) {
  return isInverseTheme(theme)
    ? 'border-white/10 bg-white/[0.03] hover:border-accent/35'
    : 'border-navy/10 bg-white/75 hover:border-accent/35';
}
