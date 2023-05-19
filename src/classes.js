import { arrayInArray } from "./helperFunctions";

class Ship {
    constructor(length){
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
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
            valid = this.tryPlace(x, y, len, randDirection);
            if (valid){
                this.placeShip(x, y, len, randDirection);
                return [x, y, len, randDirection];
            }
        }
    }

    tryPlace(x, y, len, direction){
        let valid = false;
        if (direction === "up"){
            for (let i = 0; i < len; i++) {
                if (x - i < 0 || typeof this.board[x - i][y] === "object"){
                    return valid;
                }
                if (x + 1 < this.size && typeof this.board[x + 1][y] === "object"){
                    return valid;//checks under
                }
                /*if (x + 1 < this.size && y - 1 > 0 && this.board[x + 1][y - 1] === "object"){
                    return valid;//checks underLeft
                }
                if (x + 1 < this.size && y + 1 < this.size && this.board[x + 1][y + 1] === "object"){
                    return valid;//checks underRight
                }*/
                if (x - len > 0 && typeof this.board[x - len][y] === "object"){
                    return valid;//checks upper
                }
                /*if (x - len > 0 && y - 1 > 0 && typeof this.board[x - len][y - 1] === "object"){
                    return valid;//checks upperLeft
                }
                if (x - len > 0 && y + 1 < this.size && typeof this.board[x - len][y + 1] === "object"){
                    return valid;//checks upperRight
                }*/
                if (y - 1 > 0 && typeof this.board[x - i][y - 1] === "object"){
                    return valid;//checks left cells for ship len
                }
                if (y + 1 < this.size && typeof this.board[x - i][y + 1] === "object"){
                    return valid;//checks right cells for ship len
                }
            }   
            valid = true;
            return valid;
        }
        else if (direction === "right"){
            for (let i = 0; i < len; i++) {
                if (y + i >= this.size || typeof this.board[x][y + i] === "object"){
                    return valid;
                }
                if (y - 1 >= 0 && typeof this.board[x][y - 1] === "object"){
                    return valid;//checks left
                }
                /*if (y - 1 > 0 && x + 1 < this.size && typeof this.board[x + 1][y - 1]){
                    return valid;//checks leftBottom
                }
                if (y - 1 > 0 && x - 1 > 0 && typeof this.board[x - 1][y - 1]){
                    return valid;//checks leftTop
                }*/
                if (y + len < this.size && typeof this.board[x][y + len] === "object"){
                    return valid;//checks right
                }
                /*if (y + len < this.size && x - 1 > 0 && typeof this.board[x - 1][y + len]){
                    return valid;//checks rightTop
                }
                if (y + len < this.size && x + 1 < this.size && typeof this.board[x + 1][y + len]){
                    return valid;//checks rightBottom
                }*/
                if (x - 1 >= 0 && typeof this.board[x - 1][y + i] === "object"){
                    return valid;//checks upper cells for ship len
                }
                if (x + 1 < this.size && typeof this.board[x + 1][y + i] === "object"){
                    return valid;//checks under cells for ship len
                }
            }
            valid = true;
            return valid;
        }
    }

    placeShip(x, y, len, direction){
        let newShip = new Ship(len);
        if (direction === 'up'){
            for (let i = x; i > x - len; i--) {
                this.board[i][y] = newShip;
            }
        }
        else if (direction === "right"){
            for (let i = y; i < y + len; i++) {
                this.board[x][i] = newShip;
            }
        }
        this.fleet.push(newShip);
        return newShip;
    }

    receiveAttack(x, y){
        if (typeof this.board[x][y] === "object"){
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
    }

    boardInit(fleetToPlace){
        this.board.createBoard();
        for (let shipLen of fleetToPlace){
            this.board.makeCoordinates(shipLen);
        }
        return this.board.fleet;
    }

    makeShot(xC = undefined, yC = undefined){
        let x, y;
        let valid = false;
        if (this.name !== "Computer"){
            x = xC;
            y = yC;
            return [x, y];
        }
        
        while (!valid)
        if (this.name === "Computer"){
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
    let player = new Player("Tony", new Gameboard(10));
    player.boardInit([4,3,3,2,2,2,1,1,1,1]);
    let computer = new Player("Computer", new Gameboard(10));
    computer.boardInit([4,3,3,2,2,2,1,1,1,1]);
    return [player, computer]
}

let [player, computer] = initPlayers();

export {Ship, Gameboard, Player, player, computer};