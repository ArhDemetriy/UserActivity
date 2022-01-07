export function getHTMLDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export function getDateFromHTML(date: string) {
    const dateValues = date.trim().split('-').map(value => parseInt(value.trim()) || 0)
    const newDate = new Date()
    if (dateValues.length >= 3) {
        newDate.setFullYear(dateValues[0])
        newDate.setMonth(dateValues[1])
        newDate.setDate(dateValues[2])
    }
    return newDate
}
