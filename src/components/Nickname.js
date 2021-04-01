import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import Player from '../factories/Player';

const Nickname = () => {

    const setGame = useContext(GameContext)[1];
    const [player, setPlayer] = useState(Player(""));

    const changeNickname = (e) => {
        setPlayer(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    }

    const submitPlayer = (e) => {
        e.preventDefault();
        setGame(prevState => {
            return {
                ...prevState,
                players: [player],
            };
        });
    };

    return (
        <>
            <form onSubmit={submitPlayer}>
                <input type="text" name="nickname" placeholder="Enter your nickname..."
                    value={player.nickname} maxLength="15" minLength="2" required
                    onChange={changeNickname} />
                <button type="submit">Next</button>
            </form>
        </>
    );
};

export default Nickname;