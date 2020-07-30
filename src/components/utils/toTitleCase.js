export const toTitleCase = (string) =>
  string
    .match(/[A-Z]*[^A-Z]+/g)
    .join(' ')
    .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
