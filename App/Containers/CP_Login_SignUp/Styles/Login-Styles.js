import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import Fonts from "../../../Themes/Fonts";

export const LoginStyles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: Fonts.Fonts.CA_bold,
    marginBottom: metrics.section
  },
  signInContent: {
    justifyContent: "space-evenly"
  },
  loginActivity: {
    margin: metrics.section
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
    fontFamily: Fonts.Fonts.CA_book
  },
  inputPhoneNumber: {
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 2,
    marginBottom: 10
  },
  transparent: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 2,
    marginBottom: 6,
    position: "relative"
  },
  MatUI_Text_Field: {
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 2,
    fontFamily: Fonts.Fonts.CA_book
  },
  loginButton: {
    height: 50,
    marginTop: 50,
    marginBottom: 35,
    borderRadius: 30
  },
  loginButtonText: {
    fontSize: 17,
    color: Colors.white,
    fontFamily: Fonts.Fonts.CA_bold
  },
  signUpText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  signUp: {
    fontFamily: Fonts.Fonts.CA_book,
    color: Colors.gradientViolet,
    fontSize: 15
  },
  dontHaveAccount: {
    fontFamily: Fonts.Fonts.CA_book,
    fontSize: 15,
    color: Colors.black
  }
});
