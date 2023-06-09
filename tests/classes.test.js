import { Ship, Gameboard, Player } from "../src/classes";
import { tryPlace } from "../src/helperFunctions";

describe("Ship class tests:", () => {
    let ship;
    
    beforeEach(() => {
        ship = new Ship(3);
    });

    test("should be Ship object with length, timesHit, sunk, coords", () => {
        expect(ship.length).not.toBe(undefined);
        expect(ship.timesHit).not.toBe(undefined);
        expect(ship.sunk).not.toBe(undefined);
        expect(ship.coords).not.toBe(undefined);
    });

    test("hits the ship", () => {
        ship.hit();
        expect(ship.timesHit).toBe(1);
    });

    test("sunks the ship", () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.sunk).toBe(true);
    });
});

describe("Gameboard class tests:", () => {
    let board;

    beforeEach(() => {
        board = new Gameboard(10);
        board.createBoard();
    });

    test("coordinates accessible", () => {
        for (let i = 0; i < board.size; i++) {
            for (let j = 0; j < board.size; j++) {
                expect(board.board[i][j]).not.toEqual(undefined);
            }
        }
    });

    test("coordinates for ship placement", () => {
        const [x, y, len, direction] = board.makeCoordinates(3);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(board.size);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(board.size);
        expect(len).toBe(3);
        expect(["up", "right"]).toContain(direction);
    });

    test("placing out of bounds or on other Ship returns false", () => {
        board.placeShip(7, 0, 2, "up")
        expect(tryPlace.call(board, 0, 2, 3, "up")).toBe(false);
        expect(tryPlace.call(board, 7, 0, 2, "up")).toBe(false);
    });

    test("placing adjecent returns false", () => {
        board.placeShip(4, 2, 3, "up")
        expect(tryPlace.call(board, 5, 3, 4, "up")).toBe(false);//right
        expect(tryPlace.call(board, 1, 2, 2, "right")).toBe(false);//top
        expect(tryPlace.call(board, 6, 2, 2, "up")).toBe(false);//bottom
        expect(tryPlace.call(board, 5, 1, 4, "up")).toBe(false);//left
    });

    test("placing adjecent (diagonal) returns false", () => {
        board.placeShip(7, 5, 3, "right")
        expect(tryPlace.call(board, 8, 3, 2, "right")).toBe(false);//leftBottom
        expect(tryPlace.call(board, 6, 3, 2, "right")).toBe(false);//leftTop
        expect(tryPlace.call(board, 6, 8, 2, "up")).toBe(false);//rightTop
        expect(tryPlace.call(board, 9, 8, 2, "up")).toBe(false);//rightBottom
    });

    test("placing in proper space returns true", () => {
        board.placeShip(7, 0, 2, "up")
        expect(tryPlace.call(board, 7, 2, 2, "up")).toBe(true);
    });

    test("creates Ship object on a board", () => {
        expect(board.placeShip(7, 0, 2, "up")).toBeInstanceOf(Ship);
    });

    test("Ship obj receives hit", () => {
        board.placeShip(7, 0, 2, "up");
        expect(board.receiveAttack(7, 0).timesHit).toBe(1);
    });

    test("receives missed attack", () => {
        expect(board.receiveAttack(0, 0)).toBe("miss");
    });

    test("not all ships sunk", () => {
        board.placeShip(7, 0, 2, "up");
        expect(board.allSunk()).toBe(false);
    });

    test("all should be sunk", () => {
        board.placeShip(7, 0, 2, "up");
        board.receiveAttack(7, 0);
        board.receiveAttack(6, 0);
        expect(board.allSunk()).toBe(true);
    })
});

describe("Player class tests:", () => {
    
    test("places all ships", () => {
        const player = new Player(1, "Gamer", new Gameboard(10));
        expect(player.boardInit([4,3,2,1]).length).toBe(4);
    });

    test("places Ship object", () => {
        const player = new Player(1, "Gamer", new Gameboard(10));
        expect(player.boardInit([4,3,2,1])[3]).toBeInstanceOf(Ship);
    });

    test("makeShot returns player's coords to hit", () => {
        const computer = new Player(2, "Computer", new Gameboard(10));
        const [x, y] = computer.makeShot();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(computer.board.size);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(computer.board.size);
    });

    test("properly writes shots to array", () => {
        const computer = new Player(2, "Computer", new Gameboard(10));
        for (let i = 0; i < 15; i++) {
            computer.makeShot();  
        }
        expect(computer.shots.length).toBe(15);
    });
});
