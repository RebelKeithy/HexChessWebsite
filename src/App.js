// src/App.js
import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
      <div className="App">
        <Board
            gameId="a0f639b8-0616-4fdb-8ca7-ae161afff27c"
            playerId="1932f026-2241-447e-b4e9-f12df215d6e6"
        />
      </div>
  );
}

export default App;
