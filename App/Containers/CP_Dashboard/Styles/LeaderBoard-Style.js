import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";
import Fonts from "../../../Themes/Fonts";

export const LeaderBoardStyle = StyleSheet.create({
  userName: { width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "row" },
  userScore: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    flexDirection: "row"
  },
  row: {
    flexDirection: "row",
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    margin: 10,
    marginBottom: 5
  },
  randomColor: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "3%",
    height: 80
  },
  playerName: { width: "95%" },
  playerNameText: {
    padding: 10,
    marginLeft: 10,
    fontSize: 17,
    color: "#282828",
    opacity: 0.8,
    fontFamily: Fonts.Fonts.CA_book
  },
  coins: { height: 15, width: 15, marginRight: 5 },
  coinAlignment: { paddingBottom: 0 },
  score: { color: Colors.black, fontFamily: Fonts.Fonts.CA_book, fontSize: 16 }
});
