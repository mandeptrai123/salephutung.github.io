export default function handleErr(name = '', page = '', line = '') {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({name, page, line})
    }

    fetch('https://engcouple.com:8443/SalePhuTung/ErrosByClient', options)
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            console.log('save log')
        }
    })
}