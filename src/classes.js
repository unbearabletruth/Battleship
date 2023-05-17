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
    }

    createBoard(){
        for (let i = 0; i < this.size; i++) {
            let row = [];
            this.board.push(row);
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = "";
            }
        }
    }

    makeCoordinates(len){
        let placed = false;
        let valid;
        while(!placed){
            const direction = ["up", "right"];
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            const randDirection = direction[Math.floor(Math.random() * direction.length)];
            valid = this.tryPlace(x, y, len, randDirection);
            if (valid){
                this.placeShip(x, y, len, randDirection);
                placed = true;
            }
        }
    }

    tryPlace(x, y, len, direction){
        let valid = false;
        if (direction === "up"){
            for (let i = 0; i < len; i++) {
                console.log(x, y)
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
    }

    receiveAttack(x, y){
        if (typeof this.board[x][y] === "object"){
            return this.board[x][y].hit();
        }
        this.board[x][y] = "hit";
    }

    allSunk(){
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === true){
                    return false;
                }
            }   
        }
        return true;
    }
}


const board = new Gameboard(10);
board.createBoard();
board.makeCoordinates(4);
board.makeCoordinates(3);
board.makeCoordinates(3);
board.makeCoordinates(2);
board.makeCoordinates(2);
board.makeCoordinates(2);
board.makeCoordinates(1);
board.makeCoordinates(1);
board.makeCoordinates(1);
board.makeCoordinates(1);
/*board.receiveAttack(9, 0);
board.receiveAttack(8, 0);
board.receiveAttack(7, 0);
board.receiveAttack(6, 0);*/
console.log(board.board);


export {Ship, Gameboard};