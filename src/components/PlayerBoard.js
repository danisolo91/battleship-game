import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const PlayerBoard = () => {

    const game = useContext(GameContext)[0];

    return (
        <div>
            <h2>{game.players[0].nickname}</h2>
            <div className="board">
                {game.boards[0].getBoard().map((cell, i) => {
                    let print;
                    if (cell === false) {
                        print = <div key={i} className="cell"></div>
                    } else if (cell === true) {
                        print = <div key={i} className="cell water"></div>
                    } else if (cell === 's') {
                        print = <div key={i} className="cell ship"></div>
                    } else if (cell === 'sh') {
                        print = <div key={i} className="cell hit"></div>
                    }
                    return print;
                })}
            </div>
        </div>
    );
};

export default PlayerBoard;