import React from "react";

import { Text, View, Button } from "react-native";

class App extends React.Component {
  render() {
    console.log("props", this.props);
    return (
      <View>
        <Text>App Page</Text>
        <Button onPress={() => this.props.navigation.dispatch(navigateToDemo)} title="Navigate To Demo Page"></Button>
      </View>
    );
  }
}

export default App;
