import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export const formatDateToYYYYMMDD = (dateString: string, separator: string = '-', isDateUtc = true) => {
  const date = new Date(`${dateString}${isDateUtc ? 'Z' : ''}`)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}${separator}${month}${separator}${day}`
}

export const formatDateToMMMDDYYYY = (dateString: string, isDateUtc = true) => {
  const date = new Date(`${dateString}${isDateUtc ? 'Z' : ''}`)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const timeAgo = (dateString: string) => {
  TimeAgo.addLocale(en)
  const date = new Date(`${dateString}Z`)
  const timeAgo = new TimeAgo('en-US')
  const result = timeAgo.format(date)
  return result
}