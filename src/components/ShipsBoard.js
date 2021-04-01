import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import Ship from '../factories/Ship';
import Player from '../factories/Player';
import GameBoard from "../factories/GameBoard";

const ShipsBoard = () => {

    const [game, setGame] = useContext(GameContext);
    const board = game.boards[0];

    const shipsArr = [
        Ship('carrier', 5),
        Ship('battleship', 4),
        Ship('Cruiser', 3),
        Ship('Submarine', 3),
        Ship('Destroyer', 2),
    ];

    const placeShips = () => {
        board.placeShipsRandomly(shipsArr);
        setGame(prevState => {
            return {
                ...prevState,
                boards: [board],
            };
        });
    };

    // Create COMPUTER player and its board
    const startGame = () => {
        const computerPlayer = Player('Enemy');
        const computerBoard = GameBoard();
        computerBoard.init();
        computerBoard.placeShipsRandomly(shipsArr);
        setGame(prevState => {
            return {
                ...prevState,
                players: [prevState.players[0], computerPlayer],
                boards: [prevState.boards[0], computerBoard],
            };
        });
    };

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
            {game.boards[0].getShips().length === 0 ?
                <button onClick={placeShips}>Place ships</button> :
                <button onClick={startGame}>Start Game</button>
            }
        </div>
    );
};

export default ShipsBoard;