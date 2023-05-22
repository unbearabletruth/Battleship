import { arrayInArray, tryPlace } from "./helperFunctions";

class Ship {
    constructor(length){
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
        this.coords = [];
    }

    hit(){
        this.timesHit += 1;
        this.isSunk();
    }

    isSunk(){
        if (this.length === this.timesHit){
            this.sunk = true;
        }
    }
}

class Gameboard {
    constructor(size){
        this.size = size;
        this.board = [];
        this.fleet = [];
    }

    createBoard(){
        for (let i = 0; i < this.size; i++) {
            let row = [];
            this.board.push(row);
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = "";
            }
        }
        return this.board;
    }

    makeCoordinates(len){
        let valid = false;
        while(!valid){
            const direction = ["up", "right"];
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            const randDirection = direction[Math.floor(Math.random() * direction.length)];
            valid = tryPlace.call(this, x, y, len, randDirection);
            if (valid){
                this.placeShip(x, y, len, randDirection);
                return [x, y, len, randDirection];
            }
        }
    }

    placeShip(x, y, len, direction){
        let newShip = new Ship(len);
        if (direction === 'up'){
            for (let i = x; i > x - len; i--) {
                this.board[i][y] = newShip;
                newShip.coords.push([i, y])
            }
        }
        else if (direction === "right"){
            for (let i = y; i < y + len; i++) {
                this.board[x][i] = newShip;
                newShip.coords.push([x, i])
            }
        }
        this.fleet.push(newShip);
        return newShip;
    }

    receiveAttack(x, y){
        if (this.board[x][y] instanceof Ship){
            this.board[x][y].hit();
            return this.board[x][y];
        }
        return this.board[x][y] = "miss";
    }

    allSunk(){
        for (let ship of this.fleet){
            if (ship.sunk === false){
                return false;
            }
        }
        return true;
    }
}

class Player {
    constructor(name, board){
        this.name = name;
        this.board = board;
        this.shots = [];
        this.q = [];
    }

    boardInit(fleetToPlace){
        this.board.createBoard();
        for (let shipLen of fleetToPlace){
            this.board.makeCoordinates(shipLen);
        }
        return this.board.fleet;
    }

    makeShot(x = undefined, y = undefined){
        let valid = false;
        if (this.q.length !== 0){
            while (!valid){
                let [x, y] = this.q[0];
                this.q.shift();
                if (arrayInArray(this.shots, [x, y]) !== true){
                    this.shots.push([x, y])
                    valid = true;
                    return [x, y];
                }
            }
        } 
        while(!valid){
            x = Math.floor(Math.random() * this.board.size);
            y = Math.floor(Math.random() * this.board.size);
            if (arrayInArray(this.shots, [x, y]) !== true){
                this.shots.push([x, y])
                valid = true;
                return [x, y];
            }
        }      
    }
}

function initPlayers(){
    let player = new Player("Player", new Gameboard(10));
    player.boardInit([4,3,3,2,2,2,1,1,1,1]);
    let computer = new Player("Computer", new Gameboard(10));
    computer.boardInit([4,3,3,2,2,2,1,1,1,1]);
    return [player, computer]
}

let [player, computer] = initPlayers();

export {Ship, Gameboard, Player, player, computer};