const screenVal = document.querySelector('.slider-value-text');
const slider = document.getElementById('range')
const sliderMin = slider.min;
const sliderMax = slider.max;
let sliderVal = slider.value;
slider.style.backgroundSize = (sliderVal - sliderMin) * 100 / (sliderMax - sliderMin) + '% 100%';

const BLANK_SQUARE_COLOR = '#d8d8d8';
const CLASSIC_COLOR = 'grey';
const VINTAGE_COLOR = '#367055';
const FREAKY_COLORS = ['#abb239', '#f0d046', '#ecba3f', '#e78933', '#e45f29'];
let getFreakyColor = () => FREAKY_COLORS[Math.floor(Math.random() * FREAKY_COLORS.length)];
let curColor = CLASSIC_COLOR;
let freakyColorMode = false;

function drawGrid(gridSize){
    let container = document.querySelector('.grid');
    container.innerHTML = '';

    for(let i=0; i < gridSize[0]; i++){
        let rowItem = document.createElement('div');
        rowItem.classList.add('grid-row');
        container.appendChild(rowItem);

        for(let i=0; i < gridSize[1]; i++){
            let gridItem = document.createElement('div');
            gridItem.classList.add('grid-square');
            rowItem.appendChild(gridItem);
        }
    }
}

function paint(square){
    curColor = freakyColorMode ? getFreakyColor() : curColor;
    square.style.backgroundColor = curColor
}

function clearGame(){
    const gameSquares = document.querySelectorAll('.grid-row > .grid-square');
    gameSquares.forEach((square) => square.style.backgroundColor = BLANK_SQUARE_COLOR);
}

function initListeners(){
    const gameSquares = document.querySelectorAll('.grid-row > .grid-square');
    const gameButtons = document.querySelectorAll('button');
    gameSquares.forEach((square) => square.addEventListener('mouseenter', (e) => paint(square)));
    gameButtons.forEach((button) => button.addEventListener('click', buttonHandler));
    slider.addEventListener('input', sliderHandler);
}

function sliderHandler(e){
        let val = e.target.value;
        let gridSize = [val,val]
        screenVal.textContent = `${val}x${val}`;
        slider.style.backgroundSize = (val - sliderMin) * 100 / (sliderMax - sliderMin) + '% 100%';

        startGame(gridSize)
}

function handleFreakyColor(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
}

function buttonHandler(e){
    console.log(e);
    let curBtn = e.target;
    let curClassList = curBtn.classList;

    if(!curBtn.classList.contains('clear-btn')){
        document.querySelector('button.selected') ? document.querySelector('button.selected').classList.toggle('selected') : false;
        curClassList.toggle('selected');
    }

    if(curClassList.contains('mode-classic-btn')){
        curColor = CLASSIC_COLOR
        freakyColorMode = false;
    }
    else if(curClassList.contains('mode-vintage-btn')){
        curColor = VINTAGE_COLOR
        freakyColorMode = false;
    }
    else if(curBtn.classList.contains('mode-freaky-btn')){
        freakyColorMode = true
    }
    else if(curBtn.classList.contains('clear-btn')){
        clearGame();
    }
}


function startGame(gridSize = [16,16]){
    drawGrid(gridSize);
    initListeners();
}

startGame();