import React, { Component } from 'react'

export class App extends Component {
  state = {
    // id: 1,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
  }
  handleClickCell = async (row, col) => {
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log(response)
    const game = await response.json()
    this.setState({ board: game.board })
  }
  handleFlagCell = async (row, col) => {
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`
    // for difficulty at the end of games?{difficuly}
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log(response)
    const game = await response.json()
    this.setState({ board: game.board })
  }
  handleNewGame = async () => {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    const game = await response.json()
    this.setState(game)
  }
  render() {
    return (
      <table>
        <caption>
          MineSweeper <button onClick={this.handleNewGame}>New Game</button>
        </caption>
        <tbody className="table">
          {this.state.board.map((boardRow, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {boardRow.map((cell, colIndex) => {
                  return (
                    <td
                      key={colIndex}
                      onClick={() => this.handleClickCell(rowIndex, colIndex)}
                      onContextMenu={() =>
                        this.handleFlagCell(rowIndex, colIndex)
                      }
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
