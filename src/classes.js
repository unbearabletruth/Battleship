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
                this.board[i][j] = "not hit";
            }
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
        else if (direction === "down"){
            for (let i = x; i < x + len; i++) {
                this.board[i][y] = newShip;
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
board.placeShip(9, 0, 4, "up");
board.placeShip(1, 8, 3, "down");
board.placeShip(0, 1, 3, "right");
board.placeShip(4, 1, 2, "right");
board.placeShip(4, 6, 2, "right");
board.placeShip(8, 8, 2, "right");
board.placeShip(4, 4, 1, "up");
board.placeShip(9, 4, 1, "up");
board.placeShip(7, 5, 1, "up");
board.placeShip(0, 8, 1, "up");
board.receiveAttack(9, 0);
board.receiveAttack(8, 0);
board.receiveAttack(7, 0);
board.receiveAttack(6, 0);
console.log(board.board);


export {Ship, Gameboard};