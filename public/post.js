'use strict'

const form = document.querySelector('form')

form.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)

    let json = {}

    formData.forEach((value, key) => {
        json[key] = value
    })

    fetch('/posts', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ...json,
            password: localStorage.getItem('password')
        })
    })

    .then(response => response.json())

    .then(json => location.href = json.redirect)

    .catch(console.error)
})
