export default function NetWorking(url, options, timeout = 15000) {
    
      return  new Promise((resolve, reject) =>
        {
            fetch(url, options)
            .then(value => value.json())
            .then(value => resolve(value))
            setTimeout(() => reject(new Error('timeout')), timeout)
        })

}