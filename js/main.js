const NB_ROWS = 5;
const NB_COL = 5;
const ADD = 1;
const SUB = -1;

const gameboard = createGameBoard(NB_ROWS,NB_COL);
const randomGameboard = createRandomGameBoard(NB_ROWS,NB_COL);

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('points').innerHTML = "Score : " + getPoints();

    displayGameBoard(gameboard,"game-board");
    displayGameBoard(randomGameboard,"game-boardRandom");

    document.getElementById('game-board').addEventListener('click',function(e){
        const clickedCell = e.target;
        switchState(clickedCell);
    })
    
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            var dialog = document.getElementById('falseModal');
            if (!dialog.open) { // Vérifie si la boîte de dialogue n'est pas ouverte
                document.getElementById('submitButton').click();
            }
        }
    });
});

function createRandomGameBoard(nbRows,nbCol){
    const board = [];
    let cpt = 0;
    for(let i = 0; i < nbRows ; i++){
        const row = [];
        for(let j = 0; j < nbCol ; j++){
            let rand = Math.floor(Math.random() * 2);
            if(rand == 0){
                row.push(false);
            }else{
                row.push(true);
                cpt++;
            }
        }
        board.push(row);
    }

    if(cpt < 15 || cpt > 20){
        createRandomGameBoard(nbRows,nbCol);
    }

    return board;
}

function createGameBoard(nbRows,nbCol){
    const board = [];
    let cpt = 0;
    for(let i = 0; i < nbRows ; i++){
        const row = [];
        for(let j = 0; j < nbCol ; j++){
            row.push(false);
        }
        board.push(row);
    }

    return board;
}

function displayGameBoard(board,id) {
    let table = document.getElementById(id);

        for (let j = 0; j < board.length; j++) {
            const row = table.insertRow();
            for (let k = 0; k < board[j].length; k++) {
                const cell = row.insertCell();
                if(board[j][k] == true){
                    cell.classList.add('active');
                }else{
                    cell.classList.add('inactive');
                }
            }
        } 
}

function cleanBoard(){
    const cells = document.querySelectorAll("#game-board tbody td");
    cells.forEach(function(cell){
        if(cell.classList.contains('active')){
            cell.classList.add('inactive');
            cell.classList.remove('active'); 
        }
    });
}

function switchState(cell){
    const rowIndex = cell.parentNode.rowIndex;
    const colIndex = cell.cellIndex;

    if(cell.classList.contains('inactive')){
        gameboard[rowIndex][colIndex] = true;
        cell.classList.add('active');
        cell.classList.remove('inactive');
    }else{
        gameboard[rowIndex][colIndex] = false;
        cell.classList.add('inactive');
        cell.classList.remove('active'); 
    }
}

function verify(){
    setTimeout(function() {
        let dialog;
        if(!areSame()) {
            updatePoints(SUB);
            dialog = document.getElementById('falseModal');
            dialog.showModal();
        } else {
            updatePoints(ADD);
            dialog = document.getElementById('ggModal');
            dialog.showModal();
        }
    },  100); 
}

function reload(){
    var dialog = document.getElementById('falseModal');
    dialog.close();
    cleanBoard();
}

function areSame(){
    for(let i = 0 ; i < NB_ROWS ; i++){
        for(let j = 0 ; j < NB_COL ; j++){
            if(gameboard[i][j] != randomGameboard[i][j]){
                return false;
            }
        }
    }
    return true; 
}

function updatePoints(newPoints) {
    if((getPoints() + newPoints) >= 0){
        sessionStorage.setItem('points', getPoints() + newPoints);
    } 
    document.getElementById('points').innerHTML = "Score : " + getPoints();
}

function getPoints() {
    let points = sessionStorage.getItem('points');
    if(points == null){
        return 0;
    }
    return Number(points);
}