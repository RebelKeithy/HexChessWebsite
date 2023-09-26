
// Function to call the API to get the game state
// include playerId in query parameters
// url = 'https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/game/{gameId}?playerId={playerId}'
export const getGameState = async (gameId, playerId) => {
    const response = await fetch(`https://5p7bdpsxzi.execute-api.us-east-1.amazonaws.com/prod/v1/games/${gameId}?playerId=${playerId}`);
    const data = await response.json();
    console.log(data)
    return data;
}

export const getTestGameState = async () => {
    return getGameState("a0f639b8-0616-4fdb-8ca7-ae161afff27c", "6d7bf375-18aa-4a13-91b6-c18505397f3f")
}