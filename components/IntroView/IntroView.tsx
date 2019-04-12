import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

interface Props {
  navigation: {
    navigate: (link: string) => void;
  };
}

export default class IntroView extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>RUN!!!11</Text>
        <Button
          title="Start"
          onPress={(): void => this.props.navigation.navigate("Game")}
        />
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
