// Validar que la url tenga referencia a Youtube
export const validateSource = (url) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return true;
  } else {
    return "La URL debe ser de YouTube.";
  }
};
