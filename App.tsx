import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import IntroView from "./components/IntroView/IntroView";
import GameView from "./components/GameView/GameView";
const AppNavigator = createStackNavigator({
  Home: {
    screen: IntroView
  },
  Game: {
    screen: GameView
  }
});

const AppContainer = createAppContainer(AppNavigator);

interface Props {}

export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}
