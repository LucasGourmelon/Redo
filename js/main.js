const NB_ROWS = 5;
const NB_COL = 5;

const gameboard = createGameBoard(NB_ROWS,NB_COL);
const randomGameboard = createRandomGameBoard(NB_ROWS,NB_COL);

document.addEventListener('DOMContentLoaded',function(){
    displayGameBoard(gameboard,"game-board");
    displayGameBoard(randomGameboard,"game-boardRandom");

    document.getElementById('game-board').addEventListener('click',function(e){
        const clickedCell = e.target;
        switchState(clickedCell);
    })
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
    // let tables = document.getElementsByClassName('classGameBoard');
    let table = document.getElementById(id);

    // for(let i = 0 ; i < tables.length ; i++){
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
    // }
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
    if(!areSame())
    {
        let dialog = document.getElementById('falseModal');
        dialog.showModal();
    }else{
        let dialog = document.getElementById('ggModal');
        dialog.showModal();
    }
}

function reload(){
    let dialog = document.getElementById('falseModal');
    cleanBoard();
    dialog.close();
}

function areSame(){
    console.log(gameboard);
    console.log(randomGameboard);
    for(let i = 0 ; i < NB_ROWS ; i++){
        for(let j = 0 ; j < NB_COL ; j++){
            if(gameboard[i][j] != randomGameboard[i][j]){
                console.log('false');
                return false;
            }
        }
    }
    console.log('true');
    return true; 
}