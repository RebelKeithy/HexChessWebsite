

export const ortho = {
    'u': [1, 0, -1],
    'r': [-1, 1, 0],
    'l': [0, -1, 1]
}

export const diagonals = {
    'r': [-1, 2, -1],
    'u': [2, -1, -1],
    'd': [-1, -1, 2]
}

export const axis = {
    'ou': ortho['u'],
    'or': ortho['r'],
    'ol': ortho['l'],
    'dr': diagonals['r'],
    'du': diagonals['u'],
    'dd': diagonals['d'],
}

export class Coordinate {
    constructor(row, col, u, v, d) {
        this.row = row
        this.col = col
        this.u = u;
        this.v = v;
        this.d = d;
    }

    valid() {
        return this.u >= 0 && this.u <= 10 && this.d >= 0 && this.d <= 10 && this.v >= 0 && this.v <= 10
    }

    copy() {
        return new Coordinate(this.row, this.col, this.u, this.v, this.d)
    }
    moveAxis(dir, offset=1) {
        return Coordinate.fromHexCoords(
            this.u + axis[dir][0] * offset,
            this.v + axis[dir][1] * offset,
            this.d + axis[dir][2] * offset
        )
    }

    moveOrtho(dir, offset = 1) {
        return Coordinate.fromHexCoords(
            this.u + ortho[dir][0] * offset,
            this.v + ortho[dir][1] * offset,
            this.d + ortho[dir][2] * offset
        )
    }

    moveDiagonal(dir, offset = 1) {
        return Coordinate.fromHexCoords(
            this.u + diagonals[dir][0] * offset,
            this.v + diagonals[dir][1] * offset,
            this.d + diagonals[dir][2] * offset
        )
    }
    
    static fromHexCoords(u, v, d) {
        var row = -1
        var col = -1
        
        row = 10 - u + d
        if (row <= 5) {
            col = 10 - u
        }
        else if (row >= 6 && row <= 14) {
            col = 10 - u - Math.floor((row - 4) / 2)
        }
        else if (row >= 15) {
            col = 10 - d
        }
        return new Coordinate(row, col, u, v, d)
    }
    
    static fromCartesian(row, col) {
        var u = -1
        var v  = -1
        var d = -1
        if (row >= 0 && row <= 5) {
            v = 5 - row + col * 2
            u = 10 - col
            d = row - col
        } else if (row >= 6 && row <= 14) {
            v = 1 - row % 2 + col * 2
            u = 10 - Math.floor((row - 4) / 2) - col
            d = 5 + Math.floor((row - 5) / 2) - col
        } else if (row >= 15 && row <= 20) {
            v = row - 15 + col * 2
            u = 20 - row - col
            d = 10 - col
        }
        return new Coordinate(row, col, u, v, d)
    }
}
