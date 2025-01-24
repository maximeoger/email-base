export async function getTranslations (locale: string) {
  const translations = await import (`./public/locales/${locale}/common.json`);
  return translations.default;
}
