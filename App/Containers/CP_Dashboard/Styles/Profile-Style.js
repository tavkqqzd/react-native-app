import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";
import Fonts from "../../../Themes/Fonts";

export const ProfileStyle = StyleSheet.create({
  profileActivity: { margin: 3 },
  basicProfileInfo: { flexDirection: "row", position: "relative", marginTop: 10, justifyContent: "center" },
  col6: {
    width: widthPercentageToDP("50%")
  },
  leaderBoardText: { fontFamily: Fonts.Fonts.CA_bold, color: Colors.black, fontSize: 16 },
  headerText: { textAlign: "center" },
  profileImage: { alignItems: "flex-end", marginRight: 20 },
  userImage: { position: "absolute", right: 20 },
  userImagePic: { width: 60, height: 60, borderRadius: 50 },
  userName: { fontSize: 17, color: Colors.black, fontFamily: Fonts.Fonts.CA_bold },
  clubId: { color: "#282828", opacity: 0.8, fontSize: 15, fontFamily: Fonts.Fonts.CA_book },
  changeClub: { color: "#15ABED", fontSize: 20, marginTop: 10, fontFamily: Fonts.Fonts.CA_bold },
  clubNameBox: {
    width: widthPercentageToDP("45%"),
    flexDirection: "row",
    backgroundColor: "#66C8EF",
    borderRadius: 10,
    padding: 10,
    marginRight: 5
  },
  totalScoreSection: {
    width: widthPercentageToDP("45%"),
    backgroundColor: "#717CFB",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    marginLeft: 5
  },
  clubLogo: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  clubName: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.Fonts.CA_book
  },
  violetBoxText: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: Fonts.Fonts.CA_book
  },
  leaderBoard: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.Fonts.CA_bold
  },
  leaderBoardButton: {
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 25,
    paddingBottom: 3
  },
  dollarImage: { height: 15, width: 15 },
  dollarImageAlignment: { marginRight: 5, paddingTop: 4 },
  row: { flexDirection: "row" },
  clubLogoImage: { width: "40%", justifyContent: "center", alignItems: "center" },
  clubNameText: { width: "60%", justifyContent: "center" },
  scoreBoard: { color: Colors.black, fontSize: 20, fontFamily: Fonts.Fonts.CA_book, paddingLeft: 10 },
  leaderBoardBookAlignment: {
    width: "35%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  book: {
    borderColor: Colors.black,
    borderRadius: 1,
    padding: 2,
    borderWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 10
  },
  randomColor: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "3%",
    height: 80
  },
  card: {
    flexDirection: "row",
    height: 80,
    shadowRadius: 5,
    margin: 10,
    shadowOpacity: 1.0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
    margin: 10,
    marginBottom: 5
  },
  leaderBoardCoinsAlignment: { width: "18%", justifyContent: "center" },
  leaderBoard_clickButton: {
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 10,
    position: "relative"
  },
  leaderBoardBUttonAlignment: { width: "100%" },
  w_100: { width: "100%" },
  leaderBoardGameNameAlignment: { flexDirection: "column", width: "100%", position: "relative" },
  leaderBoardGameName_Color: { width: "82%", flexDirection: "row" },
  leaderBoardCardScrollView: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    color: Colors.white,
    fontFamily: Fonts.Fonts.CA_bold,
    fontSize: 17
  },
  leaderBoardCardScrollViewButton: {
    marginLeft: 15,
    height: 30,
    width: 160,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});
