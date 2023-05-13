import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BotProfile } from 'typescript-mirai-api-http/src/types/ApiData'

export const useBotProfileStore = defineStore('profile', () => {
  const botProfile = ref<BotProfile | null>(null)

  return { botProfile }
})
