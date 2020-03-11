import styled from 'styled-components'

export const HeaderText = styled.div`
  font-size: 18px;
  font-weight: bold;
`
export const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${({ config }) => config};
  grid-template-rows: ${({ config }) => config};
`
export const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`
export const GameOver = styled.div`
  height: 20px;
`

export const Square = styled.div`
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};
  border: 1px solid;
`
export const App = styled.div`
  display: flex;
  justify-content: center;
`
