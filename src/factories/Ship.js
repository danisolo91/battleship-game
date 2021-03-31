const Ship = (name, length) => {

    /** Cells occupied by the ship on a GameBoard */
    let positions = [];

    const getPositions = () => {
        return positions;
    };

    const addPosition = (cell) => {
        positions.push({
            cell: cell,
            isHit: false,
        });
    };

    /** Check if the ship occupies a given cell */
    const hasPosition = (cell) => {
        return positions.some(c => c.cell === cell);
    }

    /** 
     * Change isHit to true if the Ship receives a hit
     * on a occupied cell
     */
    const hit = (cell) => {
        positions.forEach(p => {
            if (p.cell === cell) p.isHit = true;
            return p
        });
    }

    /** Check if the ship is sunk */
    const isSunk = () => {
        let result = true;
        for (let p of positions) {
            if (p.isHit === false) {
                result = false;
                break;
            }
        }
        return result;
    };

    return {
        name,
        length,
        getPositions,
        addPosition,
        hasPosition,
        hit,
        isSunk,
    };
};

export default Ship;