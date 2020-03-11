export const multiplyStingNameBy = (str, times) => {
  let string = str

  for (let i = 1; i < times; i++) {
    string += ' ' + str
  }
  return string
}

export const getRandomNumber = gridCenter => {
  let value
  do {
    value = Math.floor(Math.random() * 5) + 1
  } while (value === gridCenter)

  return value
}

export const moveLeft = (setDirPos, setNextMove) => {
  setDirPos(right => {
    let val
    if (right === 0) val = 3
    else val = right - 1
    setMove(val, setNextMove)
    return val
  })
}

export const moveRight = (setDirPos, setNextMove) => {
  setDirPos(left => {
    let val
    if (left === 3) {
      val = 0
    } else {
      val = left + 1
    }
    setMove(val, setNextMove)
    return val
  })
}

export const setMove = (val, setNextMove) => {
  switch (val) {
    case 0: {
      setNextMove({ col: 0, row: -1 })
      break
    }
    case 1: {
      setNextMove({ col: 1, row: 0 })
      break
    }
    case 2: {
      setNextMove({ col: 0, row: 1 })
      break
    }
    case 3: {
      setNextMove({ col: -1, row: 0 })
      break
    }
  }
}
