console.log('hello world')

let matrix = []
let counter = 0
let interval

function makeGrid() {
	interval = null
	const rows = document.getElementById('rows').value
	const columns = document.getElementById('columns').value

	if (rows == '' || rows == null || rows < 1) return alert('fill rows correctly')

	if (columns == '' || columns == null || columns < 1) return alert('fill columns correctly')

	const ele = document.getElementById('grid')

	ele.innerHTML = ''
	matrix = []

	for (let i = 0; i < rows; i++) {
		matrix.push([])
		for (let j = 0; j < columns; j++) {
			matrix[i].push(0)

			ele.innerHTML += `<div id="cell${i}|${j}" class="zero" style="width: 100%;" onclick="changeValue(${i}, ${j})"></div>`
		}
	}

	ele.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
}

function changeValue(i, j) {
	const ele = document.getElementById(`cell${i}|${j}`)

	if (ele) {
		eleClass = ele.classList[0]
		ele.classList.remove(eleClass)

		ele.classList.add(eleClass == 'zero' ? 'one' : 'zero')

		matrix[i][j] = eleClass == 'zero' ? 1 : 0
	}
}

function startIteration() {
	const iterations = document.getElementById('iterations').value

	if (iterations == '' || iterations == null || iterations < 1) return alert('Iterations should be greater then 0')

	updateCells()
	updateGrid()

	counter++

	if (counter < iterations) {
		interval = setInterval(() => {
			if (counter < iterations) {
				const ele = document.getElementById('counterSpan')
				if (ele) ele.innerText = `Counter: ${iterations - counter}`
				updateCells()
				updateGrid()
				counter++
			} else {
				interval = null
				const ele = document.getElementById('counterSpan')
				if (ele) ele.innerText = `Counter is not running`
			}
		}, 750)
	}
}

function updateCells() {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			let count = 0

			if (row - 1 > -1 && col - 1 > -1 && matrix[row - 1][col - 1] == 1) count += 1

			if (row - 1 > -1 && matrix[row - 1][col] == 1) count += 1

			if (row - 1 > -1 && col + 1 < matrix[0].length && matrix[row - 1][col + 1] == 1) count += 1

			if (row + 1 < matrix.length && col - 1 > -1 && matrix[row + 1][col - 1] == 1) count += 1

			if (row + 1 < matrix.length && matrix[row + 1][col] == 1) count += 1

			if (row + 1 < matrix.length && col + 1 < matrix[0].length && matrix[row + 1][col + 1] == 1) count += 1

			if (col - 1 > -1 && matrix[row][col - 1] == 1) count += 1

			if (col + 1 < matrix[0].length && matrix[row][col + 1] == 1) count += 1

			if (count == 2 || count == 3) matrix[row][col] = 1
			else matrix[row][col] = 0
		}
	}
}

function updateGrid() {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			const ele = document.getElementById(`cell${row}|${col}`)

			eleClass = ele.classList[0]
			ele.classList.remove(eleClass)

			ele.classList.add(matrix[row][col] == 1 ? 'one' : 'zero')
		}
	}
}
