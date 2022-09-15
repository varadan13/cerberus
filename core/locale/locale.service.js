class LocaleService {
  translate(translatable) {
    return translate(translatable);
  }
}

function translate(translatable) {
  const translation = translatable.translations[0];

  const translated = { ...translatable };
  delete translated.translations;

  for (const [key, value] of Object.entries(translation)) {
    if (key !== "languageCode" && key !== "id") {
      translated[key] = value;
    }
  }
  return translated;
}
