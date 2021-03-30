const Player = (name) => {
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
        if (result === null) result = randomShoot();

        if (shotsHistory.includes(result) ||
            result < 1 ||
            result > 100) {
            result = null;
        } else {
            shotsHistory.push(cell);
        }

        return result;
    };

    // For computer player only
    const randomShoot = () => {
        return Math.random() * (100 - 1) + 1;
    };

    return { name, shoot };
};

export default Player;