import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

const ButtonGradient = props => {
  const Svg = props.svg ? props.svg.default : "";
  return (
    <TouchableOpacity onPress={props.clickHandler} activeOpacity={0.8}>
      <LinearGradient useAngle={true} angle={89} colors={[props.color1, props.color2]} style={props.buttonStyle}>
        <View style={ButtonGradientStyles.mainButtonStyle}>
          {props.title ? (
            <View>
              <Text style={props.buttonTextStyle}>{props.title}</Text>
            </View>
          ) : (
            <Text />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const ButtonGradientStyles = StyleSheet.create({
  mainButtonStyle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  icon: {
    position: "absolute",
    left: 30,
    top: 15
  }
});

export default ButtonGradient;
