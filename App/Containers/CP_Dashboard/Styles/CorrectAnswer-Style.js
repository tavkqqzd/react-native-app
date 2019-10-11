import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../Themes/Colors";
// import fonts from "../../Themes/Fonts";

let spacingBetweenEl = Math.round(Dimensions.get("window").width) > 550 ? 15 : 12;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textBelowLogo: {
    paddingTop: spacingBetweenEl,
    paddingBottom: spacingBetweenEl,
    color: colors.blue,
    fontSize: 16
    // fontFamily: fonts.CA_book
  },
  suggestion: {
    color: colors.blue,
    fontSize: 16,
    paddingBottom: 12
    // fontFamily: fonts.CA_book
  },
  correctAnswer: {
    flexDirection: "row",
    fontSize: 15
    // fontFamily: fonts.medium
  },
  correctAnswerSubText: {
    paddingLeft: 4,
    fontSize: 15,
    color: colors.red
    // fontFamily: fonts.CA_book
  },
  correctAnswerText: {
    fontSize: 15,
    color: colors.black
    // fontFamily: fonts.CA_book
  },
  score: {
    fontSize: 16,
    // color: colors.black,
    paddingBottom: 20,
    borderRadius: 20,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: colors.coinButtonBorder
  },
  totalPoints: {
    paddingTop: 20,
    fontSize: 20,
    color: colors.darkBlue
    // fontFamily: fonts.CA_book
  },
  answerSection: {
    paddingTop: 16,
    paddingBottom: 20
  },
  coin: {
    marginRight: 8
  }
});
