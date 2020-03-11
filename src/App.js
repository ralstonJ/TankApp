import React, { useReducer } from 'react'
import logo from './logo.svg'
import GameBoard from './containers/GameBoard'
import ScoreBoard from './containers/ScoreBoard'
import Tank from './components/Tank'
import Target from './components/Target'
import { AlignCenter } from './components/commonStyled'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GameContext from './context/GameContext'
import reducer from './reducer/reducer'

const initialState = {
  players: { ralph: 0 },
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <AlignCenter>
        <Router>
          <Switch>
            <Route exact path="/">
              <ScoreBoard />
            </Route>
            <Route path="/game">
              <GameBoard
                playerComponent={<Tank />}
                targetComponent={<Target />}
                gridSize={'70px'}
              />
            </Route>
          </Switch>
        </Router>
      </AlignCenter>
    </GameContext.Provider>
  )
}

export default App
