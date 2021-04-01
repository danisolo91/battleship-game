const Player = (nickname) => {
    let shotsHistory = [];

    /**
     * Registers on shotsHistory the cell position
     * of the enemy's board when the player shoots
     */
    const shoot = (cell = null) => {
        let result = cell;

        /** 
         * If the function is called without a cell position
         * means that is Computer's turn, so run a randomShoot
         */
        if (result === null) result = randomShot();

        if (isValidShot(result)) {
            shotsHistory.push(result);
        } else {
            result = null;
        }

        return result;
    };

    // For computer player only
    const randomShot = () => {
        let cell = Math.floor(Math.random() * 100);
        while (!isValidShot(cell)) cell = Math.floor(Math.random() * 100);
        return cell;
    };

    const isValidShot = (cell) => {
        return (!shotsHistory.includes(cell) && cell >= 0 && cell < 100);
    };

    const clearShotsHistory = () => shotsHistory = [];

    return { nickname, clearShotsHistory, shoot };
};

export default Player;