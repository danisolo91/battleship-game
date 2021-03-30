import GameBoard from '../factories/GameBoard';
import Ship from '../factories/Ship';

let gameBoard = GameBoard();
let ship = Ship('Cruiser', 3);

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
        gameBoard.addShip([65, 66, 67], ship)
        expect(gameBoard.getShips()).toStrictEqual([{
            length: 3,
            name: 'Cruiser',
            addPosition: expect.any(Function),
            hasPosition: expect.any(Function),
            hit: expect.any(Function),
            isSunk: expect.any(Function),
        }]);
    });

    test('getPlace() returns empty array when places are already occuped', () => {
        expect(gameBoard.getPlace(63, 'X', ship)).toStrictEqual([]);
    });

    test('getPlace() returns places when ship fits on X axis', () => {
        expect(gameBoard.getPlace(23, 'X', ship)).toStrictEqual([23, 24, 25]);
    });

    test('getPlace() returns empty array when ship doesn\'t fit on X axis', () => {
        expect(gameBoard.getPlace(28, 'X', ship)).toStrictEqual([]);
    });

    test('getPlace() returns places when ship fits on Y axis', () => {
        expect(gameBoard.getPlace(22, 'Y', ship)).toStrictEqual([22, 32, 42]);
    });

    test('getPlace() returns empty array when ship desn\'t fit on Y axis', () => {
        expect(gameBoard.getPlace(82, 'Y', ship)).toStrictEqual([]);
    });
});