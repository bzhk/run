import React, { Component } from "react";
import { Image, View, Button } from "react-native";
const hero: any = require("../assets/hero.png");
interface Props {
  rIndex: number;
  cIndex: number;
  cellWidth: number;
  boardMargin: number;
}
interface State {}
export default class Player extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { rIndex, cIndex, cellWidth, boardMargin } = this.props;

    return (
      <Image
        source={hero}
        style={{
          width: cellWidth,
          height: cellWidth,
          position: "absolute",
          left: cellWidth * cIndex + boardMargin,
          top: cellWidth * rIndex + boardMargin * 2,
          zIndex: 10
        }}
      />
    );
  }
}
