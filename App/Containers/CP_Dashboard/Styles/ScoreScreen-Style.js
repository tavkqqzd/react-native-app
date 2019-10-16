import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP, heightPercentageToDP } from "../../../Components/Utils/PercentageToPixels";
import Fonts from "../../../Themes/Fonts";

export const ScoreStyles = StyleSheet.create({
  ScoreScreenActivity: {
    height: heightPercentageToDP("35%"),
    justifyContent: "space-evenly"
  },
  coins: { margin: 15 },
  GameDetails: { alignItems: "center", height: heightPercentageToDP("65%") },
  LeaderBoard: {
    height: 50,
    width: widthPercentageToDP("30%"),
    marginBottom: 20,
    borderRadius: 25,
    borderColor: "#282828",
    justifyContent: "center",
    alignItems: "center"
  },
  editButton: {
    height: 50,
    width: widthPercentageToDP("30%"),
    marginTop: 50,
    borderRadius: 25,
    borderColor: "#282828",
    justifyContent: "center",
    alignItems: "center"
  },
  LeaderBoardButtonText: {
    textAlign: "center",
    fontSize: 17,
    color: Colors.white,
    fontFamily: Fonts.Fonts.CA_book
  },
  UserImage: { height: 150, width: 150, marginTop: 15 },
  GameName: { fontSize: 24, color: "#fff", fontFamily: Fonts.Fonts.CA_bold },
  AlignCenter: { alignItems: "center" },
  Player_ClubInfo: { alignItems: "center", height: heightPercentageToDP("15%") },
  PlayerNameAlignment: { paddingTop: 10 },
  PlayerNameText: { fontSize: 18, color: "#000", fontFamily: Fonts.Fonts.CA_book },
  ClubNameText: { fontSize: 14, color: "#000", fontFamily: Fonts.Fonts.CA_book },
  MoreGames: {
    backgroundColor: Colors.commonButtonGradient2,
    height: 50,
    width: widthPercentageToDP("90%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  PointsEarnedText: { fontSize: 20, color: "#000", fontFamily: Fonts.Fonts.CA_book },
  WhiteScreen: {
    alignItems: "center",
    height: heightPercentageToDP("45%"),
    justifyContent: "flex-end"
  }
});
