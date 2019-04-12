import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import config from "../data/board";
interface Props {}
interface State {
  level: number;
  board: string[][];
}

export default class GameView extends Component<Props, State> {
  private _player: any;
  constructor(props: Props, _player: any) {
    super(props);
    this.state = {
      level: 1,
      board: []
    };

    this._player = null;
  }

  componentDidMount(): void {
    const levels: { [key: number]: string[][] } = config.levels;
    const index: number = this.state.level;
    let board = levels[index];

    this.setState({
      board: board
    });
  }

  render() {
    this._player &&
      this._player.measure(
        (
          fx: number,
          fy: number,
          width: number,
          height: number,
          px: number,
          py: number
        ): void => {
          console.log("Component width is: " + width);
          console.log("Component height is: " + height);
          console.log("X offset to frame: " + fx);
          console.log("Y offset to frame: " + fy);
          console.log("X offset to page: " + px);
          console.log("Y offset to page: " + py);
        }
      );

    return (
      <View style={styles.container}>
        {this.state.board.map((row, r_index) => {
          return (
            <View style={styles.row} key={r_index}>
              {row.map((cell, c_index) => {
                return (
                  <View
                    style={styles.cell}
                    key={c_index}
                    ref={ref => (cell === "S" ? (this._player = ref) : null)}
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
