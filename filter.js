const stuff = [...document.querySelectorAll('article.stuff')]
const buttons = [...document.querySelectorAll('nav.category > button')]
let category = 'all'
let filterdStuff = stuff

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        category = button.dataset.category

        if (category === 'all') {
            filterdStuff = stuff
        } else {
            filterdStuff = stuff.filter( i => i.dataset.category === category)
        }

        stuff.forEach( i => {
            i.classList.add('hidden')
        })

        filterdStuff.forEach( i => {
            i.classList.remove('hidden')
        })
    })
})
