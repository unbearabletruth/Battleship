import { Ship, Player, Gameboard } from '../classes';
import { player, computer } from '../classes';
import { initGame } from '..';
import { playRound } from './playGame';

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
    const sideFleet = renderSideBarFleet(player);
    const boardsWrapper = document.querySelector("#boardsWrapper");
    boardAndName.appendChild(playerName);
    boardAndName.appendChild(board);
    boardAndName.appendChild(sideFleet);
    boardsWrapper.appendChild(boardAndName);
}

function renderShips(player){
    for (let ship of player.board.fleet){
        for (let coord of ship.coords){
            let [x, y] = coord;
            let square = document.getElementById(`${x}${y}${player.name}`)
            if (ship.length === 4){
                square.style.background = "#86efac";
            }else if (ship.length === 3){
                square.style.background = "#67e8f9";
            }else if (ship.length === 2){
                square.style.background = "#d8b4fe";
            }else if (ship.length === 1){
                square.style.background = "#f9a8d4";
            }
        }
    }
}

function renderHit(x, y , hitOrMiss, player){
    let hitSquare = document.getElementById(`${x}${y}${player.name}`);
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

function renderEnemyShipAfterSunk(player){
    for (let ship of player.board.fleet){
        if (ship.sunk === true){
            for (let coord of ship.coords){
                let [x, y] = coord;
                let square = document.getElementById(`${x}${y}${player.name}`)
                if (ship.length === 4){
                    square.style.background = "#86efac";
                }else if (ship.length === 3){
                    square.style.background = "#67e8f9";
                }else if (ship.length === 2){
                    square.style.background = "#d8b4fe";
                }else if (ship.length === 1){
                    square.style.background = "#f9a8d4";
                }
            }
        }   
    }
}

function renderSideBarFleet(player){
    const fleet = document.createElement("div");
    fleet.id = "sideBar";
    for (let i = 0; i < player.board.fleet.length; i++){
        let sideShip = document.createElement("div");
        sideShip.classList.add("sideShip");
        sideShip.id = `${i}${player.name}`;
        fleet.appendChild(sideShip); 
        for (let j = 0; j < player.board.fleet[i].length; j++) {
            let shipCell = document.createElement("div");
            shipCell.classList.add("shipCell");
            sideShip.appendChild(shipCell);
        }  
    }
    return fleet;
}

function sideBarHit(player){
    let fleet = player.board.fleet;
    for (let i = 0; i < fleet.length; i++){
        if (fleet[i].sunk === true){
            let sideShip = document.getElementById(`${i}${player.name}`);
            sideShip.style.background = "#ef4444";
        }
    }
}

function renderWin(player){
    let status = document.querySelector("#status");
    let table = document.querySelector("#gameTable");
    if (player.name !== "Computer"){
        status.classList.add("playerWinsText");
        table.classList.add("playerWinsTable");
        status.textContent = "You win!";
    } else{
        status.textContent = "Computer wins!";
        status.classList.add("computerWinsText");
        table.classList.add("computerWinsTable"); 
    }
}

function newGame(){
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

function restartEvent(){
    let restart = document.querySelector("#restart");
    restart.addEventListener("click", () => {
        player = new Player("Tony", new Gameboard(10));
        player.boardInit([4,3,3,2,2,2,1,1,1,1]);
        computer = new Player("Computer", new Gameboard(10));
        computer.boardInit([4,3,3,2,2,2,1,1,1,1]);
        newGame();
    });
}

restartEvent();

export {renderBoard, renderShips, clickToHit, renderHit, sideBarHit, renderEnemyShipAfterSunk, renderWin}