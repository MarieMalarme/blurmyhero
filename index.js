const getRandomId = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min +1)) + min
}

const mixLetters = (word)=>{
    let string = '';
    word = word.split('');
    while (word.length > 0) {
      string +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return string
}

const createImage = image =>
	`<div id="image">
		<img src="${image}">
	</div>`

const createMixedName = name =>
	`<p> ${name} </p>`

// FONCTION POUR INJECTER LE GIF DE BRAVO QUAND ON A TROUVE LE NOM
const gifWinAppear = () =>
	`<div>
		<img id="gif-block" src="https://mm.aiircdn.com/20/5aabf482c65d6.gif">
	</div>`

// FONCTION POUR INJECTER LE GIF DE BRAVO QUAND ON A TROUVE LE NOM
const gifLoseAppear = () =>
	`<div>
		<img id="gif-block" src="hiijih.gif">
	</div>`
	

// FONCTION GLOBALE POUR LANCER LE JEU !!!!!!
const game = () => {



const gifBlock = document.getElementById("gif-block")
gifBlock.innerHTML = ''
document.getElementById("name-form").value = ''
fetch(`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json`)
	.then(response => response.json())
	.then(heroes => {
		const random = getRandomId(0, heroes.length)
		const hero = heroes[random].images.lg
		const images = document.getElementById("images")
		images.innerHTML = createImage(hero)

		const name = mixLetters(heroes[random].name)
		const nameBlock = document.getElementById("nameLetters")
		nameBlock.innerHTML = createMixedName(name)
		
		let btn = document.getElementById("name-button")
		btn.addEventListener("click", () => {
		let answerName = document.getElementById("name-form").value
		let correctAnswer = heroes[random].name
		console.log(correctAnswer)
		if (answerName == correctAnswer) {
			gifBlock.innerHTML = gifWinAppear()
			const image = document.getElementById("image")
			setTimeout(() => gifBlock.innerHTML = '', 3000)
			setTimeout(() => filterUnblur(image), 3000)
			setTimeout(() => game(), 6000)


			const filterUnblur = img => {
				image.style.filter = 'blur(0px) hue-rotate(0deg)'
				image.style.transition = '0.5s ease-in-out'
			}


		} else {
			gifBlock.innerHTML = gifLoseAppear()
			setTimeout(() => gifBlock.innerHTML = '', 3000)
		}
	
	})
})

const questionContainer = document.getElementById("questions")
questionContainer.innerHTML = ''

fetch('quiz.json')
	.then(response => response.json())
	.then(quiz => {


		// REPONSE A LA QUESTION
		const randomQuestions = getRandomId(0, quiz.length)
		const answer = quiz[randomQuestions].reponse
		// console.log(answer)
	
		

		// AFFICHER QUESTION + FORM REPONSE AU CLIC SUR INDICE
		let btnQuiz = document.getElementById("hint-button")
		btnQuiz.addEventListener("click", () => {
			const question = quiz[randomQuestions].question
			questionContainer.innerHTML = createQuestion(question)


			// BOUTON POUR REPONDRE À LA QUESTION
			let btnAnswer = document.getElementById("answer-button")
			btnAnswer.addEventListener("click", () => {
			let answer = document.getElementById("answer-form").value

			// CHECKER SI LA RÉPONSE EST BONNE OU MAUVAISE
			let correctAnswer = quiz[randomQuestions].reponse
			
			if (answer == correctAnswer) {
				image.style.filter = 'blur(0px) hue-rotate(0deg)'
				image.style.transition = '0.5s ease-in-out'
				questionContainer.style.display = 'none'
			} else { 
				questionContainer.innerHTML = createQuestion(question)
			}
		})
	})

const createQuestion = question => 
	`<div class="question"> ${question} </div>
	<div class="question-form">
		<input type="text" id="answer-form" class="fillForm" placeholder="Vrai ou faux ?">
		<input type="button" value="Envoie ma réponse" id="answer-button" class="btn">
	</div>`
})

}

game()

const skipButton = document.getElementById("skip-button")
skipButton.addEventListener("click", () => {
	game()
})



