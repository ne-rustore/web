const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getCopyright = () => {
  return `\u00A9 ${getCurrentYear()} RuStore. Скачивайте бесплатные приложения и игры для Android.`;
};
