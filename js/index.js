const gameModes = document.querySelectorAll('.difficult');

let view = [];
let viewEngine = [];
let positionBomb = [];
let gameOver = false;
let firstMove = true;

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
                console.log(view);

            }
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
    if (view[move[0]][move[1]] != '?') {
        return;
    }
    view[move[0]][move[1]] = viewEngine[move[0]][move[1]];
    if (viewEngine[move[0]][move[1]] == 0) {
        for (let i = 0; i < 3; i++) {
            for (let j = -1; j <= 1; j++) {
                if (viewEngine[move[0] + j] && viewEngine[move[0] + j][move[1] - 1 + i] > -1 && !(move[0] + j == move[0] && move[1] - 1 + i == move[1])) {
                    openBox(view, viewEngine, [[move[0] + j, move[1] - 1 + i]]);
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
    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (view[i][j] !== '?') {
                boxes[count].style.display = none;
                switch (view[i][j]) {
                    case -1:
                    
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        break;
                }
            }
        }
    }
}

