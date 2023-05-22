import { renderHit, renderWin, renderShips } from "./renderer";
import { player, computer } from "../classes";
import { sideBarHit } from "./renderer";
import { arrayInArray, checkAdjacent } from "../helperFunctions";
import { renderEnemyShipAfterSunk } from "./renderer";

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

export {playRound}