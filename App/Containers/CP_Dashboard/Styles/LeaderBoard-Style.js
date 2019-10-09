import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";

export const LeaderBoardStyle = StyleSheet.create({
  userName: { width: "50%", justifyContent: "center", alignItems: "flex-start", flexDirection: "row" },
  userScore: { width: "50%", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10 },
  row: {
    flexDirection: "row",
    height: 50,
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
    height: 50
  },
  playerName: { width: "95%" },
  playerNameText: { padding: 10 }
});
