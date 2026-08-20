const FOCUS_PATTERN = /^\d{1,3}(\.\d+)?%\s+\d{1,3}(\.\d+)?%$/;

export const DEFAULT_COVER_FOCUS = "50% 50%";

export function normalizeCoverFocus(value?: string | null): string {
  if (value && FOCUS_PATTERN.test(value.trim())) {
    return value.trim();
  }
  return DEFAULT_COVER_FOCUS;
}

export function coverFocusStyle(focus?: string | null): { objectPosition: string } {
  return { objectPosition: normalizeCoverFocus(focus) };
}
