import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import config from "../data/board";
import Player from "./Player";
import Board from "./Board";
interface Props {}
interface State {
  level: number;
  board: string[][];
  playerIndexR: number;
  playerIndexC: number;
  checkCords: boolean;
  screenWidth: number;
  boardWidth: number;
  boardMargin: number;
  cellWidth: number;
}

export default class GameView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const width: number = Math.round(Dimensions.get("window").width);
    const boardWidth: number = width * 0.8;
    const boardMargin: number = width * 0.1;
    const cellWidth: number = boardWidth / 9;
    this.state = {
      checkCords: false,
      level: 1,
      board: [],
      playerIndexR: 0,
      playerIndexC: 0,
      screenWidth: width,
      boardWidth: boardWidth,
      cellWidth: cellWidth,
      boardMargin: boardMargin
    };
  }

  componentDidMount(): void {
    const levels: { [key: number]: string[][] } = config.levels;
    const index: number = this.state.level;
    let board = levels[index];
    this.setStartCords(board);
    this.setState({
      board: board
    });
  }

  setStartCords = (board: string[][]): void => {
    board.forEach((row: string[], r_index: number) => {
      row.forEach((cell: string, c_index: number) => {
        if (cell == "S") {
          this.setState({
            playerIndexR: r_index,
            playerIndexC: c_index
          });
          return;
        }
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Player
          rIndex={this.state.playerIndexR}
          cIndex={this.state.playerIndexC}
          cellWidth={this.state.cellWidth}
          boardMargin={this.state.boardMargin}
        />
        <Board
          boardMargin={this.state.boardMargin}
          cellWidth={this.state.cellWidth}
          board={this.state.board}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#F5FCFF"
  }
});
