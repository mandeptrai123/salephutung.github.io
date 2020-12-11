export default function NetWorking(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((value) => value.json())
            .then((value) => resolve(value))
        setTimeout(() => reject(new Error('timeout')), 15000)
    })
}
