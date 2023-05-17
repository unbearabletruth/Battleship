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
            return this.board[x][y].hit();
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
    constructor(board){
        this.board = board;
    }


}


const player = new Player(new Gameboard(10));
player.board.createBoard();
player.board.makeCoordinates(4);
player.board.makeCoordinates(3);
player.board.makeCoordinates(3);
player.board.makeCoordinates(2);
player.board.makeCoordinates(2);
player.board.makeCoordinates(2);
player.board.makeCoordinates(1);
player.board.makeCoordinates(1);
player.board.makeCoordinates(1);
player.board.makeCoordinates(1);
console.log(player.board.board);

const computer = new Player(new Gameboard(10));
computer.board.createBoard();
computer.board.makeCoordinates(4);
computer.board.makeCoordinates(3);
computer.board.makeCoordinates(3);
computer.board.makeCoordinates(2);
computer.board.makeCoordinates(2);
computer.board.makeCoordinates(2);
computer.board.makeCoordinates(1);
computer.board.makeCoordinates(1);
computer.board.makeCoordinates(1);
computer.board.makeCoordinates(1);
console.log(computer.board.board);



export {Ship, Gameboard};