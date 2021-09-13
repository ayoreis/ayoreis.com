'use strict'



const buttons = document.querySelectorAll('button.delete')

buttons.forEach( button => {
    const uri = `/posts/${button.dataset.post}`

    button.addEventListener('click', event => {
        fetch(uri, {
            method: 'delete'
        })

        .then( response => response.json())

        .then( response => window.location.href = response.redirect)

        .catch(console.error)
    })
})
