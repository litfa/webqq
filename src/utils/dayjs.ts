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

type Time = string | number | dayjs.Dayjs | Date | null | undefined

export const chatListTime = (time?: Time) => {
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

export const messageTime = (time1?: Time, time2?: Time) => {
  const date1 = dayjs(time1)
  const date2 = dayjs(time2)

  console.log(date1.valueOf(), date2.valueOf(), date2.valueOf() - date1.valueOf())

  // 大于一分钟显示
  if (date2.valueOf() - date1.valueOf() < 1000 * 60) {
    return
  }
  if (date2.isToday()) {
    return date2.format('HH:mm:ss')
  }
  if (isThisYear(date2)) {
    return date2.format('MM-DD HH:mm:ss')
  }
  return date2.format('YYYY-MM-DD HH:mm:ss')
}
