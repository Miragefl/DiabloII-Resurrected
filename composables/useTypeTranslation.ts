export function useTypeTranslation() {
  const { t } = useI18n()

  function translateType(type: string): string {
    const key = `types.${type}`
    const translated = t(key)
    return translated === key ? type : translated
  }

  function translateClass(cls: string): string {
    const key = `classes.${cls}`
    const translated = t(key)
    return translated === key ? cls : translated
  }

  return { translateType, translateClass }
}
