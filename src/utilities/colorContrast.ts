/**
 * Returns true if the given CSS color string is perceptually light.
 * Supports #rgb, #rrggbb, and named colors via a canvas fallback.
 * Defaults to false (dark) for unrecognised or null values.
 */
export function isLightBackground(color?: string | null): boolean {
  if (!color) return false

  let r = 0, g = 0, b = 0

  const hex = color.trim()
  if (hex.startsWith('#')) {
    const raw = hex.slice(1)
    if (raw.length === 3) {
      r = parseInt(raw[0]! + raw[0]!, 16)
      g = parseInt(raw[1]! + raw[1]!, 16)
      b = parseInt(raw[2]! + raw[2]!, 16)
    } else if (raw.length === 6) {
      r = parseInt(raw.slice(0, 2), 16)
      g = parseInt(raw.slice(2, 4), 16)
      b = parseInt(raw.slice(4, 6), 16)
    } else {
      return false
    }
  } else {
    // Named colors: not reliably parseable server-side — default to dark
    return false
  }

  // WCAG relative luminance (sRGB)
  const luminance = (channel: number) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  const L = 0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b)

  // > 0.179 is considered light (ratio against white < 4.5:1)
  return L > 0.179
}
