import { renderHit, renderWin, renderShips } from "./renderer";
import { player, computer, Player, Gameboard } from "../classes";
import { sideBarHit } from "./renderer";
import { arrayInArray, checkAdjacent } from "../helperFunctions";
import { renderEnemyShipAfterSunk } from "./renderer";
import { initGame } from '..';

function playRound(x, y){
    let status = document.querySelector("#status");
    status.textContent = "Game is in progress";
    if (arrayInArray(player.shots, [x, y]) !== true){
        if (player.board.allSunk() !== true && computer.board.allSunk() !== true){
            playerMove(x, y);
            renderEnemyShipAfterSunk(computer);
            computerMove();  
        }
    }
    if (computer.board.allSunk() === true){
        renderWin(player);
        return;
    }
    else if (player.board.allSunk() === true){
        renderShips(computer);
        renderWin(computer);
        return;
    }   
}

function newGame(){
    player = new Player(1, `${player.name}`, new Gameboard(10));
    player.boardInit([4,3,3,2,2,2,1,1,1,1]);
    computer = new Player(2, `${computer.name}`, new Gameboard(10));
    computer.boardInit([4,3,3,2,2,2,1,1,1,1]);
    let status = document.querySelector("#status");
    let table = document.querySelector("#gameTable");
    status.classList.remove(status.classList.item(0));
    table.classList.remove(table.classList.item(0));
    let boards = document.querySelectorAll("#boardsWrapper");
    for (let board of boards){
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
    }
    initGame();
}

function clickToHit(){
    for (let i = 0; i < computer.board.size; i++) {
        for (let j = 0; j < computer.board.size; j++) {
            let square = document.getElementById(`${i}${j}${computer.id}`);
            square.addEventListener("click", () => {
                playRound(i, j);
            });
        }   
    }
}

function restartEvent(){
    let restart = document.querySelector("#restart");
    restart.addEventListener("click", () => {
        newGame();
    });
}

function playerMove(x, y){
    let hitOrMiss = computer.board.receiveAttack(x, y);
    player.shots.push([x, y]);
    renderHit(x, y, hitOrMiss, computer);
    sideBarHit(computer);
}

function computerMove(){
    let coords = computer.makeShot();
    let hitOrMiss = player.board.receiveAttack(coords[0], coords[1]);
    renderHit(coords[0], coords[1], hitOrMiss, player);
    sideBarHit(player);
    checkAdjacent(computer, hitOrMiss, coords[0], coords[1]);
}

export {playRound, clickToHit, restartEvent, newGame}