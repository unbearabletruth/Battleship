import { Ship, Gameboard } from "../src/classes";

test("should be Ship object with 3 length", () => {
    const ship = new Ship(3);
    expect(ship).toEqual({length: 3, timesHit: 0, sunk: false});
  })

test("coordinate should be Ship object", () => {
    const board = new Gameboard(10);
    board.createBoard();
    expect(board.placeShip(9, 0, 4, "up")).toEqual({length: 4, timesHit: 0, sunk: false});
})