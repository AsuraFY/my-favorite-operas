// A single numeric line-height applies to every bilingual libretto reader.
// Preserve choices saved by the earlier three-preset version.
export const MIN_LINE_SPACING = 1.2;
export const MAX_LINE_SPACING = 2.6;
export const LINE_SPACING_STEP = 0.05;
export const DEFAULT_LINE_SPACING = 1.55;
const LEGACY_CHOICES = Object.freeze({
  compact: 1.4,
  comfortable: 1.55,
  spacious: 1.75
});

export function normalizeLineSpacing(value) {
  const original = Object.hasOwn(LEGACY_CHOICES, value) ? LEGACY_CHOICES[value] : value;
  if (original == null || original === "") return DEFAULT_LINE_SPACING;
  const numeric = Number(original);
  if (!Number.isFinite(numeric)) return DEFAULT_LINE_SPACING;
  const bounded = Math.min(MAX_LINE_SPACING, Math.max(MIN_LINE_SPACING, numeric));
  return Number((Math.round(bounded / LINE_SPACING_STEP) * LINE_SPACING_STEP).toFixed(2));
}

export function stepLineSpacing(current, direction) {
  const value = normalizeLineSpacing(current);
  const next = value + Math.sign(direction) * LINE_SPACING_STEP;
  return normalizeLineSpacing(Math.round(next * 100) / 100);
}

export function applyReadingSpacing(root, value) {
  const selected = normalizeLineSpacing(value);
  root.dataset.lineSpacing = selected.toFixed(2);
  root.style.setProperty("--libretto-line-height", selected.toFixed(2));
  return selected;
}
