import { getBotProfile } from '../apis/getProfile'
import { useBotProfileStore } from '../config/store'

export const getProfile = async () => {
  const botProfileStore = useBotProfileStore()
  const { data: res } = await getBotProfile()
  botProfileStore.botProfile = res.data
}
