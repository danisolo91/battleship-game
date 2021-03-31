import GameBoard from '../factories/GameBoard';
import Ship from '../factories/Ship';

const ship1 = Ship('Carrier', 5);
const ship2 = Ship('Battleship', 4);
const ship3 = Ship('Cruiser', 3);
const ship32 = Ship('Cruiser', 3);
const ship4 = Ship('Submarine', 3);
const ship5 = Ship('Destroyer', 2);
const ships = [ship1, ship2, ship32, ship4, ship5];

const gameBoard = GameBoard();
const gameBoard2 = GameBoard();

describe('GameBoard factory tests', () => {
    test('init() populates the board with 100 false elements', () => {
        let mockBoard = [];
        for (let i = 0; i < 100; i++) {
            mockBoard.push(false);
        }
        gameBoard.init();
        expect(gameBoard.getBoard()).toStrictEqual(mockBoard);
    });

    test('getShips() initially returns an empty array', () => {
        expect(gameBoard.getShips()).toStrictEqual([]);
    });

    test('getShips() returns an array with a ship after running addShip()', () => {
        gameBoard.addShip([65, 66, 67], ship3)
        expect(gameBoard.getShips()).toStrictEqual([ship3]);
    });

    test('getPlace() returns empty array when places are already occuped', () => {
        expect(gameBoard.getPlace(63, 'X', ship3)).toStrictEqual([]);
    });

    test('getPlace() returns places when ship fits on X axis', () => {
        expect(gameBoard.getPlace(23, 'X', ship3)).toStrictEqual([23, 24, 25]);
    });

    test('getPlace() returns empty array when ship doesn\'t fit on X axis', () => {
        expect(gameBoard.getPlace(28, 'X', ship3)).toStrictEqual([]);
    });

    test('getPlace() returns places when ship fits on Y axis', () => {
        expect(gameBoard.getPlace(22, 'Y', ship3)).toStrictEqual([22, 32, 42]);
    });

    test('getPlace() returns empty array when ship desn\'t fit on Y axis', () => {
        expect(gameBoard.getPlace(82, 'Y', ship3)).toStrictEqual([]);
    });

    test('placeShipsRandomly() fills gameBoard.ships with ships', () => {
        gameBoard2.placeShipsRandomly(ships);
        expect(gameBoard2.getShips()).toStrictEqual(ships);
    });

    test('receiveAttack() updates hitted cell on "board" property', () => {
        gameBoard.receiveAttack(66);
        expect(gameBoard.getBoard()[66]).toBeTruthy();
    });

    test('receiveAttack() updates ship hitted cell on "ships" property', () => {
        let ship = gameBoard.getShips().find(s => s.hasPosition(66));
        let position = ship.getPositions().find(p => p.cell === 66);
        expect(position.isHit).toBeTruthy();
    });
});