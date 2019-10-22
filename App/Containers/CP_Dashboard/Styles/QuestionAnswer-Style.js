import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP, heightPercentageToDP } from "../../../Components/Utils/PercentageToPixels";
import Fonts from "../../../Themes/Fonts";

export const QuestionAnswerStyle = StyleSheet.create({
  coinAlignment: {
    flexDirection: "row",
    borderRadius: 25,
    height: 30,
    borderWidth: 1,
    borderColor: "#FFCC33",
    padding: 5,
    width: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  coinAlignmentVideoScreen: {
    flexDirection: "row",
    borderRadius: 25,
    height: 30,
    borderWidth: 1,
    borderColor: "#FFCC33",
    padding: 5,
    width: 70,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  coin: { width: 15, height: 15 },
  score: { marginLeft: 5 },
  question: { textAlign: "center", margin: 20, fontFamily: Fonts.Fonts.CA_book },
  questionOptions: {
    // height: 40,
    width: widthPercentageToDP("80%"),
    marginBottom: 10,
    borderRadius: 25,
    borderColor: "#9a9a9a",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  questionOptionsSelected: {
    // height: 40,
    width: widthPercentageToDP("80%"),
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: Colors.commonButtonGradient2,
    justifyContent: "center",
    alignItems: "center"
  },
  optionsText: {
    color: "black",
    fontFamily: Fonts.Fonts.CA_book,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  optionsTextSelected: {
    color: "white",
    fontFamily: Fonts.Fonts.CA_bold,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  exitButton: {
    height: 50,
    width: 90,
    borderRadius: 30
  },
  exitButtonText: {
    textAlign: "center",
    fontSize: 17,
    color: Colors.white,
    fontFamily: Fonts.Fonts.CA_bold
  },
  nextButton: {
    height: 50,
    width: widthPercentageToDP("80%"),
    marginBottom: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  nextWrongCorrectButton: {
    height: 50,
    width: widthPercentageToDP("80%"),
    marginTop: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  // audio component
  AudioImageAlignment: {
    width: widthPercentageToDP("75%"),
    padding: 5,
    justifyContent: "center"
  },
  AudioImageAlignment_BTM_Margin: { alignItems: "center", marginBottom: 20 },
  AudioImage: { height: 160, width: 160 },
  AudioSection: { flexDirection: "row", height: heightPercentageToDP("45%") },
  AudioControlsAlignment: { justifyContent: "center", alignItems: "center", flexDirection: "row" },
  AudioControls: { backgroundColor: "#22A9D4", margin: 5, width: 80, alignItems: "center" },
  AudioControlsText: { color: "#fff", fontWeight: "bold", padding: 5 },
  AudioViewRightView: {
    width: widthPercentageToDP("25%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});
