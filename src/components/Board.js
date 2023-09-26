// src/components/Board.js
import React, {useEffect, useState} from 'react';
import Hexagon from './Hexagon';
import {possibleMoves} from "../helpers/PossibleMoves";
import {Coordinate} from "../helpers/Coords";
import {getGameState, move} from "../clients/gameClient";

function generatePattern(n) {
    let pattern = [];

    // Ascending part of the pattern
    for (let i = 1; i <= n; i++) {
        pattern.push(i);
    }

    // Middle repeating part of the pattern
    for (let i = 0; i < (n-1) * 2; i++) {
        pattern.push(n - (i % 2 === 0 ? 1 : 0));
    }

    // Descending part of the pattern
    for (let i = n - 1; i >= 1; i--) {
        pattern.push(i);
    }

    return pattern;
}

function getInitialPiece(rowIndex, colIndex) {
    const pieces = {
        '0,0': { piece: 'bishop', color: 'black' },
        '1,0': { piece: 'king', color: 'black' },
        '1,1': { piece: 'queen', color: 'black' },
        '2,0': { piece: 'knight', color: 'black' },
        '2,1': { piece: 'bishop', color: 'black' },
        '2,2': { piece: 'knight', color: 'black' },
        '3,0': { piece: 'rook', color: 'black' },
        '3,3': { piece: 'rook', color: 'black' },
        '4,0': { piece: 'pawn', color: 'black' },
        '4,2': { piece: 'bishop', color: 'black' },
        '4,4': { piece: 'pawn', color: 'black' },
        '5,1': { piece: 'pawn', color: 'black' },
        '5,4': { piece: 'pawn', color: 'black' },
        '6,1': { piece: 'pawn', color: 'black' },
        '6,3': { piece: 'pawn', color: 'black' },
        '7,2': { piece: 'pawn', color: 'black' },
        '7,3': { piece: 'pawn', color: 'black' },
        '8,2': { piece: 'pawn', color: 'black' },
        '12,2': { piece: 'pawn', color: 'white' },
        '13,2': { piece: 'pawn', color: 'white' },
        '13,3': { piece: 'pawn', color: 'white' },
        '14,1': { piece: 'pawn', color: 'white' },
        '14,3': { piece: 'pawn', color: 'white' },
        '15,1': { piece: 'pawn', color: 'white' },
        '15,4': { piece: 'pawn', color: 'white' },
        '16,0': { piece: 'pawn', color: 'white' },
        '16,2': { piece: 'bishop', color: 'white' },
        '16,4': { piece: 'pawn', color: 'white' },
        '17,0': { piece: 'rook', color: 'white' },
        '17,3': { piece: 'rook', color: 'white' },
        '18,0': { piece: 'knight', color: 'white' },
        '18,1': { piece: 'bishop', color: 'white' },
        '18,2': { piece: 'knight', color: 'white' },
        '19,0': { piece: 'king', color: 'white' },
        '19,1': { piece: 'queen', color: 'white' },
        '20,0': { piece: 'bishop', color: 'white' },
    };

    return pieces[`${rowIndex},${colIndex}`] || { piece: null, color: null };
}

/**
 * Convert the character, P = 'pawn', R = 'rook', N = 'knight', B = 'bishop', Q = 'queen', K = 'king'
 * Lower case pieces are black, upper case pieces are white
 * @param piece
 */
function deserializePiece(piece) {
    const pieceType = ({
        'P': 'pawn',
        'R': 'rook',
        'N': 'knight',
        'B': 'bishop',
        'Q': 'queen',
        'K': 'king'
    })[piece.toUpperCase()] || null;
    return {
        piece: pieceType,
        color: piece === ' ' ? null : piece === piece.toLowerCase() ? 'black' : 'white'
    }
}

function generateInitialState() {
    const pattern = generatePattern(6);
    return pattern.map((rowSize, rowIndex) => Array(rowSize).fill(null).map((_, colIndex) => getInitialPiece(rowIndex, colIndex)));
}

function isPossible(moves, row, col) {
    return moves.some(move => move.row === row && move.col === col)
}

