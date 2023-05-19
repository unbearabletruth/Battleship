import { Ship, computer, Player } from '../classes';
import { playRound } from './playGame';
import hitIcon from '../../assets/onTarget.svg';

function renderBoard(player){
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.id = `${i}${j}${player.name}`
            square.style.background = "white";
            board.appendChild(square);
        }   
    }
    createBoardElements(player, board);
}

function createBoardElements(player, board){
    const playerName = document.createElement("p");
    playerName.id = "playerName";
    playerName.textContent = player.name;
    const boardAndName = document.createElement("div");
    boardAndName.id = "boardAndName";
    const boardsWrapper = document.querySelector("#boardsWrapper");
    boardAndName.appendChild(playerName);
    boardAndName.appendChild(board);
    boardsWrapper.appendChild(boardAndName);
}

function renderShips(player){
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            if (player.board.board[i][j] instanceof Ship){
                let square = document.getElementById(`${i}${j}${player.name}`)
                if (player.board.board[i][j].length === 4){
                    square.style.background = "#86efac";
                }else if (player.board.board[i][j].length === 3){
                    square.style.background = "#67e8f9";
                }else if (player.board.board[i][j].length === 2){
                    square.style.background = "#d8b4fe";
                }else if (player.board.board[i][j].length === 1){
                    square.style.background = "#f9a8d4";
                }
            }
        }  
    }
}

function renderHit(x, y , hitOrMiss, player){
    let hitSquare = document.getElementById(`${x}${y}${player.name}`);
    console.log(hitSquare, hitOrMiss)
    if (hitOrMiss === "miss"){
        hitSquare.textContent = "\u2022";
    } else {
        hitSquare.classList.add("hit");
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