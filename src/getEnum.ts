export const getEnumKeys = (anEnum: Record<string, unknown>) =>
  Object.keys(anEnum).filter((key) => isNaN(Number(key)));

export const getEnumValues = (anEnum: Record<string, unknown>) =>
  getEnumKeys(anEnum).map((key) => anEnum[key]);
