// This function is used to search for a string in a string
// It ignores case, accents and high-order characters
const normalize = (string?: string) =>
  (string || '')
    .normalize('NFD')
    .replace(/['’.,/#!$%^&*;:{}=\-_`~() ]/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const search = (haystack?: string, needle?: string): boolean =>
  normalize(haystack).includes(normalize(needle));

// Better syntax - searchString(haystack).for(needle);
export const searchString = (haystack?: string) => ({
  for: (needle?: string) => search(haystack, needle),
});

// Alternative syntax - findString(needle).in(haystack);
export const findString = (needle?: string) => ({
  in: (haystack?: string) => search(haystack, needle),
});
