import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
/**
 * 判断是否是今年
 */
const isThisYear = (date: dayjs.Dayjs) => {
  return date.year() == dayjs().year()
}

export const chatListTime = (time?: string | number | dayjs.Dayjs | Date | null) => {
  const date = dayjs(time)
  // 小于当天0点，显示时间
  if (date.isToday()) {
    return date.format('HH:mm')
  }
  // 小于昨天0点，显示昨天
  if (date.isYesterday()) {
    return '昨天'
  }
  // 小于一年，显示月日
  if (isThisYear(date)) {
    return date.format('M月D日')
  }
  // 大于一年，显示年月日
  return date.format(`YYYY年MM月DD日`)
}
