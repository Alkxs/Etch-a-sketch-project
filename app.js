const container = document.getElementById('gridContainer');
const colorPicker = document.querySelector('#colorPicker');
const btnColor = document.querySelector('#color');
const btnRainbow = document.querySelector('#rainbow');
const btnClear = document.querySelector('#clear');
const btnEraser = document.querySelector('#eraser');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.querySelector('#sizeSlider');

let currentColor = 'black';
let currentMode = 'color';
let currentSize = 16;

function newCurrentColor(newColor) {
  currentColor = newColor;
}
function newCurrentMode(newMode) {
  currentMode = newMode;
}
function newCurrentSize(newSize) {
  currentSize = newSize;
}
colorPicker.onchange = (e) => newCurrentColor(e.target.value);
btnColor.onclick = () => newCurrentMode('color');
btnRainbow.onclick = () => newCurrentMode('rainbow');
btnClear.onclick = () => reloadGrid();
btnEraser.onmousemove = () => newCurrentMode('eraser');
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);

function changeSize(value) {
  newCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}
function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  container.innerHTML = '';
}

function setupGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (i = 0; i < size * size; i++) {
    const pixel = document.createElement('div');
    container.appendChild(pixel).classList.add('pixel');
    pixel.addEventListener('mouseover', changeColor);
  }
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe';
  }
}

function activateButton(newMode) {
  if (newMode === 'rainbow') {
    btnRainbow.classList.add('active');
  } else if (newMode === 'color') {
    btnColor.classList.add('active');
  } else if (newMode === 'eraser') {
    btnEraser.classList.add('active');
  }

  if (currentMode === 'rainbow') {
    btnRainbow.classList.remove('active');
  } else if (currentMode === 'color') {
    btnColor.classList.remove('active');
  } else if (currentMode === 'eraser') {
    btnEraser.classList.remove('active');
  }
}

window.onload = () => {
  setupGrid(50);
  activateButton('color');
};
