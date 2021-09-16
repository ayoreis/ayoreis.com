const form = document.querySelector('form')
let password

form.querySelector('.password > input').addEventListener('input', event => {
    password = event.target.value
})

form.addEventListener('submit', event => {
    event.preventDefault()

    fetch('/authenticate', {
        method: 'post',
        body: password
    })

    .then(response => response.text())

    .then(boolean => {
        if (boolean === 'true') {
            localStorage.setItem('password', password)
            location.href = '/'
        } else {
            console.error("⚠️ Wrong password!")
        }
    })

    .catch(console.error)
})
