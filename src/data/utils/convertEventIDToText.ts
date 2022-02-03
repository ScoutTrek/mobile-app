export function convertEventIDToText(id: string) {
  return id
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b[a-z](?=[a-z]{2})/g, (letter) => letter.toUpperCase());
}
