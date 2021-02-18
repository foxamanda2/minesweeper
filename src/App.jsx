import React, { Component } from 'react'
import { Table } from './components/Table'

// state = {
//   board: [],
//   state: "new",
//   mines: 10
// }
// async componentBoardMount() {
//   await fetch('https://minesweeper-api.herokuapp.com/').then(response=> (return response.json())).then (apidata=> (console.log(apiData)))
// }
export class App extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th colspan="2">MineSweeper</th>
          </tr>
        </thead>
        <tbody>
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
        </tbody>
      </table>
    )
  }
}
