import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP } from "../../../Components/Utils/PercentageToPixels";

export const SignUpStyles = StyleSheet.create({
  enterClubId: {
    fontSize: 24,
    color: Colors.gradientViolet
  },
  clubIdInput: {
    marginTop: 20,
    marginBottom: 30
  },
  inputBox: {
    width: widthPercentageToDP("80%"),
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    height: 48,
    paddingLeft: 40,
    fontSize: 18
  },
  signUpPageActivity: {
    margin: metrics.section
  },
  inputContainer: {
    position: "relative"
  },
  submitButton: {
    position: "absolute",
    right: 0,
    top: 0
  }
});
