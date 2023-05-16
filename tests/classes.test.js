import { Ship, Gameboard } from "../src/classes";

test("should be Ship object with length, timesHit, sunk", () => {
    const ship = new Ship(3);
    expect(ship).toEqual({length: 3, timesHit: 0, sunk: false});
  });

test("hits the ship", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.timesHit).toBe(1);
});

test("sunks the ship", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
})