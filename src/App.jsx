import React, { Component } from 'react'

export class App extends Component {
  state = {
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
    state: 'new',
  }
  handleClickCell = async (row, col) => {
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const game = await response.json()
    console.log(game)
    this.setState({ board: game.board })
    if (game.state === 'won' || game.state === 'lost') {
      console.log(game.state)
    }
  }
  // handleDifficulty = async () => {
  //   const response = await fetch(
  //     `https://minesweeper-api.herokuapp.com/games?${this.state.difficulty}`,
  //     {
  //       method: 'POST',
  //       headers: { 'content-type': 'application/json' },
  //     }
  //   )
  //   const game = await response.json()
  //   this.setState(game)
  // }
  handleFlagCell = async (row, col) => {
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`
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
          {/* <button
            onClick={this.handleDifficulty}
          >
            Easy
          </button>
          <button
            onClick={this.handleDifficulty}
          >
            Medium
          </button>
          <button
            onClick={this.handleDifficulty}
          >
            Hard
          </button> */}
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
