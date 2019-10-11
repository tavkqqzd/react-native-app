import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";

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
  coin: { width: 15, height: 15 },
  score: { marginLeft: 5 },
  question: { textAlign: "center", margin: 20 },
  questionOptions: {
    height: 40,
    width: widthPercentageToDP("80%"),
    marginBottom: 10,
    borderRadius: 25,
    borderColor: "#282828",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  optionsText: { color: "black" },
  exitButton: {
    height: 50,
    width: 90,
    borderRadius: 30
  },
  exitButtonText: {
    textAlign: "center",
    fontSize: 17,
    color: Colors.white
  },
  nextButton: {
    height: 50,
    width: widthPercentageToDP("80%"),
    marginBottom: 10,
    borderRadius: 25,
    borderColor: "#282828",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
