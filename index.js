const getRandomId = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min +1)) + min
}

const createImage = image =>
	`<div class="image">
		<img src="${image}">
	</div>`

const image = (id) => {
	fetch(`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json`)
		.then(response => response.json())
		.then(heroes => {
			const random = getRandomId(0, heroes.length)
			const hero = heroes[random].images.lg
			const images = document.getElementById("images")
			images.innerHTML = createImage(hero)
		})
	}

image()
