import Ship from '../factories/Ship';

let ship = Ship('Carrier', 5);

describe('Ship factory tests', () => {
    test('create new Ship', () => {
        expect(ship).toMatchObject({ name: 'Carrier', length: 5 });
    });

    test('addPosition(2) expect hasPosition(2) to return true', () => {
        ship.addPosition(2);
        expect(ship.hasPosition(2)).toBeTruthy();
    });

    test('hasPosition(3) returns false for a non occupied cell', () => {
        expect(ship.hasPosition(3)).toBeFalsy();
    });

    test('isSunk() returns false if the ship is not sunk', () => {
        expect(ship.isSunk()).toBeFalsy();
    });

    test('isSunk() returns false if not all the position cells are hitted', () => {
        ship.addPosition(1); // add another position
        ship.hit(2); // position 2 is hit, but not the position 1
        expect(ship.isSunk()).toBeFalsy();
    });

    test('isSunk() returns true if all the positions are hitted', () => {
        ship.hit(1); // now position 1 is also hitted
        expect(ship.isSunk()).toBeTruthy();
    });
});