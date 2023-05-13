import request, { Response } from '../utils/request'
import type { BotProfile } from 'typescript-mirai-api-http/src/types/ApiData'

export const getBotProfile = (): Response<BotProfile> => {
  return request({
    url: '/getProfile/getBotProfile',
    method: 'post'
  })
}
