import { createBoardElements, createSquare } from './elementCreation';

function renderBoard(player){
    createBoardElements(player);
    for (let i = 0; i < player.board.size; i++) {
        for (let j = 0; j < player.board.size; j++) {
            createSquare(player, i, j);
        }   
    }
}

function renderShips(player){
    for (let ship of player.board.fleet){
        for (let coord of ship.coords){
            let [x, y] = coord;
            let square = document.getElementById(`${x}${y}${player.id}`)
            if (ship.length === 4){
                square.style.background = "#4ade80";
            }else if (ship.length === 3){
                square.style.background = "#22d3ee";
            }else if (ship.length === 2){
                square.style.background = "#facc15";
            }else if (ship.length === 1){
                square.style.background = "#e879f9";
            }
        }
    }
}

function renderHit(x, y , hitOrMiss, player){
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
                    square.style.background = "#4ade80";
                }else if (ship.length === 3){
                    square.style.background = "#22d3ee";
                }else if (ship.length === 2){
                    square.style.background = "#facc15";
                }else if (ship.length === 1){
                    square.style.background = "#e879f9";
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
    if (player.id === 1){
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