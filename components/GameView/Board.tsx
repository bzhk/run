import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  boardMargin: number;
  cellWidth: number;
  board: string[][];
}
interface State {}
export default class Board extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { board, cellWidth, boardMargin } = this.props;

    return (
      <View
        style={{
          position: "absolute",
          top: boardMargin * 2,
          left: boardMargin,
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0
        }}
      >
        {board.map((row, r_index) => {
          return (
            <View style={styles.row} key={r_index}>
              {row.map((cell, c_index) => {
                return (
                  <View
                    style={{
                      width: cellWidth,
                      height: cellWidth,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: "#d6d7da",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 0
                    }}
                    key={c_index}
                  >
                    {cell == "M" && <Text>{cell}</Text>}
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

    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0
  }
});
