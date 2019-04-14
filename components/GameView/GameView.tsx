import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import config from "../data/board";
import PlayerControlls from "./PlayerControlls";
import Player from "./Player";
import Board from "./Board";
interface Props {}
interface State {
  level: number;
  board: string[][];
  controllers: {
    x: number;
    y: number;
    rotation: string;
  }[];
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
      controllers: [],
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
          this.setControlers(r_index, c_index, board);
          return;
        }
      });
    });
  };

  setControlers = (
    r_index: number,
    c_index: number,
    board: string[][]
  ): void => {
    const controllersBucket: {
      x: number;
      y: number;
      rotation: string;
    }[] = [];
    if (r_index > -1 && r_index < 9) {
      if (board[r_index + 1] && board[r_index + 1][c_index] === "O") {
        controllersBucket.push({
          x: r_index + 1,
          y: c_index,
          rotation: "90deg"
        });
      }

      if (board[r_index - 1] && board[r_index - 1][c_index] === "O") {
        controllersBucket.push({
          x: r_index - 1,
          y: c_index,
          rotation: "270deg"
        });
      }
    }

    if (c_index > -1 && c_index < 9) {
      if (board[r_index][c_index + 1] === "O") {
        controllersBucket.push({
          x: r_index,
          y: c_index + 1,
          rotation: "0deg"
        });
      }
      if (board[r_index][c_index - 1] === "O") {
        controllersBucket.push({
          x: r_index,
          y: c_index - 1,
          rotation: "180deg"
        });
      }
    }
    this.setState({
      controllers: controllersBucket
    });
  };

  move = (r_index: number, c_index: number): void => {
    this.setState({
      playerIndexR: r_index,
      playerIndexC: c_index
    });
    this.setControlers(r_index, c_index, this.state.board);
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.controllers.map(
          (
            elem: {
              x: number;
              y: number;
              rotation: string;
            },
            index: number
          ) => {
            return (
              <PlayerControlls
                key={index}
                rIndex={elem.x}
                cIndex={elem.y}
                rotation={elem.rotation}
                cellWidth={this.state.cellWidth}
                boardMargin={this.state.boardMargin}
                move={this.move}
              />
            );
          }
        )}

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
