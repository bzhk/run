import React, { Component } from "react";
import { Image, View, Button } from "react-native";
const arrow: any = require("../assets/arrow.png");
interface Props {
  rIndex: number;
  cIndex: number;
  cellWidth: number;
  boardMargin: number;
  rotation: string;
}
interface State {}
export default class PlayerControlls extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { rIndex, cIndex, cellWidth, boardMargin, rotation } = this.props;
    console.log(rIndex, cIndex, cellWidth, boardMargin, rotation);
    return (
      <Image
        source={arrow}
        style={{
          width: cellWidth,
          height: cellWidth,
          position: "absolute",
          transform: [{ rotate: rotation }],
          left: cellWidth * cIndex + boardMargin,
          top: cellWidth * rIndex + boardMargin * 2,
          zIndex: 10,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "red"
        }}
      />
    );
  }
}
