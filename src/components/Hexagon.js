// src/components/Hexagon.js
import React from 'react';
import {Coordinate} from "../helpers/Coords";
function Hexagon({ piece, color, onClick, isSelected, isPossible, row, col }) {
    var coords = Coordinate.fromCartesian(row, col)
    if (coords.row !== row || coords.col !== col) {
        console.log("Error")
    }
    return (
        <div className={`hexagon ${color} ${isSelected ? 'hexagon-selected' : ''} ${isPossible ? 'hexagon-possible' : ''}`} onClick={onClick} title={`(${coords.u}, ${coords.v}, ${coords.d})\n(${coords.row}, ${coords.col})`}>
            {piece && <div className={`chess-piece chess-${piece}-${color}`} />}
        </div>
    );
}

export default Hexagon;
