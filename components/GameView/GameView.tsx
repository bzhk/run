import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import config from "../data/board";
import PlayerControlls from "./PlayerControlls";
import Player from "./Player";
import Board from "./Board";
import BoardItem from "./BoardItem";
interface Events {
  x: number;
  y: number;
  rotation: string;
  label: string;
}
interface Props {}
interface State {
  level: number;
  board: string[][];
  events: Events[];
  controllers: Events[];
  playerIndexR: number;
  playerIndexC: number;
  checkCords: boolean;
  screenWidth: number;
  boardWidth: number;
  boardMargin: number;
  cellWidth: number;
  stamina: number;
}

export default class GameView extends Component<Props, State, Events> {
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
      events: [],
      controllers: [],
      playerIndexR: 0,
      playerIndexC: 0,
      screenWidth: width,
      boardWidth: boardWidth,
      cellWidth: cellWidth,
      boardMargin: boardMargin,
      stamina: 10
    };
  }

  componentDidMount(): void {
    const levels: { [key: number]: string[][] } = config.levels;
    const index: number = this.state.level;
    let board = levels[index];
    this.parseBoard(board);
    this.setState({
      board: board
    });
  }

  newEvent = (
    x: number,
    y: number,
    rotation: string,
    label: string
  ): Events => {
    return { x, y, rotation, label };
  };

  parseBoard = (board: string[][]): void => {
    const newEvents: Events[] = [];
    board.forEach((row: string[], r_index: number) => {
      row.forEach((cell: string, c_index: number) => {
        if (cell == "S") {
          this.setState({
            playerIndexR: r_index,
            playerIndexC: c_index
          });
          this.setControlers(r_index, c_index, board);
        }
        if (cell === "Z") {
          newEvents.push(this.newEvent(r_index, c_index, "", "Z"));
        }
        if (cell == "D") {
          newEvents.push(this.newEvent(r_index, c_index, "", "D"));
        }
      });
    });
    this.setState({
      events: newEvents
    });
  };

  setControlers = (
    r_index: number,
    c_index: number,
    board: string[][]
  ): void => {
    const controllersBucket: Events[] = [];
    if (r_index > -1 && r_index < 9) {
      if (board[r_index + 1] && board[r_index + 1][c_index] !== "Z") {
        controllersBucket.push({
          x: r_index + 1,
          y: c_index,
          rotation: "90deg",
          label: "C"
        });
      }

      if (board[r_index - 1] && board[r_index - 1][c_index] !== "Z") {
        controllersBucket.push({
          x: r_index - 1,
          y: c_index,
          rotation: "270deg",
          label: "C"
        });
      }
    }

    if (c_index > -1 && c_index < 9) {
      if (board[r_index][c_index + 1] && board[r_index][c_index + 1] !== "Z") {
        controllersBucket.push({
          x: r_index,
          y: c_index + 1,
          rotation: "0deg",
          label: "C"
        });
      }
      if (board[r_index][c_index - 1] && board[r_index][c_index - 1] !== "Z") {
        controllersBucket.push({
          x: r_index,
          y: c_index - 1,
          rotation: "180deg",
          label: "C"
        });
      }
    }
    this.setState({
      controllers: controllersBucket
    });
  };

  clearItem = (r_index: number, c_index: number): void => {
    const itemIndex = this.state.events.findIndex(elem => {
      return elem.x == r_index && elem.y === c_index;
    });
    if (itemIndex > -1) {
      const newEvent = [...this.state.events];
      newEvent.splice(itemIndex, 1);
      this.setState({
        events: newEvent
      });
    }
  };

  parseEvent = (event: string): Promise<{ mod_stamina: number }> => {
    return new Promise(resolve => {
      const objAfterEvent: { mod_stamina: number } = { mod_stamina: 0 };
      switch (event) {
        case "D":
          objAfterEvent.mod_stamina = 8;

          break;
      }
      resolve(objAfterEvent);
    });
  };

  move = async (
    r_index: number,
    c_index: number,
    board: string[][],
    stamina: number
  ): Promise<any> => {
    const newStamina = stamina - 1;
    const event = board[r_index][c_index];
    const objAfterEvent = await this.parseEvent(event);
    this.clearItem(r_index, c_index);
    const { mod_stamina } = objAfterEvent;
    this.setState({
      playerIndexR: r_index,
      playerIndexC: c_index,
      stamina: newStamina + mod_stamina
    });
    this.setControlers(r_index, c_index, board);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.controllers.map((elem: Events, index: number) => {
          return (
            <PlayerControlls
              key={index}
              rIndex={elem.x}
              cIndex={elem.y}
              cellWidth={this.state.cellWidth}
              boardMargin={this.state.boardMargin}
              move={() =>
                this.move(elem.x, elem.y, this.state.board, this.state.stamina)
              }
            />
          );
        })}

        {this.state.events.map((elem: Events, index: number) => {
          return (
            <BoardItem
              key={index}
              rIndex={elem.x}
              cIndex={elem.y}
              label={elem.label}
              cellWidth={this.state.cellWidth}
              boardMargin={this.state.boardMargin}
            />
          );
        })}

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
        <Text>Stamina: {this.state.stamina}</Text>
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
