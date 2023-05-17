import { Ship, Gameboard } from "../src/classes";

describe("Ship class tests:", () => {
    let ship;
    
    beforeEach(() => {
        ship = new Ship(3);
    });

    test("should be Ship object with length, timesHit, sunk", () => {
        expect(ship).toEqual({length: 3, timesHit: 0, sunk: false});
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
        board = new Gameboard(8);
        board.createBoard();
    });

    test("access coordinates", () => {
        for (let i = 0; i < board.size; i++) {
            for (let j = 0; j < board.size; j++) {
                expect(board.board[i][j]).not.toEqual(null);
            }
        }
    });

    test("makes coordinates", () => {
        const [x, y, len, direction] = board.makeCoordinates(3);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(board.size);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(board.size);
        expect(len).toBe(3);
        expect(["up", "right"]).toContain(direction);
    });

    test("tryPlace return boolean", () => {
        expect(typeof board.tryPlace(0, 2, 3, "up") === "boolean").toBeTruthy();
    });

    test("creates Ship object on a board", () => {
        expect(typeof board.placeShip(7, 0, 2, "up") === "object").toBeTruthy();
    });

    test("receives attack", () => {
        expect(board.receiveAttack(0, 0)).toBe("hit");
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