function Board({gameId, playerId, playerColor}) {
    const [boardState, setBoardState] = useState(generateInitialState());
    const [selectedHexagon, setSelectedHexagon] = useState(null);
    const [updateCount, setUpdateCount] = useState(0);
    const [highlighted, setHighlighted] = useState([]);

    useEffect(() => {
        getGameState(gameId, playerId).then(
            (result) => {
                const rowLengths = generatePattern(6)
                var rowIndex = 0
                const board = []
                var row = []
                // For each character in board string, set the piece and color
                result.board.split('').forEach((piece, index) => {
                    row.push(deserializePiece(piece))
                    if (row.length === rowLengths[rowIndex]) {
                        board.push(row)
                        row = []
                        rowIndex++
                    }
                })
                setBoardState(board)
                if (result.moves.length === 0) {
                    setHighlighted([])
                } else {
                    const move = result.moves.slice(-1)[0]
                    const moveArray = move.substring(1, move.length - 1).split(',').map(Number)
                    const from = Coordinate.fromCartesian(moveArray[0], moveArray[1])
                    const to = Coordinate.fromCartesian(moveArray[2], moveArray[3])
                    setHighlighted([from, to])
                }
            }
        )
    }, [updateCount, gameId, playerId]);

    var moves = []
    if (selectedHexagon) {
        moves = possibleMoves(boardState, selectedHexagon)
        console.log("Possible Moves:")
        console.log(moves)
    }

    const handleClick = (row, col) => {
        var coords = Coordinate.fromCartesian(row, col)
        if (selectedHexagon && isPossible(moves, row, col)) {
            var from = Coordinate.fromCartesian(selectedHexagon.row, selectedHexagon.col)
            if (boardState[selectedHexagon.row][selectedHexagon.col].piece === 'pawn' && (coords.u === 10 || coords.d === 0)) {
                boardState[row][col] = {piece: 'queen', color: 'white'}
            } else {
                boardState[row][col] = boardState[selectedHexagon.row][selectedHexagon.col]
            }
            boardState[selectedHexagon.row][selectedHexagon.col] = {piece: null, color: null}
            move(gameId, playerId, from, coords).then(
                (result) => {
                    console.log(result)
                    setUpdateCount(updateCount + 1)
                }
            )
            setHighlighted([from, coords])
            setSelectedHexagon(null)
        }
        else if (selectedHexagon && selectedHexagon.row === row && selectedHexagon.col === col) {
            setSelectedHexagon(null)
        }
        else if (boardState[row][col].color === "white" || true) {
            setSelectedHexagon(coords);
        }
    }

    let isFlipped = playerColor === 'black';

    return (
        <div className="grid-container">
            {boardState.map((_, rowIndex) => {
                // If flipped, adjust the row index, otherwise use as is
                let adjustedRowIndex = isFlipped ? boardState.length - 1 - rowIndex : rowIndex;

                return (
                    <div className={`hex-row hex-row-${rowIndex}`} key={rowIndex}>
                        {boardState[adjustedRowIndex].map((_, colIndex) => {
                            // If flipped, adjust the column index, otherwise use as is
                            let adjustedColIndex = isFlipped ? boardState[adjustedRowIndex].length - 1 - colIndex : colIndex;
                            let hexagon = boardState[adjustedRowIndex][adjustedColIndex];
                            const isSelected = selectedHexagon?.row === adjustedRowIndex && selectedHexagon?.col === adjustedColIndex;
                            const isHighlighted = highlighted.some(coord => coord.row === adjustedRowIndex && coord.col === adjustedColIndex)
                            const possible = isPossible(moves, adjustedRowIndex, adjustedColIndex)
                            return (
                                <Hexagon
                                    key={colIndex}
                                    piece={hexagon.piece}
                                    color={hexagon.color}
                                    isSelected={isSelected || isHighlighted}
                                    isPossible={possible}
                                    row={adjustedRowIndex}
                                    col={adjustedColIndex}
                                        onClick={() => handleClick(adjustedRowIndex, adjustedColIndex)}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

}

export default Board;
