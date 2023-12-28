import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export const formatDateToYYYYMMDD = (dateString: string) => {
  const date = new Date(`${dateString}z`)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const timeAgo = (dateString: string) => {
  TimeAgo.addDefaultLocale(en)
  const date = new Date(`${dateString}z`)
  const timeAgo = new TimeAgo('en-US')
  const result = timeAgo.format(date)
  return result
}