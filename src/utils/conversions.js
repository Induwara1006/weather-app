export const cToF = (c) => (c * 9) / 5 + 32;
export const fToC = (f) => ((f - 32) * 5) / 9;

export const formatTemp = (t, unit) =>
  unit === "F" ? Math.round(cToF(t)) + "°F" : Math.round(t) + "°C";
