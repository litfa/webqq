import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BotProfile } from 'typescript-mirai-api-http/src/types/ApiData'

export const useBotProfileStore = defineStore('profile', () => {
  const botProfile = ref<{ profile: BotProfile; qq: number } | null>(null)

  return { botProfile }
})
