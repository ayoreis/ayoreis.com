'use strict'


const buttons = document.querySelectorAll('button.delete')

buttons.forEach( button => {
    button.addEventListener('click', event => {
        fetch(`/posts/${button.dataset.post}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                password: localStorage.getItem('password')
            })
        })

        .then(response => response.json())

        .then(json => location.href = json.redirect)

        .catch(console.error)
    })
})
