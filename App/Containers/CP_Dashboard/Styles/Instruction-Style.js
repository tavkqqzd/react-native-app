import { StyleSheet } from "react-native";
import metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import { widthPercentageToDP, heightPercentageToDP } from "../../../Components/Utils/PercentageToPixels";
import Fonts from "../../../Themes/Fonts";

export const InstructionStyle = StyleSheet.create({
  CP_banner: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 35,
    marginRight: 35,
    borderWidth: 2,
    paddingBottom: 5,
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderBottomColor: "#747474"
  },
  CP_banner2: { fontSize: 17, color: "#282828", textAlign: "center", fontFamily: Fonts.Fonts.CA_book, opacity: 0.5 },
  gameInstructionAlignment: { marginBottom: 20 },
  gameInstructionText: { fontSize: 16, color: "#000", fontFamily: Fonts.Fonts.CA_book },
  DashboardCardModalText: { fontSize: 20, color: "#000", fontFamily: Fonts.Fonts.CA_bold, textAlign: "center" },
  gameInstruction: {
    fontSize: 17,
    color: "#282828",
    textAlign: "center",
    opacity: 0.8,
    fontFamily: Fonts.Fonts.CA_book
  },
  buttonAlignment: { position: "absolute", bottom: 100 },
  instructionIntent: {
    padding: 10,
    alignItems: "center",
    position: "relative",
    height: heightPercentageToDP("100%")
    // width: widthPercentageToDP("100%")
  },
  ModalButtons: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    height: 40,
    width: 80,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    justifyContent: "center",
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13
  },
  ImagePickerButtons: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    height: 40,
    width: 200,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    justifyContent: "center",
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13
  },
  ModalButtonText: {
    fontFamily: Fonts.CA_book,
    fontSize: 18,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.black
  }
});
