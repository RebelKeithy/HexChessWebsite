// src/App.js
import React from 'react';
import './App.css';
import Board from './components/Board';
import {getTestGameState} from "./clients/gameClient";

function App() {
  return (
      <div className="App">
        <button onClick={getTestGameState}>Get Game State</button>
        <Board />
      </div>
  );
}

export default App;
