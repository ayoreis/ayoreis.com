'use strict'



const buttons = document.querySelectorAll('button.delete')

buttons.forEach( button => {
    button.addEventListener('click', event => {
        fetch(`/posts/${button.dataset.post}`, {
            method: 'delete'
        })

        .then( response => response.json())

        .then( response => location.href = response.redirect)

        .catch(console.error)
    })
})
