import { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import GameBoard from '../factories/GameBoard';
import ComputerBoard from "./ComputerBoard";
import PlayerBoard from "./PlayerBoard";
import ShipsBoard from "./ShipsBoard";

const GameBoards = () => {

    const [game, setGame] = useContext(GameContext);

    useEffect(() => {
        if (game.boards.length === 0) {
            const board = GameBoard();
            board.init();
            setGame(prevState => {
                return {
                    ...prevState,
                    boards: [board],
                };
            });
        }

        // Computer attack
        if (game.turn === 1 && game.gameOver === false) {
            const computer = game.players[1];
            const cell = computer.shoot();

            if (cell != null) {
                const playerBoard = game.boards[0];
                playerBoard.receiveAttack(cell);

                let turn = 0;
                let gameOver = false;

                if (playerBoard.hasLost()) {
                    turn = 1;
                    gameOver = true;
                }

                setTimeout(() => {
                    setGame(prevState => {
                        return {
                            ...prevState,
                            gameOver: gameOver,
                            turn: turn,
                            players: [
                                prevState.players[0],
                                computer,
                            ],
                            boards: [
                                playerBoard,
                                prevState.boards[1],
                            ]
                        };
                    });
                }, 1000);
            }
        }
    });

    const restart = () => {
        const player = game.players[0];
        player.clearShotsHistory();
        setGame({
            gameOver: false,
            turn: 0,
            players: [player],
            boards: [],
        });
    }

    return (
        <>
            <div className="boards">
                {game.boards.length === 1 ?
                    <ShipsBoard /> :
                    game.boards.length === 2 &&
                    <>
                        <PlayerBoard />
                        <ComputerBoard />
                    </>
                }
            </div>
            {game.gameOver === true && 
                <>
                    <h3>Game Over</h3>
                    <p>{game.turn === 0 ? 'Congratulations, You have won!' : 'Computer wins'}</p>
                    <button onClick={restart}>Play again</button>
                </>
            }
        </>
    );
};

export default GameBoards;