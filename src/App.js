// src/App.js
import React, {useState} from 'react';
import './App.css';
import Board from './components/Board';
import {createGame, joinGame} from "./clients/gameClient";

// Hardcoded ids for testing
const player1id =  "6d7bf375-18aa-4a13-91b6-c18505397f3f" // Black
const player2Id = "1932f026-2241-447e-b4e9-f12df215d6e6" // White

const player1 = {
    id: player1id,
    color: 'black',
}
const player2 = {
    id: player2Id,
    color: 'white',
}
const player = player2

function App() {
    const [gameId, setGameId] = useState(null)
    const [playerId, setPlayerId] = useState(null)
    const [playerColor, setPlayerColor] = useState(null)

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

    return (
        <div className="App">
            <button onClick={createNewGame}>Create new game</button>
            <button onClick={submitJoinGame}>Join game</button>
            <Board
                gameId={gameId}
                playerId={playerId}
                playerColor={playerColor}
            />
        </div>
    );
}

export default App;
