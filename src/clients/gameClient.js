
export const createGame = async () => {
    const response = await fetch('https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/v1/games', {
        method: 'POST'
    });
    const data = await response.json();
    console.log(data)
    return data;
}

export const joinGame = async (gameId) => {
    const response = await fetch(`https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/v1/games/${gameId}/join`, {
        method: 'POST'
    });
    const data = await response.json();
    console.log(data)
    return data;
}

// Function to call the API to get the game state
// include playerId in query parameters
// url = 'https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/game/{gameId}?playerId={playerId}'
export const getGameState = async (gameId, playerId) => {
    const response = await fetch(`https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/v1/games/${gameId}?playerId=${playerId}`);
    const data = await response.json();
    console.log(data)
    return data;
}

/*
 * Function to call the API to make a move. Move query param is formatted as a string "(x,y,x2,y2)"
 * Move is a post request
 */
export const move = async (gameId, playerId, from, to) => {
    const moveString = `(${from.row},${from.col},${to.row},${to.col})`
    const response = await fetch(`https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/v1/games/${gameId}/move/?playerId=${playerId}&move=${moveString}`, {
        method: 'POST'
    });
    const data = await response.json();
    console.log(data)
    return data;
}