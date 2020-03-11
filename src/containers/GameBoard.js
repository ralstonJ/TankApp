import React, { useState, useReducer, useContext, useEffect } from 'react'
import {
  multiplyStingNameBy,
  getRandomNumber,
  moveLeft,
  moveRight,
} from '../utils/utils'
import GameContext from '../context/GameContext'
import { withRouter } from 'react-router-dom'
import {
  GameOver,
  HeaderText,
  AlignCenter,
  Grid,
  Square,
} from '../components/commonStyled'

let timer
const GameBoard = ({
  squareMatrixSize = 5,
  gridSize = '40px',
  playerComponent,
  targetComponent,
  history,
}) => {
  const { state, dispatch } = useContext(GameContext)
  const gridConfig = multiplyStingNameBy(gridSize, squareMatrixSize)

  const ONE_MINUTE = 60
  const emptyArray = new Array(squareMatrixSize * squareMatrixSize)
  const gridCenter = parseInt((squareMatrixSize + 1) / 2)

  const [transformTarget, setTransformTarget] = useState({})
  const [transformPlayer, setTransformPlayer] = useState({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(0deg)',
    gridColumn: gridCenter,
    gridRow: gridCenter,
  })
  const [counter, setCounter] = useState(0)
  const [dirPos, setDirPos] = useState(0)
  const [row, setRow] = useState(gridCenter)
  const [col, setCol] = useState(gridCenter)
  const [gameend, setGameend] = useState(false)
  const [nextMove, setNextMove] = useState({ row: -1, col: 0 })
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!state.currentPlayer) {
      history.push({
        pathname: '/',
      })
    }
    setTransformTarget({
      gridRow: getRandomNumber(gridCenter),
      gridColumn: getRandomNumber(gridCenter),
    })
    timer = setInterval(() => {
      setCounter(counter => {
        return counter < ONE_MINUTE - 1 ? counter + 1 : clearInterval(timer)
      })
    }, 1000)
  }, [])

  useEffect(() => {
    const isTimeUp = counter === 59
    if (isTimeUp) {
      setGameend(true)
      setScore(score => {
        dispatch({
          type: 'PLAYER_ADD',
          payload: {
            name: state.currentPlayer.name,
            score,
          },
        })
        return score
      })
    }
  }, [counter])

  useEffect(() => {
    setTransformPlayer(value => ({
      ...value,
      transform: `rotate(${dirPos * 90}deg)`,
    }))
  }, [dirPos])

  const resetGame = () => {
    setGameend(false)
    setRow(gridCenter)
    setCol(gridCenter)
    clearInterval(timer)
    setCounter(0)
    timer = setInterval(() => {
      setCounter(counter => {
        return counter < ONE_MINUTE - 1 ? counter + 1 : clearInterval(timer)
      })
    }, 1000)
    setTransformPlayer(val => ({
      ...val,
      gridRow: gridCenter,
      gridColumn: gridCenter,
      transform: 'rotate(0deg)',
    }))
    setNextMove({ row: -1, col: 0 })
    const gridRowTarget = getRandomNumber(gridCenter)
    const gridColTarget = getRandomNumber(gridCenter)

    setTransformTarget({
      gridRow: gridRowTarget,
      gridColumn: gridColTarget,
    })
  }

  const onMove = () => {
    const rv = row + nextMove.row
    const cv = col + nextMove.col
    if (
      rv === 0 ||
      rv === squareMatrixSize + 1 ||
      cv === 0 ||
      cv === squareMatrixSize + 1
    ) {
      setScore(score => {
        dispatch({
          type: 'PLAYER_ADD',
          payload: {
            name: state.currentPlayer.name,
            score,
          },
        })
        return score
      })
      setGameend(true)
      clearInterval(timer)
      return
    }
    setRow(actualRow => actualRow + nextMove.row)
    setCol(actualCol => actualCol + nextMove.col)

    setTransformPlayer(val => ({
      ...val,
      gridRow: row + nextMove.row,
      gridColumn: col + nextMove.col,
    }))

    if (rv === transformTarget.gridRow && cv === transformTarget.gridColumn) {
      setScore(score => {
        dispatch({
          type: 'PLAYER_ADD',
          payload: {
            name: state.currentPlayer.name,
            score: score + 1,
          },
        })
        return score + 1
      })
      setGameend(true)
      clearInterval(timer)
    }
  }

  const toScoreboard = () => {
    history.push({
      pathname: '/',
    })
  }

  const generateSquares = () =>
    emptyArray.fill().map((value, i) => {
      const col = (i % squareMatrixSize) + 1
      const row = parseInt(i / squareMatrixSize) + 1
      return <Square row={row} col={col} />
    })

  const hasGameEnded = gameend && 'Game Over'
  return (
    <div>
      <div>
        <AlignCenter>
          <HeaderText>Score: {score} </HeaderText>
        </AlignCenter>
        <AlignCenter>
          <HeaderText>Time: {counter} </HeaderText>
        </AlignCenter>
        <AlignCenter>
          <GameOver>{hasGameEnded}</GameOver>
        </AlignCenter>
      </div>
      <AlignCenter>
        <Grid config={gridConfig}>
          {generateSquares()}
          <div style={transformPlayer}>{playerComponent}</div>
          <div style={transformTarget}>{targetComponent}</div>
        </Grid>
      </AlignCenter>
      <br /> <br />
      <div>
        <AlignCenter>
          <button
            disabled={gameend}
            onClick={() => moveLeft(setDirPos, setNextMove)}
          >
            left
          </button>
          <button disabled={gameend} onClick={onMove}>
            move
          </button>
          <button
            disabled={gameend}
            onClick={() => moveRight(setDirPos, setNextMove)}
          >
            right{' '}
          </button>
        </AlignCenter>
        <br />
        <AlignCenter>
          <button onClick={resetGame}>Reset</button>
        </AlignCenter>
        <AlignCenter>
          <button onClick={toScoreboard}>Go to scoreboard</button>
        </AlignCenter>
      </div>
    </div>
  )
}

export default withRouter(GameBoard)
