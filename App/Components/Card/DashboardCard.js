import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { randomColorGenerator } from "../Utils/RandomColorGenerator";
import colors from "../../Themes/Colors";
import { widthPercentageToDP } from "../Utils/PercentageToPixels";

class DashboardCard extends React.Component {
  render() {
    let { gameName, totalQuestions } = this.props;
    return (
      <LinearGradient
        useAngle={true}
        angle={90}
        colors={[randomColorGenerator(), randomColorGenerator()]}
        style={css.card}
      >
        {/* <View> */}
        <View style={css.gameName}>
          <Text style={css.gameNameText}>{gameName}</Text>
        </View>
        <View style={css.cardBottomRow}>
          <View style={css.questionSection}>
            <Text style={css.questionsText}>{totalQuestions} Questions</Text>
          </View>
          <View style={css.bottomButtonSection}>
            <View style={css.button}>
              <Text style={css.questionsText}>BOOK</Text>
            </View>
            <View style={css.button}>
              <Text style={css.questionsText}>PLAY</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </LinearGradient>
    );
  }
}

const css = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: 120,
    marginTop: 10,
    marginBottom: 10
  },
  cardBottomRow: {
    flexDirection: "row"
  },
  button: {
    borderRadius: 15,
    marginLeft: 10,
    padding: 10,
    borderColor: colors.white,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 90
  },
  gameName: { height: 60, padding: 10 },
  gameNameText: { fontWeight: "bold", fontSize: 24, color: colors.white },
  questionsText: { fontWeight: "bold", fontSize: 18, color: colors.white },
  cardBottomRow: { height: 60, flexDirection: "row", padding: 10 },
  questionSection: { width: widthPercentageToDP("40%"), justifyContent: "flex-end" },
  bottomButtonSection: { width: widthPercentageToDP("60"), flexDirection: "row" },
  headerText: { textAlign: "center" }
});

export default DashboardCard;
