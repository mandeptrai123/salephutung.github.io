//DD/MM/YYYY
export default function formatDate(date) {
    const _d = new Date(date)
    const checkDate =
        _d.getDate().toString().length < 2
            ? `0${_d.getDate()}`
            : `${_d.getDate()}`

    const checkMonth =
        (_d.getMonth() + 1).toString().length < 2
            ? `0${_d.getMonth() + 1}`
            : `${_d.getMonth() + 1}`

    const strDate = `${checkDate}/${checkMonth}/${_d.getFullYear()}`
    return strDate
}
