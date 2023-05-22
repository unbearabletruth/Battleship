import { createBoardElements } from './rendererHelper';

function renderBoard(player){
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.id = `${i}${j}${player.id}`
            square.style.background = "white";
            board.appendChild(square);
        }   
    }
    createBoardElements(player, board);
}

function renderShips(player){
    for (let ship of player.board.fleet){
        for (let coord of ship.coords){
            let [x, y] = coord;
            let square = document.getElementById(`${x}${y}${player.id}`)
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
    console.log(player.name)
    let hitSquare = document.getElementById(`${x}${y}${player.id}`);
    if (hitOrMiss === "miss"){
        hitSquare.textContent = "\u2022";
    } else {
        hitSquare.classList.add("hit");
    }
}

function renderEnemyShipAfterSunk(player){
    for (let ship of player.board.fleet){
        if (ship.sunk === true){
            for (let coord of ship.coords){
                let [x, y] = coord;
                let square = document.getElementById(`${x}${y}${player.id}`)
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
        sideShip.id = `${i}${player.id}`;
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
            let sideShip = document.getElementById(`${i}${player.id}`);
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
        status.textContent = `${player.name} wins!`;
    } else{
        status.textContent = `${player.name} wins!`;
        status.classList.add("computerWinsText");
        table.classList.add("computerWinsTable"); 
    }
}

export {renderBoard, renderShips, renderHit, sideBarHit, 
    renderEnemyShipAfterSunk, renderWin, renderSideBarFleet}