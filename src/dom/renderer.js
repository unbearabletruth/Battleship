import { Ship, player } from '../classes';

function renderBoard(player){
    console.log(player)
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.id = `${i}${j}${player.name}`
            board.appendChild(square);
        }   
    }
    const gameTable = document.querySelector("#gameTable");
    gameTable.appendChild(board);  
}

function renderShips(player){
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            if (player.board.board[i][j] instanceof Ship){
                let square = document.getElementById(`${i}${j}${player.name}`)
                if (player.board.board[i][j].length === 4){
                    square.style.background = "red";
                }else if (player.board.board[i][j].length === 3){
                    square.style.background = "green";
                }else if (player.board.board[i][j].length === 2){
                    square.style.background = "blue";
                }else if (player.board.board[i][j].length === 1){
                    square.style.background = "black";
                }
            }
        }  
    }
}




export {renderBoard, renderShips}