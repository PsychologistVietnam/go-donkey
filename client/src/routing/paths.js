export const SUPPORTED_LANGUAGES = ["en", "vi", "nl"];

export const MENU_ITEMS = [
  { id: "journey", label: "journey" },
  { id: "donkey", label: "donkey" },
  { id: "walk-with-us", label: "walk" },
  { id: "blog", label: "stories" },
  { id: "hope", label: "hope" },
  { id: "about", label: "about" },
];

export function getLanguageFromPath(pathname) {
  const pathLanguage = pathname.split("/")[1];
  return SUPPORTED_LANGUAGES.includes(pathLanguage) ? pathLanguage : "en";
}

export function getLocalizedPath(page, language) {
  const languagePrefix =
    language !== "en" && SUPPORTED_LANGUAGES.includes(language)
      ? `/${language}`
      : "";
  const pagePath = !page || page === "home" ? "" : `/${page}`;

  return `${languagePrefix}${pagePath}` || "/";
}
