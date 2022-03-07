export const getJobActuality = (creationDate) => {
  const diffInSeconds = Date.now() / 1000 - new Date(creationDate)

  const diffInHours = Math.round(diffInSeconds / (60 * 60))
  if (diffInHours <= 24) {
    return `${diffInHours} Stunde${diffInHours !== 1 ? 'n' : ''}`
  }

  const diffInDays = Math.round(diffInSeconds / (60 * 60 * 24))
  if (diffInDays < 7) {
    return `${diffInDays} Tag${diffInDays !== 1 ? 'en' : ''}`
  }

  const diffInWeeks = Math.round(diffInSeconds / (60 * 60 * 24 * 7))
  if (diffInWeeks < 4) {
    return `${diffInWeeks} Woche${diffInWeeks !== 1 ? 'n' : ''}`
  }

  const diffInMonths = Math.round(diffInSeconds / (60 * 60 * 24 * 30))
  return `${diffInMonths} Monat${diffInMonths !== 1 ? 'en' : ''}`
}
