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
  }

  handleClickCell = async (row, col) => {
    if (
      this.state.id === undefined ||
      this.state.state === 'won' ||
      this.state.state === 'lost'
    ) {
      return
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',

      headers: { 'content-type': 'application/json' },

      body: JSON.stringify(body),
    })

    const game = await response.json()

    console.log(game)

    this.setState(game)
  }
  handleDifficulty = async difficultyNum => {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games?difficulty=${difficultyNum}`,
      {
        method: 'POST',

        headers: { 'content-type': 'application/json' },
      }
    )

    const game = await response.json()

    this.setState(game)
  }
  handleFlagCell = async (row, col) => {
    if (
      this.state.id === undefined ||
      this.state.state === 'won' ||
      this.state.state === 'lost'
    ) {
      return
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',

      headers: { 'content-type': 'application/json' },

      body: JSON.stringify(body),
    })

    const game = await response.json()

    this.setState(game)
  }
  handleNewGame = async () => {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games?',
      {
        method: 'POST',

        headers: { 'content-type': 'application/json' },
      }
    )

    const game = await response.json()

    this.setState(game)
  }
  render() {
    let footer = ''
    if (this.state.state === 'won') {
      footer = 'YOU AVOIDED THE RAINDROPS! YOU WON!'
    }
    if (this.state.state === 'lost') {
      footer = 'OH NO! YOU LOST!'
    }

    return (
      <div>
        <section className="board">
          <header>DropSweeper</header>
          <p>Don't Let the raindrops hit you!</p>
          <nav>
            <button onClick={() => this.handleDifficulty(0)}>Easy</button>
            <button onClick={() => this.handleDifficulty(1)}>Medium</button>
            <button onClick={() => this.handleDifficulty(2)}>Hard</button>
          </nav>
          <table>
            <tbody>
              {this.state.board.map((boardRow, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {boardRow.map((cell, colIndex) => {
                      return (
                        <td
                          key={colIndex}
                          className={
                            cell === '_'
                              ? 'revealed'
                              : cell === 'F'
                              ? 'flagged'
                              : cell === '*'
                              ? 'bomb'
                              : cell === '@'
                              ? 'flaggedBomb'
                              : null
                          }
                          onClick={() =>
                            this.handleClickCell(rowIndex, colIndex)
                          }
                          onContextMenu={event => {
                            event.preventDefault()
                            this.handleFlagCell(rowIndex, colIndex)
                          }}
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
          <button className="newGame" onClick={this.handleNewGame}>
            New Game
          </button>
          <footer>{footer}</footer>
        </section>
        <section className="rules">
          <aside>
            Rules Of Play
            <ol>
              <li>Click New Game.</li>
              <li>Left Click on a space on the grid.</li>
              <li>If you hit a raindrop you lose.</li>
              <li>
                The number on the board represents how many raindrops are
                adjacent to the square (these can be diagonal to the square).
              </li>
              <li>
                Right click to place a flower where you think a raindrop is.
              </li>
              <li>Avoid all the raindrops and you win!</li>
              <li>
                If you put a flower correctly on a raindrop a ladybug will
                appear.
              </li>
            </ol>
          </aside>
        </section>
      </div>
    )
  }
}
