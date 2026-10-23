// Reader preference adjusts the gap between paired lyric rows, not line height.
// Old line-height preferences are migrated when no row-gap preference exists.
export const MIN_ROW_GAP = 0;
export const MAX_ROW_GAP = 28;
export const ROW_GAP_STEP = 2;
export const DEFAULT_ROW_GAP = 8;

export function normalizeRowGap(value) {
  if (value === null || value === undefined || value === "") return DEFAULT_ROW_GAP;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return DEFAULT_ROW_GAP;
  const bounded = Math.min(MAX_ROW_GAP, Math.max(MIN_ROW_GAP, numeric));
  return Math.round(bounded / ROW_GAP_STEP) * ROW_GAP_STEP;
}

export function migrateLineSpacing(value) {
  const old = {compact: 1.4, comfortable: 1.55, spacious: 1.75};
  const legacy = Object.hasOwn(old, value) ? old[value] : Number(value);
  if (!Number.isFinite(legacy) || legacy <= 0) return DEFAULT_ROW_GAP;
  return normalizeRowGap((legacy - 1.2) * 20);
}

export function stepRowGap(current, direction) {
  return normalizeRowGap(normalizeRowGap(current) + Math.sign(Number(direction) || 0) * ROW_GAP_STEP);
}

export function applyReadingSpacing(root, value) {
  const selected = normalizeRowGap(value);
  root.dataset.rowGap = String(selected);
  root.style.setProperty("--libretto-row-gap", selected + "px");
  return selected;
}
