const GameBoard = () => {
    let board = [];
    let ships = [];

    /**
     * Populate board[] with 100 false elements.
     * A true element means it has been shooted by the enemy.
     */
    const init = () => {
        for (let i = 0; i < 100; i++) {
            board.push(false);
        }
    }

    const getBoard = () => {
        return board;
    };

    const getShips = () => {
        return ships;
    };

    const addShip = (place, ship) => {
        place.forEach(cell => ship.addPosition(cell));
        ships.push(ship);
    };

    /** 
     * Place is an array containing the cells occuped
     * by the ship. If the ship does not fit on that
     * cells, it returns an empty array
     */
    const getPlace = (cell, axis, ship) => {
        let place = [];

        if (axis === 'X') {
            place = getHorizontalCells(cell, ship);
        } else if (axis === 'Y') {
            place = getVerticalCells(cell, ship);
        }

        /** 
         * Check if there is a ship already occuping
         * any cell from place array
         */
        if(place.length > 0 && placeIsOccuped(place)) {
            place = [];
        }

        return place;
    };

    const getHorizontalCells = (cell, ship) => {
        let selectedRow = Math.floor(cell / 10);
        let placeRow = Math.floor((cell + ship.length - 1) / 10);
        let cells = [];

        /** 
         * If the ship fits in the selected row, populate
         * cells with the corresponding positions
         */
        if (placeRow === selectedRow) {
            for (let i = cell; i <= cell + ship.length - 1; i++) {
                cells.push(i);
            }
        }

        return cells;
    };

    const getVerticalCells = (cell, ship) => {
        let placeColumn = cell + (ship.length * 10) - 10;
        let cells = [];

        /** If the ship fits in the selected column, populate
         * cells with the corresponding positions
         */
        if (placeColumn < 100) {
            for (let i = cell; i <= placeColumn; i += 10) {
                cells.push(i);
            }
        }

        return cells;
    };

    const placeIsOccuped = (place) => {
        let result = false;

        for(let cell of place) {
            if(ships.some(s => s.hasPosition(cell))) {
                result = true;
                break;
            }
        };

        return result;
    };

    return {
        init,
        getBoard,
        getShips,
        getPlace,
        addShip,
    };
};

export default GameBoard;