import { Ship, computer, Player } from '../classes';
import { playRound } from './playGame';

function renderBoard(player){
    console.log(player)
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.id = `${i}${j}${player.name}`
            square.dataset.id = `${i}${j}`
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
                    square.style.background = "yellow";
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

function renderHit(x, y , hitOrMiss, player){
    let hitSquare = document.getElementById(`${x}${y}${player.name}`);
    if (hitOrMiss === "hit"){
        hitSquare.style.background = "red";
    } else {
        hitSquare.style.background = "orange";
    }
}

function clickToHit(){
    for (let i = 0; i < computer.board.size; i++) {
        for (let j = 0; j < computer.board.size; j++) {
            let square = document.getElementById(`${i}${j}${computer.name}`);
            square.addEventListener("click", () => {
                playRound(i, j);
            });
        }   
    }
}


export {renderBoard, renderShips, clickToHit, renderHit}