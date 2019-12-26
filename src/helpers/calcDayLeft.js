function calcDayLeft(day, month) {
  const oneDay = 24 * 60 * 60 * 1000
  const now = new Date()
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  )
  let year
  let nextDate
  if (month > 0) {
    year =
      today.getFullYear() +
      (today.getMonth() + 1 > month ||
      (today.getMonth() + 1 === month && today.getDate() > day)
        ? 1
        : 0)
    nextDate = new Date(year, month - 1, day)
  } else {
    year =
      today.getFullYear() +
      (today.getMonth() === 11 && today.getDate() > day ? 1 : 0)
    nextDate = new Date(
      year,
      (today.getMonth() + (today.getDate() > day ? 1 : 0)) % 12,
      day,
    )
  }
  return Math.round(Math.abs((today - nextDate) / oneDay))
}

export default calcDayLeft
