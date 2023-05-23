import { Ship, computer } from "./classes";

function arrayInArray(array, item){
    let strItem = JSON.stringify(item);
    let contains = (el) => JSON.stringify(el) === strItem;
    return array.some(contains);
}

function tryPlace(x, y, len, direction){
    let valid = false;
    if (direction === "up"){
        for (let i = 0; i < len; i++) {
            if (x - i < 0 || this.board[x - i][y] instanceof Ship){
                return valid;
            }
            if (x - len >= 0 && this.board[x - len][y] instanceof Ship){
                return valid;//checks upper
            }
            if (y + 1 < this.size && this.board[x - i][y + 1] instanceof Ship){
                return valid;//checks right cells for ship len
            }
            if (x + 1 < this.size && this.board[x + 1][y] instanceof Ship){
                return valid;//checks under
            }
            if (y - 1 >= 0 && this.board[x - i][y - 1] instanceof Ship){
                return valid;//checks left cells for ship len
            }
            if (x - len >= 0 && y - 1 >= 0 && this.board[x - len][y - 1] instanceof Ship){
                return valid;//checks upperLeft
            }
            if (x - len >= 0 && y + 1 < this.size && this.board[x - len][y + 1] instanceof Ship){
                return valid;//checks upperRight
            }
            if (x + 1 < this.size && y + 1 < this.size && this.board[x + 1][y + 1] instanceof Ship){
                return valid;//checks underRight
            }  
            if (x + 1 < this.size && y - 1 >= 0 && this.board[x + 1][y - 1] instanceof Ship){
                return valid;//checks underLeft
            }
        }   
        valid = true;
        return valid;
    }
    else if (direction === "right"){
        for (let i = 0; i < len; i++) {
            if (y + i >= this.size || this.board[x][y + i] instanceof Ship){
                return valid;
            }
            if (y - 1 >= 0 && this.board[x][y - 1] instanceof Ship){
                return valid;//checks left
            }
            if (x - 1 >= 0 && this.board[x - 1][y + i] instanceof Ship){
                return valid;//checks upper cells for ship len
            }
            if (y + len < this.size && this.board[x][y + len] instanceof Ship){
                return valid;//checks right
            }
            if (x + 1 < this.size && this.board[x + 1][y + i] instanceof Ship){
                return valid;//checks under cells for ship len
            }
            if (y - 1 >= 0 && x + 1 < this.size && this.board[x + 1][y - 1] instanceof Ship){
                return valid;//checks leftBottom
            }
            if (y - 1 >= 0 && x - 1 >= 0 && this.board[x - 1][y - 1] instanceof Ship){
                return valid;//checks leftTop
            }
            if (y + len < this.size && x - 1 >= 0 && this.board[x - 1][y + len] instanceof Ship){
                return valid;//checks rightTop
            }
            if (y + len < this.size && x + 1 < this.size && this.board[x + 1][y + len] instanceof Ship){
                return valid;//checks rightBottom
            }
        }
        valid = true;
        return valid;
    }
}

//alternative tryPlace for practice
function testtryPlace(x, y, len, direction){
    let valid = false;
    let moves = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
    let coords = [];
    for (let i = 0; i < len; i++) {
        if (direction === "up" && x - i >= 0){
            let coord = [x - i, y];
            coords.push(coord);
        }else if (direction === "right" && y + i < this.size){
            let coord = [x, y + i];
            coords.push(coord);
        }else {
            return valid;
        }
    }
    for (let coord of coords){
        let [x, y] = coord;
        if (this.board[x][y] instanceof Ship){
            return valid;
        }
        for (let move of moves){
            let [dx, dy] = move;
            if (x + dx >= 0 && y + dy >= 0 && x + dx < this.size && y + dy < this.size &&
                this.board[x + dx][y + dy] instanceof Ship){
                    return valid;
            } 
        }
    }
    valid = true;
    return valid;
}

function checkAdjacent(computer, hitOrMiss, x, y){
    let moves = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    if (hitOrMiss instanceof Ship && hitOrMiss.sunk !== true){
        for (let move of moves){
            let [dx, dy] = move;
            let nextMove = [x + dx, y + dy];
            if(x + dx >= 0 && y + dy >= 0 && x + dx < computer.board.size && y + dy < computer.board.size){
                computer.q.push(nextMove);
            }   
        }
    }
    else if (hitOrMiss.sunk === true){
        addAdjacentToShots(hitOrMiss, computer);
        computer.q = [];
    }
}

function addAdjacentToShots(ship, computer){
    let moves = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
    for (let coord of ship.coords){
        let [x, y] = coord;
        for (let move of moves){
            let [dx, dy] = move;
            if (x + dx >= 0 && y + dy >= 0 && x + dx < computer.board.size && y + dy < computer.board.size &&
                arrayInArray(computer.shots, [x + dx, y + dy]) !== true){
                    let coordToShots = [x + dx, y + dy];
                    computer.shots.push(coordToShots);
            } 
        }
    }
}

export {arrayInArray, tryPlace, checkAdjacent}

