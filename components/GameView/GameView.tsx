import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

export default class GameView extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>TU BEDZIE GRA</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  }
});
