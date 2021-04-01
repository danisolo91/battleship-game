import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const ComputerBoard = () => {

    const [game, setGame] = useContext(GameContext);

    // Player attack
    const shoot = (cell) => {
        const player = game.players[0];
        const c = player.shoot(cell);

        if (c != null) {
            const computerBoard = game.boards[1];
            computerBoard.receiveAttack(c);

            let turn = 1;
            let gameOver = false;

            if (computerBoard.hasLost()) {
                turn = 0;
                gameOver = true;
            }

            setGame(prevState => {
                return {
                    ...prevState,
                    gameOver: gameOver,
                    turn: turn,
                    players: [
                        player,
                        prevState.players[1],
                    ],
                    boards: [
                        prevState.boards[0],
                        computerBoard,
                    ],
                };
            });
        }
    };

    return (
        <div>
            <h2>{game.players[1].nickname}</h2>
            {(game.turn === 0 && game.gameOver === false) ?
                <div className="board has-turn active">
                    {game.boards[1].getBoard().map((cell, i) => {
                        let print;
                        if (cell === false) {
                            print = <div key={i} onClick={() => shoot(i)} className="cell normal"></div>
                        } else if (cell === true) {
                            print = <div key={i} className="cell water"></div>
                        } else if (cell === 's') {
                            print = <div key={i} onClick={() => shoot(i)} className="cell normal"></div>
                        } else if (cell === 'sh') {
                            print = <div key={i} className="cell hit"></div>
                        }
                        return print;
                    })}
                </div> :
                <div className="board">
                    {game.boards[1].getBoard().map((cell, i) => {
                        let print;
                        if (cell === false) {
                            print = <div key={i} className="cell"></div>
                        } else if (cell === true) {
                            print = <div key={i} className="cell water"></div>
                        } else if (cell === 's') {
                            print = <div key={i} className="cell"></div>
                        } else if (cell === 'sh') {
                            print = <div key={i} className="cell hit"></div>
                        }
                        return print;
                    })}
                </div>
            }
        </div>
    );
};

export default ComputerBoard;