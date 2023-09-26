import {Coordinate} from "./Coords";

const PIECE_FUNCTIONS = {
    pawn: possibleMovesPawn,
    bishop: possibleMovesBishop,
    rook: possibleMovesRook,
    knight: possibleMovesKnight,
    queen: possibleMovesQueen,
    king: possibleMovesKing
};

export function possibleMoves(boardState, coord) {
    const piece = boardState[coord.row][coord.col]
    if (piece.color !== null) {
        const func = PIECE_FUNCTIONS[piece.piece]
        if (func) {
            return func(boardState, coord)
        }
    }
    return []
}

function hasFriendly(boardState, from, to) {
    return boardState[from.row][from.col].color === boardState[to.row][to.col].color
}

function hasEnemy(boardState, from, to) {
    return boardState[from.row][from.col].color !== boardState[to.row][to.col].color && boardState[to.row][to.col].color !== null
}

function validMove(boardState, from, to) {
    if (!to.valid()) {
        return false
    }
    return !hasFriendly(boardState, from, to)
}

function isStartingPawnCoord(piece, coord) {
    if(piece.color === 'black') {
        if (coord.u === 6 && coord.d <= 4) {
            return true
        } else if(coord.d === 4 && coord.u >= 6) {
            return true
        }
    }
    else if(piece.color === 'white') {
        if (coord.u === 4 && coord.d >= 6) {
            return true
        } else if(coord.d === 6 && coord.u <= 4) {
            return true
        }
    }
    return false
}

function possibleMovesPawn(boardState, coord) {
    const moves = [  ]
    var direction = 1
    if(boardState[coord.row][coord.col].color === 'black') {
        direction = -1
    }
    var move = coord.moveOrtho('u', direction)
    if (validMove(boardState, coord, move) && !hasEnemy(boardState, coord, move)) {
        moves.push(move)
        if (isStartingPawnCoord(boardState[coord.row][coord.col], coord)) {
            move = coord.moveOrtho('u', 2 * direction)
            if (validMove(boardState, coord, move) && !hasEnemy(boardState, coord, move)) {
                moves.push(move)
            }
        }
    }
    move = coord.moveOrtho('l', -direction)
    if(move.valid() && hasEnemy(boardState, coord, move)) {
        moves.push(move)
    }
    move = coord.moveOrtho('r', -direction)
    if(move.valid() && hasEnemy(boardState, coord, move)) {
        moves.push(move)
    }
    return moves
}

function possibleMovesBishop(boardState, coord) {
    const moves = []
    moves.push(...findMovesAlongAxis(boardState, 'dr', coord))
    moves.push(...findMovesAlongAxis(boardState, 'du', coord))
    moves.push(...findMovesAlongAxis(boardState, 'dd', coord))
    return moves
}

function possibleMovesRook(boardState, coord) {
    const moves = []
    moves.push(...findMovesAlongAxis(boardState, 'ou', coord))
    moves.push(...findMovesAlongAxis(boardState, 'or', coord))
    moves.push(...findMovesAlongAxis(boardState, 'ol', coord))
    return moves
}

function possibleMovesQueen(boardState, coord) {
    const moves = []
    moves.push(...findMovesAlongAxis(boardState, 'dr', coord))
    moves.push(...findMovesAlongAxis(boardState, 'du', coord))
    moves.push(...findMovesAlongAxis(boardState, 'dd', coord))
    moves.push(...findMovesAlongAxis(boardState, 'ou', coord))
    moves.push(...findMovesAlongAxis(boardState, 'or', coord))
    moves.push(...findMovesAlongAxis(boardState, 'ol', coord))
    return moves
}

function possibleMovesKnight(boardState, coord) {
    const moves = []
    const possibleMoves = []

    possibleMoves.push(coord.moveOrtho('u', 2).moveOrtho('r', -1))
    possibleMoves.push(coord.moveOrtho('u', 2).moveOrtho('l', -1))
    possibleMoves.push(coord.moveOrtho('u', -2).moveOrtho('r', 1))
    possibleMoves.push(coord.moveOrtho('u', -2).moveOrtho('l', 1))
    possibleMoves.push(coord.moveOrtho('r', 2).moveOrtho('u', -1))
    possibleMoves.push(coord.moveOrtho('r', 2).moveOrtho('l', -1))
    possibleMoves.push(coord.moveOrtho('r', -2).moveOrtho('u', 1))
    possibleMoves.push(coord.moveOrtho('r', -2).moveOrtho('l', 1))
    possibleMoves.push(coord.moveOrtho('l', 2).moveOrtho('r', -1))
    possibleMoves.push(coord.moveOrtho('l', 2).moveOrtho('u', -1))
    possibleMoves.push(coord.moveOrtho('l', -2).moveOrtho('r', 1))
    possibleMoves.push(coord.moveOrtho('l', -2).moveOrtho('u', 1))

    possibleMoves.forEach(move => {
        if (validMove(boardState, coord, move)) {
            moves.push(move)
        }
    })

    return moves
}

function possibleMovesKing(boardState, coord) {
    const moves = []
    const possibleMoves = []

    possibleMoves.push(coord.moveOrtho('u', 1))
    possibleMoves.push(coord.moveOrtho('u', -1))
    possibleMoves.push(coord.moveOrtho('r', 1))
    possibleMoves.push(coord.moveOrtho('r', -1))
    possibleMoves.push(coord.moveOrtho('l', 1))
    possibleMoves.push(coord.moveOrtho('l', -1))
    possibleMoves.push(coord.moveDiagonal('r', 1))
    possibleMoves.push(coord.moveDiagonal('r', -1))
    possibleMoves.push(coord.moveDiagonal('u', 1))
    possibleMoves.push(coord.moveDiagonal('u', -1))
    possibleMoves.push(coord.moveDiagonal('d', 1))
    possibleMoves.push(coord.moveDiagonal('d', -1))

    possibleMoves.forEach(move => {
        if (validMove(boardState, coord, move)) {
            moves.push(move)
        }
    })

    return moves
}

function findMovesAlongAxis(boardState, axis, coord) {
    const moves = []
    var move = coord.copy()
    while(true) {
        move = move.moveAxis(axis, 1)
        if (!move.valid()) {
            break
        }
        if (hasEnemy(boardState, coord, move)) {
            moves.push(move)
            break
        }
        if (hasFriendly(boardState, coord, move)) {
            break
        }
        moves.push(move)
    }
    move = coord.copy()
    while(true) {
        move = move.moveAxis(axis, -1)
        if (!move.valid()) {
            break
        }
        if (hasEnemy(boardState, coord, move)) {
            moves.push(move)
            break
        }
        if (hasFriendly(boardState, coord, move)) {
            break
        }
        moves.push(move)
    }
    return moves
}
