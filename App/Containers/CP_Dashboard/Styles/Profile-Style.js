import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";

export const ProfileStyle = StyleSheet.create({
  profileActivity: { margin: 3 },
  basicProfileInfo: { flexDirection: "row", position: "relative", marginTop: 10, justifyContent: "center" },
  col6: {
    width: widthPercentageToDP("50%")
  },
  headerText: { textAlign: "center" },
  profileImage: { alignItems: "flex-end", marginRight: 20 },
  userImage: { position: "absolute", right: 20 },
  userImagePic: { width: 80, height: 80 },
  userName: { fontSize: 17, color: Colors.black },
  clubId: { color: "#282828", opacity: 0.8, fontSize: 15 },
  changeClub: { color: "#15ABED", fontSize: 20, marginTop: 10 },
  clubNameBox: {
    width: widthPercentageToDP("47%"),
    flexDirection: "row",
    backgroundColor: "#66C8EF",
    borderRadius: 10,
    padding: 10,
    marginRight: 5
  },
  totalScoreSection: {
    width: widthPercentageToDP("47%"),
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
    fontSize: 20
  },
  violetBoxText: {
    color: Colors.white,
    fontSize: 17
  },
  leaderBoard: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold"
  },
  leaderBoardButton: {
    borderColor: Colors.black,
    borderRadius: 1,
    padding: 2,
    borderWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3
  },
  dollarImage: { height: 15, width: 15 },
  dollarImageAlignment: { marginRight: 5, paddingTop: 4 },
  row: { flexDirection: "row" },
  clubLogoImage: { width: "40%", justifyContent: "center" },
  clubNameText: { width: "60%" },
  scoreBoard: { color: Colors.black, fontSize: 20 },
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
  leaderBoardCoinsAlignment: { width: "15%", justifyContent: "center" },
  leaderBoard_clickButton: {
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "55%",
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    position: "relative"
  },
  leaderBoardBUttonAlignment: { width: "100%", alignItems: "flex-end" },
  w_100: { width: "100%" },
  leaderBoardGameNameAlignment: { flexDirection: "column", width: "100%", position: "relative" },
  leaderBoardGameName_Color: { width: "50%", flexDirection: "row" }
});
