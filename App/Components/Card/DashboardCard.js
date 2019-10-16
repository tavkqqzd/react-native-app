import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { randomColorGenerator } from "../Utils/RandomColorGenerator";
import colors from "../../Themes/Colors";
import { widthPercentageToDP } from "../Utils/PercentageToPixels";
import Fonts from "../../Themes/Fonts";
import Modal from "../Modal/Modal";
import { restartGame } from "../../Services/API";

class DashboardCard extends React.Component {
  gameStatusDisplay = () => {
    let { isGamePlayed } = this.props.gameData;
    if (isGamePlayed === 2) {
      return "Restart";
    } else if (isGamePlayed === 0) {
      return "Start Now";
    } else if (isGamePlayed === 1) {
      return "Resume";
    }
  };

  clikHandler = () => {
    let { isGamePlayed } = this.props.gameData;
    let { onClickHandler } = this.props;
    if (isGamePlayed === 2) {
    }
  };

  render() {
    let { gameName, totalQuestions, onClickHandler } = this.props;
    return (
      <LinearGradient
        useAngle={true}
        angle={90}
        colors={[randomColorGenerator(), randomColorGenerator()]}
        style={css.card}
      >
        <View style={css.gameName}>
          <Text style={css.gameNameText}>{gameName}</Text>
        </View>
        <View style={css.cardBottomRow}>
          <View style={css.questionSection}>
            <Text style={css.questionsText}>{totalQuestions} Questions</Text>
          </View>
          <View style={css.bottomButtonSection}>
            <TouchableOpacity style={css.button} onPress={this.clikHandler}>
              <Text style={css.questionsText}>{this.gameStatusDisplay()}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  gameNameText: { fontSize: 24, color: colors.white, fontFamily: Fonts.Fonts.CA_bold },
  questionsText: { fontSize: 18, color: colors.white, fontFamily: Fonts.Fonts.CA_bold },
  cardBottomRow: { height: 60, flexDirection: "row", padding: 10 },
  questionSection: { width: widthPercentageToDP("40%"), justifyContent: "flex-end" },
  bottomButtonSection: { width: widthPercentageToDP("50%"), flexDirection: "row", justifyContent: "flex-end" },
  headerText: { textAlign: "center" }
});

export default DashboardCard;
