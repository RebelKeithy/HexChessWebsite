// src/App.js
import React, {useState} from 'react';
import './App.css';
import Board from './components/Board';
import {createGame, joinGame} from "./clients/gameClient";

function App() {
    const [gameId, setGameId] = useState(null)
    const [playerId, setPlayerId] = useState(null)
    const [playerColor, setPlayerColor] = useState(null)
    const [count, setCount] = useState(0);

    function createNewGame() {
        const response = createGame().then((response) => {
            setGameId(response.gameId)
            setPlayerId(response.playerId)
            setPlayerColor(response.playerColor.toLowerCase())
        })
    }

    function submitJoinGame() {
        const gameId = prompt("Enter game id")
        if (gameId) {
            joinGame(gameId).then((response) => {
                setGameId(response.gameId)
                setPlayerId(response.playerId)
                setPlayerColor(response.playerColor.toLowerCase())
            })
        }
    }

    function refresh() {
        setCount(count + 1)
    }

    return (
        <div className="App">
            {!gameId && <h1>Free Play</h1>}
            {gameId && <h1>Game Id: {gameId}</h1>}
            <button onClick={createNewGame}>Create new game</button>
            <button onClick={submitJoinGame}>Join game</button>
            <button onClick={refresh}>Refresh</button>
            <Board
                gameId={gameId}
                playerId={playerId}
                playerColor={playerColor}
                count={count}
            />
        </div>
    );
}

export default App;
