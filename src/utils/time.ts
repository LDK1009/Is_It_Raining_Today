function getPreviousDate8Digits(previousDays: number) {
  const today = new Date()
  const previousDate = new Date(today)
  previousDate.setDate(previousDate.getDate() - previousDays)

  const year = previousDate.getFullYear()
  const month = String(previousDate.getMonth() + 1).padStart(2, '0')
  const day = String(previousDate.getDate()).padStart(2, '0')

  return `${year}${month}${day}`
}

function formatDate(date: Date, separator: string = '-'): string {

  if(!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}${separator}${month}${separator}${day}`
}

export { formatDate, getPreviousDate8Digits }

