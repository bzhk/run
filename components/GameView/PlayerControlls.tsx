import React, { Component } from "react";
import { Image, TouchableHighlight } from "react-native";
const arrow: any = require("../assets/arrow.png");
interface Props {
  rIndex: number;
  cIndex: number;
  cellWidth: number;
  boardMargin: number;
  rotation: string;
  move: (r_index: number, c_index: number) => void;
}
interface State {}
export default class PlayerControlls extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      rIndex,
      cIndex,
      cellWidth,
      boardMargin,
      rotation,
      move
    } = this.props;

    return (
      <TouchableHighlight
        onPress={() => move(rIndex, cIndex)}
        style={{
          zIndex: 100,
          width: cellWidth,
          height: cellWidth,
          position: "absolute",
          left: cellWidth * cIndex + boardMargin,
          top: cellWidth * rIndex + boardMargin * 2
        }}
      >
        <Image
          source={arrow}
          style={{
            width: cellWidth,
            height: cellWidth,
            transform: [{ rotate: rotation }]
          }}
        />
      </TouchableHighlight>
    );
  }
}
