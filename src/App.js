// src/App.js
import React from 'react';
import './App.css';
import Board from './components/Board';

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
  return (
      <div className="App">
        <Board
            gameId="a0f639b8-0616-4fdb-8ca7-ae161afff27c"
            playerId={player.id}
            playerColor={player.color}
        />
      </div>
  );
}

export default App;
