import { renderHit } from "./renderer";
import { player, computer } from "../classes";
import { sideBarHit } from "./renderer";
import { arrayInArray } from "../helperFunctions";
import { renderAfterSunk } from "./renderer";

function playRound(x, y){
    let status = document.querySelector("#status");
    status.textContent = "Game is in progress";
    if (arrayInArray(player.shots, [x, y]) !== true){
        if (player.board.allSunk() !== true && computer.board.allSunk() !== true){
            playerMove(x, y);
            //renderAfterSunk(computer);
            computerMove();  
        }
    }
    if (player.board.allSunk() === true){
        status.textContent = "Computer wins!"
        return
    }
    else if (computer.board.allSunk() === true){
        status.textContent = "You win!"
        return
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
}

export {playRound}