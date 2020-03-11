const ActionTypes = {
  SET_NAME: 'SET_NAME',
  PLAYER_ADD: 'PLAYER_ADD',
}

const initialState = {
  players: { ralph: 0 },
}

export default (state = initialState, action) => {
  const { SET_NAME, PLAYER_ADD } = ActionTypes
  switch (action.type) {
    case SET_NAME: {
      return { ...state, currentPlayer: { name: action.name } }
    }
    case PLAYER_ADD: {
      const { name, score } = action.payload
      const { players } = state
      let newPlayers = { ...players }
      const playerLastScore = players.name || ''
      if (!playerLastScore || playerLastScore < score) {
        newPlayers = { ...players, [name]: score }
      }
      return { ...state, players: newPlayers }
    }
    default: {
      return state
    }
  }
}
