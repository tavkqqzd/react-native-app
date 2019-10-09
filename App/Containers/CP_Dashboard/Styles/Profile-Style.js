import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";

export const ProfileStyle = StyleSheet.create({
  profileActivity: { margin: 0 },
  basicProfileInfo: { flexDirection: "row", position: "relative", marginTop: 10 },
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
    width: widthPercentageToDP("50%"),
    flexDirection: "row",
    backgroundColor: "#66C8EF",
    borderRadius: 10
  },
  totalScoreSection: {
    width: widthPercentageToDP("50%"),
    backgroundColor: "#717CFB",
    borderRadius: 10,
    alignItems: "center"
  }
});
