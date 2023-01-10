const PHRASES = [
	'And I like to reinvent the wheel.',
	'& Bla bla bla ... foo bar baz',
]

const typewriter = document.querySelector('.typewriter')
const cursor = typewriter.querySelector('.typewriter__cursor')
const paper = typewriter.querySelector('.typewriter__paper')

let phraseIndex = 0
let letterIndex = 0

function typewrite() {
	if (letterIndex === PHRASES[phraseIndex].length) {
		letterIndex = 0

		if (phraseIndex === PHRASES.length - 1) {
			phraseIndex = 0
		} else {
			phraseIndex++
		}

		cursor.classList.add('typewriter__cursor--blinking')

		setTimeout(() => {
			paper.classList.add('typewriter__paper--selected')
			cursor.classList.remove('typewriter__cursor--blinking')
		}, 1500)

		setTimeout(() => {
			paper.innerHTML = ''
			paper.classList.remove('typewriter__paper--selected')
			typewrite()
		}, 2000)

		return
	}

	paper.innerHTML += PHRASES[phraseIndex][letterIndex]

	letterIndex++

	setTimeout(typewrite, 100)
}

setTimeout(typewrite)
