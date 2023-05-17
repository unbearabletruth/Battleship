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
                /*if (x + 1 < this.size && typeof this.board[x + 1][y] === "object"){
                    return valid;
                }
                if (x - len > 0 && typeof this.board[x - len][y] === "object"){
                    return valid;
                }
                if (y - 1 > 0 && typeof this.board[x - i][y - 1] === "object"){
                    return valid;
                }
                if (y + 1 < this.size && typeof this.board[x - i][y + 1] === "object"){
                    return valid;
                }*/
            }   
            valid = true;
            return valid;
        }
        else if (direction === "right"){
            for (let i = 0; i < len; i++) {
                if (y + i >= this.size || typeof this.board[x][y + i] === "object"){
                    return valid;
                }
                /*if (y - 1 > 0 && typeof this.board[x][y - 1] === "object"){
                    return valid;
                }
                if (y + len < this.size && typeof this.board[x][y + len] === "object"){
                    return valid;
                }
                if (x - 1 > 0 && typeof this.board[x - 1][y + i] === "object"){
                    return valid;
                }
                if (x + 1 < this.size && typeof this.board[x + 1][y + i] === "object"){
                    return valid;
                }*/ 
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
        return this.board[x][y] = "hit";
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

    boardInit(){
        this.board.createBoard();
        this.board.makeCoordinates(4);
        this.board.makeCoordinates(3);
        this.board.makeCoordinates(3);
        this.board.makeCoordinates(2);
        this.board.makeCoordinates(2);
        this.board.makeCoordinates(2);
        this.board.makeCoordinates(1);
        this.board.makeCoordinates(1);
        this.board.makeCoordinates(1);
        this.board.makeCoordinates(1);
        return this.board.fleet;
    }

    makeShot(xC = undefined, yC = undefined){
        let x, y;
        if (this.name !== "Computer"){
            x = xC;
            y = yC;
            return [x, y];
        }
        let valid = false;
        while (!valid)
        if (this.name === "Computer"){
            x = Math.floor(Math.random() * this.board.size);
            y = Math.floor(Math.random() * this.board.size);
            if (!this.shots.includes([x, y])){
                this.shots.push([x, y])
                valid = true;
                return [x, y];
            }
        }
    }
}

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
        console.log(player.board.board);
        console.log(computer.board.board);
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

const player = new Player("Tony", new Gameboard(10));
player.boardInit();

const computer = new Player("Computer", new Gameboard(10));
computer.boardInit();

console.log(player.board.board);
console.log(computer.board.board);
//playGame();

export {Ship, Gameboard, Player};