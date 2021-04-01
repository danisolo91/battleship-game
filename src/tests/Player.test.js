import Player from '../factories/Player';

let player = Player('Daniel');

describe('Player factory tests', () => {
    test('create a new Player', () => {
        expect(player).toEqual({
            nickname: 'Daniel',
            shoot: expect.any(Function),
            clearShotsHistory: expect.any(Function),
        });
    });

    test('shoot empty cell, returns cell', () => {
        expect(player.shoot(22)).toBe(22);
    });

    test('shoot on already shooted cell, returns null', () => {
        expect(player.shoot(22)).toBeNull();
    });

    test('call shoot without cell, returns random cell', () => {
        expect(player.shoot()).toBeGreaterThanOrEqual(1);
        expect(player.shoot()).toBeLessThanOrEqual(100);
    });

    test('shoot an out of range cell, return null', () => {
        expect(player.shoot(101)).toBeNull();
    });
});