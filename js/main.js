document.addEventListener('DOMContentLoaded',function(){
    const NB_ROWS = 5;
    const NB_COL = 5;
    
    const gameboard = createGameBoard(NB_ROWS,NB_COL);
    displayGameBoard(gameboard);

    /* document.getElementById('game-board').addEventListener('click',function(e){
        const clickedCell = e.target;
        handlerClickCell(clickedCell);
    }) */
});

function createGameBoard(nbRows,nbCol){
    const board = [];
    let cpt = 0;
    for(let i = 0; i < nbRows ; i++){
        const row = [];
        for(let j = 0; j < nbCol ; j++){
            let rand = Math.floor(Math.random() * 2);
            console.log(rand);
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
        createGameBoard(nbRows,nbCol);
    }

    return board;
}

function displayGameBoard(board) {
    const table = document.getElementById("game-board");
    for (let i = 0; i < board.length; i++) {
        const row = table.insertRow();
        for (let j = 0; j < board[i].length; j++) {
            const cell = row.insertCell();
            if(board[i][j] == true){
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

function handlerClickCell(cell){
    const rowIndex = cell.parentNode.rowIndex;
    const colIndex = cell.cellIndex;

    cleanBoard();
    switchState(cell);
}

function switchState(cell){
    if(cell.classList.contains('inactive')){
        cell.classList.add('active');
        cell.classList.remove('inactive');
    }else{
        cell.classList.add('inactive');
        cell.classList.remove('active'); 
    }
}