const gameModes = document.querySelectorAll('.difficult');

let view = [];
let viewEngine = [];
let positionBomb = [];
let gameOver = false;
let firstMove = true;
let updated = [];

let rows;
let columns;
let bombsNumber;

gameModes[0].addEventListener('click', () => {
    rows = 9;
    columns = 9
    bombsNumber = 10;
    for (let i = 0; i < rows; i++) {
        let tempColumn = [];
        let tempView = [];
        for (let j = 0; j < columns; j++) {
            tempColumn.push(0);
            tempView.push('?');
        }
        view.push(tempView);
        viewEngine.push(tempColumn);
    }
    hiddenButtons();
    createBoard();
    boxTouchEvents();
});


function hiddenButtons() {
    const buttons = document.querySelector('#gameModes');
    buttons.style.display = 'none';
}

function createBoard() {
    let div = document.createElement('div');
    div.className = 'board'
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            let column = document.createElement('td');
            column.className = 'container';
            let button = document.createElement('button');
            button.className = 'box'
            column.appendChild(button);
            row.appendChild(column);
        }
        table.appendChild(row);
    }
    div.appendChild(table);
    document.body.appendChild(div);
}

function boxTouchEvents() {
    const boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', () => {
            if (firstMove) {
                firstMove = false;
                createBombs(calculateMove(i), bombsNumber, rows, columns);
            }
            console.log(view);
            openBox(calculateMove(i),boxes);
        })
    }
}

function calculateMove(number) {
    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (count === number) {
                return [i, j];
            }
            count++;
        }
    }
}


function createBombs(playerMove, bombsNumber, rows, columns) {
    positionBomb.push(playerMove);
    for (let i = 0; i < bombsNumber; i++) {
        let bomb = numeroRandom(positionBomb, rows, columns);
        viewEngine[bomb[0]][bomb[1]] = -1;
        for (let i = 0; i < 3; i++) {
            for (let j = -1; j <= 1; j++) {
                if (viewEngine[bomb[0] + j] && viewEngine[bomb[0] + j][bomb[1] - 1 + i] > -1) {
                    viewEngine[bomb[0] + j][bomb[1] - 1 + i] += 1;
                }
            }
        }
    }
}

function numeroRandom(positionBomb, rows, columns) {
    let pairNumber = [];
    pairNumber.push(Math.floor(Math.random() * rows))
    pairNumber.push(Math.floor(Math.random() * columns))
    if (!positionBomb.some(pair => pair[0] === pairNumber[0] && pair[1] === pairNumber[1])) {
        positionBomb.push(pairNumber);
        return pairNumber;
    } else {
        if (positionBomb.length < (rows * columns)) {
            return numeroRandom(positionBomb, rows, columns);
        } else {
            return false;
        }
    }
}

function openBox(move, boxes) {
    console.log(move[0]);
    console.log(view[move[0]]);
    console.log(view[move[0] + 1]);
    if (view[move[0]][move[1]] != '?') {
        return;
    }
    view[move[0]][move[1]] = viewEngine[move[0]][move[1]];
    if (viewEngine[move[0]][move[1]] == 0) {
        for (let i = 0; i < 3; i++) {
            for (let j = -1; j <= 1; j++) {
                if (viewEngine[move[0] + j] && viewEngine[move[0] + j][move[1] - 1 + i] > -1 && !(move[0] + j == move[0] && move[1] - 1 + i == move[1])) {
                    console.log("Esto se manda:" + [move[0] + j, move[1] - 1 + i] );
                    console.log("Esto tiene view: " + view[move[0] + j][move[1] - 1 + i]);
                    openBox([move[0] + j, move[1] - 1 + i], boxes);
                }
            }
        }
    } else if (viewEngine[move[0]][move[1]] == -1) {
        console.log('¡¡¡GG!!!');
        gameOver = true;
    }
    updateHtml(boxes);
}

function updateHtml(boxes) {
    const containers = document.querySelectorAll('.container');
    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (view[i][j] !== '?' && !(updated.includes(count))) {
                boxes[count].style.display = 'none';
                let div = document.createElement('div');
                let text = document.createElement('p');
                switch (view[i][j]) {
                    case -1:
                        
                        break;
                    case 1:
                        text.textContent = '1';
                        text.className = 'one';
                        div.appendChild(text);
                        break;
                    case 2:
                        text.textContent = '2';
                        text.className = 'two';
                        div.appendChild(text);
                        break;
                    case 3:
                        text.textContent = '3';
                        text.className = 'three';
                        div.appendChild(text);
                        break;
                    case 4:
                        text.textContent = '4';
                        text.className = 'four';
                        div.appendChild(text);
                        break;
                    case 5:
                        text.textContent = '1';
                        text.className = 'five';
                        div.appendChild(text);
                        break;
                    case 6:
                        text.textContent = '1';
                        text.className = 'six';
                        div.appendChild(text);
                        break;
                    case 7:
                        text.textContent = '7';
                        text.className = 'seven';
                        div.appendChild(text);
                        break;
                    case 8:
                        text.textContent = '8';
                        text.className = 'eight';
                        div.appendChild(text);
                        break;
                }
                containers[count].appendChild(div);
                updated.push(count);
            }
            count ++;
        }
    }
}

