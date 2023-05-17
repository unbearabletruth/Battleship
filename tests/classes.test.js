import { Ship, Gameboard, Player } from "../src/classes";

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
        expect(board.tryPlace(0, 2, 3, "up")).toBe(false);
        expect(board.tryPlace(7, 0, 2, "up")).toBe(false);
    });

    test("placing in proper space returns true", () => {
        board.placeShip(7, 0, 2, "up")
        expect(board.tryPlace(7, 1, 2, "up")).toBe(true);
    });

    test("creates Ship object on a board", () => {
        expect(board.placeShip(7, 0, 2, "up")).toBeInstanceOf(Ship);
    });

    test("Ship obj receives hit", () => {
        board.placeShip(7, 0, 2, "up");
        expect(board.receiveAttack(7, 0).timesHit).toBe(1);
    });

    test("receives missed attack", () => {
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

describe("Player class tests:", () => {
    
    test("places all ships", () => {
        const player = new Player("Gamer", new Gameboard(10));
        expect(player.boardInit([4,3,2,1]))
        .toEqual([{length: 4, timesHit: 0, sunk: false},
                 {length: 3, timesHit: 0, sunk: false},
                 {length: 2, timesHit: 0, sunk: false},
                 {length: 1, timesHit: 0, sunk: false}]);
    });

    test("places Ship object", () => {
        const player = new Player("Gamer", new Gameboard(10));
        expect(player.boardInit([4,3,2,1])[3]).toBeInstanceOf(Ship);
    });

    test("makeShot returns computer coordinates to hit", () => {
        const player = new Player("Gamer", new Gameboard(10));
        expect(player.makeShot(4, 4)).toEqual([4, 4]);
    });

    test("makeShot returns player's coords to hit", () => {
        const computer = new Player("Computer", new Gameboard(10));
        const [x, y] = computer.makeShot();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(computer.board.size);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(computer.board.size);
    });

    test("properly writes shots to array", () => {
        const computer = new Player("Computer", new Gameboard(10));
        for (let i = 0; i < 15; i++) {
            computer.makeShot();  
        }
        expect(computer.shots.length).toBe(15);
    });
});
