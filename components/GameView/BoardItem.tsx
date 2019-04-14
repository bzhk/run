import React, { Component } from "react";
import { Image } from "react-native";
const drink: any = require("../assets/drink.png");
const enemy: any = require("../assets/enemy.png");
const xImg: any = require("../assets/X.png");
interface Props {
  rIndex: number;
  cIndex: number;
  cellWidth: number;
  boardMargin: number;
  label: string;
}
interface State {}
export default class BoardItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { rIndex, cIndex, cellWidth, boardMargin, label } = this.props;
    let img = drink;
    switch (label) {
      case "D":
        img = drink;
        break;
      case "Z":
        img = enemy;
        break;
      case "X":
        img = xImg;
        break;
    }
    return (
      <Image
        source={img}
        style={{
          width: cellWidth,
          height: cellWidth,
          zIndex: 10,
          position: "absolute",
          left: cellWidth * cIndex + boardMargin,
          top: cellWidth * rIndex + boardMargin * 2
        }}
      />
    );
  }
}
