import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";

export const LoginStyles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: "center",
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
    marginBottom: 5
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
    borderBottomWidth: 2
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
    fontWeight: "bold"
  },
  signUpText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  signUp: {
    color: Colors.gradientViolet
  }
});
