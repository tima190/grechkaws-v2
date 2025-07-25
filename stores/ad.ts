// stores/ad.ts
import { defineStore } from 'pinia'

export const useAdStore = defineStore('ad', () => {
  const hiddenAds = ref<string[]>([])
  const expandedAds = ref<string[]>([])

  function hideAd(id: string) {
    if (!hiddenAds.value.includes(id)) {
      hiddenAds.value.push(id)
    }
  }

  function isHidden(id: string) {
    return hiddenAds.value.includes(id)
  }

  function toggleExpand(id: string) {
    if (expandedAds.value.includes(id)) {
      expandedAds.value = expandedAds.value.filter((item) => item !== id)
    } else {
      expandedAds.value.push(id)
    }
  }

  function isExpanded(id: string) {
    return expandedAds.value.includes(id)
  }

  return {
    hiddenAds,
    expandedAds,
    hideAd,
    isHidden,
    toggleExpand,
    isExpanded
  }
})
