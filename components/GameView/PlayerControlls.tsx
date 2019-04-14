import React, { Component } from "react";
import { View, TouchableHighlight } from "react-native";

interface Props {
  rIndex: number;
  cIndex: number;
  cellWidth: number;
  boardMargin: number;
  move: () => void;
}
interface State {}
export default class PlayerControlls extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { rIndex, cIndex, cellWidth, boardMargin, move } = this.props;

    return (
      <TouchableHighlight
        onPress={move}
        style={{
          zIndex: 100,
          width: cellWidth,
          height: cellWidth,
          position: "absolute",
          left: cellWidth * cIndex + boardMargin,
          top: cellWidth * rIndex + boardMargin * 2,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "green"
        }}
      >
        <View />
      </TouchableHighlight>
    );
  }
}
