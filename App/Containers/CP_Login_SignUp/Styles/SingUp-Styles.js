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
  countryPicker: {
    marginTop: 35
  },
  inputContainer: {
    position: "relative"
  },
  submitButton: {
    position: "absolute",
    right: 0,
    top: 0
  },
  isEmployee: {
    position: "relative",
    marginTop: 30
  },
  signUpButton: {
    height: 50,
    marginTop: 30,
    marginBottom: 35,
    borderRadius: 30
  }
});
