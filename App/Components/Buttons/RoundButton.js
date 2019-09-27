import React from "react";
import { NavigationActions } from "react-navigation";
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Button } from "react-native";
import colors from "../../Themes/Colors";
import image from "../../Themes/Images";
import Metrics from "../../Themes/Metrics";
import * as ActivityStyles from "../../Themes/ActivityStyles";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";

class RoundedButton extends React.Component {
  state = {};

  render() {
    return (
      <View style={[css.button, this.props.styleProps]}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.nav(this.props.onClickHandler, this.props.toggleModal);
          }}
        >
          <Text style={css.buttonText}>{this.props.title}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const css = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.gradientViolet
  }
});

export default RoundedButton;
