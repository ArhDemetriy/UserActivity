export function getHTMLDate(date: Date) {
    if (!date?.getFullYear) { return '' }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

/** возвращает null прр ошибках */
export function getDateFromHTML(date: string) {
    if (!date?.split) { return null }
    const dateValues = date.trim().split('-').map(value => parseInt(value))
    if (dateValues.length < 3 || !dateValues.every(value => Number.isFinite(value) && value >= 0)) { return null }

    const newDate = new Date(0)
    newDate.setFullYear(dateValues[0], dateValues[1] - 1, dateValues[2])

    return newDate
}
