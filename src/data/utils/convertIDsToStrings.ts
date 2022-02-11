export function convertEventIDToText(id: string) {
  return id
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b[a-z](?=[a-z]{2})/g, (letter) => letter.toUpperCase());
}

export function convertRoleToText(role: string) {
  return role
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
