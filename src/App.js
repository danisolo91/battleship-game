import { useContext } from "react";
import GameBoards from "./components/GameBoards";
import Nickname from "./components/Nickname"
import { GameContext } from "./contexts/GameContext";

const App = () => {

    const game = useContext(GameContext)[0];

    return (
        <>
            <h1>Battleship</h1>
            <div className="container">
                {game.players.length === 0 ?
                    <Nickname /> :
                    <GameBoards />
                }
            </div>
        </>
    );
};

export default App;