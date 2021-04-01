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
        place.forEach(cell => {
            ship.addPosition(cell);
            board[cell] = 's';
        });
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
        if (place.length > 0 && placeIsOccuped(place)) {
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

        for (let cell of place) {
            if (ships.some(s => s.hasPosition(cell))) {
                result = true;
                break;
            }
        };

        return result;
    };

    /**
     * Receive an array of ships, and places them
     * on the board randomly.
     */
    const placeShipsRandomly = (shipsArr) => {
        shipsArr.forEach(ship => {
            let place = [];
            while (place.length === 0) {
                const axis = Math.floor(Math.random() * 2) ? 'X' : 'Y';
                const cell = Math.floor(Math.random() * 100);
                place = getPlace(cell, axis, ship);
            }
            addShip(place, ship);
        });
    };

    const receiveAttack = (cell) => {
        if(board[cell] === false) {
            board[cell] = true;
        } else if(board[cell] === 's') {
            board[cell] = 'sh';
        }

        const ship = ships.find(ship => ship.hasPosition(cell));
        if (ship) ship.hit(cell);
    };

    const hasLost = () => {
        const result = ships.filter(ship => ship.isSunk());
        return (result.length === 5);
    };


    return {
        init,
        getBoard,
        getShips,
        getPlace,
        addShip,
        placeShipsRandomly,
        receiveAttack,
        hasLost,
    };
};

export default GameBoard;