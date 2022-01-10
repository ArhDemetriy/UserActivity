export function getHTMLDate(date: Date) {
    if (!date?.getFullYear) { return '' }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export function getDateFromHTML(date: string) {
    if (!date?.split) { return new Date() }
    const dateValues = date.trim().split('-').map(value => parseInt(value) || 0)
    const newDate = new Date()
    if (dateValues.length) {
        newDate.setFullYear(dateValues[0], dateValues[1], dateValues[2])
    }
    return newDate
}
