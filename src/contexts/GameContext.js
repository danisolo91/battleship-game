import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [game, setGame] = useState({
        gameOver: false,
        turn: 0, // position in players array (0: human, 1: computer)
        players : [],
        boards: [],
    });

    return (
        <GameContext.Provider value={[game, setGame]}>
            {props.children}
        </GameContext.Provider>
    );
};