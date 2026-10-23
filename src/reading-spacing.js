// Reader-specific unitless line-height multipliers.
export const LINE_SPACING_CHOICES = Object.freeze({
  compact: 1.4,
  comfortable: 1.55,
  spacious: 1.75
});

export function normalizeLineSpacing(choice) {
  return Object.hasOwn(LINE_SPACING_CHOICES, choice) ? choice : "comfortable";
}

export function applyReadingSpacing(root, choice) {
  const selected = normalizeLineSpacing(choice);
  root.dataset.lineSpacing = selected;
  root.style.setProperty("--libretto-line-height", String(LINE_SPACING_CHOICES[selected]));
  return selected;
}
