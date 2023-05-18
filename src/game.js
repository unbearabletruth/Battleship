import { player, computer } from "./classes";

function playGame(){
    let turn = "player";
    while (player.board.allSunk() !== true && computer.board.allSunk() !== true){
        console.log(computer.board.allSunk())
        if (turn === "player"){
            let coord = player.makeShot();
            computer.board.receiveAttack(coord[0], coord[1]);
        }
        else if (turn === "computer"){
            let coords = computer.makeShot();
            player.board.receiveAttack(coords[0], coords[1]);
        }
        if (turn === "player"){
            turn = "computer";
        }
        else {turn = "player"}
    }
    if (player.board.allSunk() === true){
        console.log("Computer wins!");
        return
    }
    else if (computer.board.allSunk() === true){
        console.log("Player wins!");
        return
    }
}

//playGame();