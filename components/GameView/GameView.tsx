import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import config from "../data/board";
import Player from "./Player";
interface Props {}
interface State {
  level: number;
  board: string[][];
  playerIndexR: number;
  playerIndexC: number;
  checkCords: boolean;
}

export default class GameView extends Component<Props, State> {
  private _startCords: any[][];

  constructor(props: Props) {
    super(props);
    this.state = {
      checkCords: false,
      level: 1,
      board: [],
      playerIndexR: 0,
      playerIndexC: 0
    };

    this._startCords = [];
  }

  setCordsArray = (
    ref: any,
    cell: string,
    r_index: number,
    c_index: number
  ): void => {
    setTimeout(() => {
      if (cell === "S") {
        this._startCords = { ref: ref, x: r_index, y: c_index };
      }
    }, 100);
  };

  getCords = (): void | any[][] => {
    if (this._startCords) return this._startCords;
  };

  checkCords = (): void => {
    setTimeout(() => {
      const cords = this.getCords();
      if (cords) {
        this.setState({
          checkCords: true
        });
      } else {
        this.checkCords();
      }
    }, 500);
  };

  componentDidMount(): void {
    const levels: { [key: number]: string[][] } = config.levels;
    const index: number = this.state.level;
    let board = levels[index];
    this.setState({
      board: board
    });
    this.checkCords();
  }

  render() {
    console.log(this.getCords());

    return (
      <View style={styles.container}>
        {!this.state.checkCords && (
          <View style={styles.loader}>
            <Text>Loading...</Text>
          </View>
        )}
        {this.state.checkCords && (
          <Player
            getCords={this.getCords}
            rIndex={this.state.playerIndexR}
            cIndex={this.state.playerIndexC}
          />
        )}
        {this.state.board.map((row, r_index) => {
          return (
            <View style={styles.row} key={r_index}>
              {row.map((cell, c_index) => {
                return (
                  <View
                    style={styles.cell}
                    key={c_index}
                    ref={ref => this.setCordsArray(ref, cell, r_index, c_index)}
                  >
                    <Text>{cell}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",

    backgroundColor: "#F5FCFF"
  },
  loader: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 100
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  row: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  cell: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#d6d7da",
    justifyContent: "center",
    alignItems: "center"
  }
});
