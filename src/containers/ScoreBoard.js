import React, { useState, useContext } from 'react'
import GameContext from '../context/GameContext'
import { withRouter } from 'react-router-dom'

const ScoreBoard = props => {
  const { state, dispatch } = useContext(GameContext)
  const [name, setName] = useState()
  const sort = scores => {
    let sortable = []
    for (let player in scores) {
      sortable.push([player, scores[player]])
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1]
    })

    return sortable
  }
  return (
    <div style={{ width: '200px' }}>
      <div> Score Board </div>
      {sort(state.players).map(data => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{data[0]}</div>
          <div>{data[1]}</div>
        </div>
      ))}
      <br />
      <div>
        <input
          type="text"
          placeholder="Enter player name"
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: 'SET_NAME', name })
            props.history.push({
              pathname: '/game',
            })
          }}
        >
          Play Game
        </button>
      </div>
    </div>
  )
}

export default withRouter(ScoreBoard)
