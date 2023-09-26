// src/components/ChessPiece.js
import React from 'react';

function ChessPiece({ type }) {
    return (
        <div className={`chess-piece ${type}`} />
    );
}

export default ChessPiece;
