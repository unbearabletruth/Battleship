import { renderHit } from "./renderer";
import { player, computer } from "../classes";

function playRound(x, y){
    if (player.board.allSunk() !== true && computer.board.allSunk() !== true){
        let hitOrMiss = computer.board.receiveAttack(x, y);
        renderHit(x, y, hitOrMiss, computer);
        let coords = computer.makeShot();
        hitOrMiss = player.board.receiveAttack(coords[0], coords[1]);
        renderHit(coords[0], coords[1], hitOrMiss, player);
    }
    let status = document.getElementById("status");
    if (player.board.allSunk() === true){
        status.textContent = "Computer wins!"
        return
    }
    else if (computer.board.allSunk() === true){
        status.textContent = "You win!"
        return
    }
}

export {playRound}