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
		answerName == correctAnswer ? alert('bravo') : alert('dommage')
	})
})


fetch('quiz.json')
	.then(response => response.json())
	.then(quiz => {


		// REPONSE A LA QUESTION
		const randomQuestions = getRandomId(0, quiz.length)
		const answer = quiz[randomQuestions].reponse
		// console.log(answer)


		// RECUPERER UNE QUESTION RANDOM
		

		// BOUTON POUR ENVOYER VRAI OU FAUX
		

		// AFFICHER QUESTION + FORM REPONSE AU CLIC SUR INDICE
		let btnQuiz = document.getElementById("hint-button")
		btnQuiz.addEventListener("click", () => {
			// const showQuestionAndForm = () => {
			const question = quiz[randomQuestions].question
			const questionContainer = document.getElementById("questions")

			questionContainer.innerHTML = createQuestion(question)

			let btnAnswer = document.getElementById("answer-button")
			btnAnswer.addEventListener("click", () => {
			let answer = document.getElementById("answer-form").value

			let correctAnswer = quiz[randomQuestions].reponse
			// console.log(correctAnswer)
			const image = document.getElementById("image")
			console.log(image)
			if (answer == correctAnswer) {
				image.style.filter = 'blur(0px)'
			} else { 
				alert('dommage') 
			}
		})
	})

const createQuestion = question => 
	`<div class="question"> ${question} </div>
	<div class="question-form">
		<input type="text" id="answer-form">
		<input type="button" value="send" id="answer-button">
	</div>`
})





