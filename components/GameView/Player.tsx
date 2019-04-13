import React, { Component } from "react";
import { Image, View, Button } from "react-native";
const hero: any = require("../assets/hero.png");
interface Props {
  getCords: () => any;
  rIndex: number;
  cIndex: number;
}
interface State {
  pX: number;
  pY: number;
  pWidth: number;
  pHeight: number;
  hAvatar: number;
}
export default class Player extends Component<Props, State> {
  private getCords: () => any;
  constructor(props: Props) {
    super(props);
    this.state = {
      pX: 0,
      pY: 0,
      pWidth: 0,
      pHeight: 0,
      hAvatar: 40
    };
    console.log(props);
    this.getCords = this.props.getCords;
  }

  componentDidMount() {
    const _player = this.getCords();
    _player.ref.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ): void => {
        console.log(py - height + (height - this.state.hAvatar) / 2);
        console.log(
          `${py} - ${height} + (${height} - ${this.state.hAvatar}) / 2`
        );

        this.setState({
          pX: px,
          pY: py - this.state.hAvatar * 2,
          pWidth: width,
          pHeight: height
        });
      }
    );
  }

  render() {
    const { pX, pY, pWidth, hAvatar } = this.state;
    console.log(pX, pY, pWidth, hAvatar);
    return (
      <Image
        source={hero}
        style={{
          width: pWidth,
          height: hAvatar,
          position: "absolute",
          left: pX,
          top: pY,
          zIndex: 10,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "red"
        }}
      />
    );
  }
}
