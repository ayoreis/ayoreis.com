'use strict'



const buttons = document.querySelectorAll('button.delete')

buttons.forEach( button => {
    const post = `/posts/${button.dataset.post}`

    button.addEventListener('click', event => {
        fetch(post, {
            method: 'delete'
        })

        .then( response => response.json())

        .then( response => window.location.href = response.redirect)

        .catch(console.error)
    })
})
