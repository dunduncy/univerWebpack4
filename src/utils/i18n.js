// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(item) {
  const hasKey = this.$te('route.' + item.meta.langKey)
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + item.meta.langKey)
    return translatedTitle
  }
  return item.meta.title
}
