import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Button } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getQuestions, sumbitAnswer } from "../../Services/API";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { InstructionStyle } from "./Styles/Instruction-Style";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import ProgressCircle from "react-native-progress-circle";
import VideoPlayer from "react-native-video-controls";

import Pdf from "react-native-pdf";
import Modal from "react-native-modal";

class Testing extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {
    pdf: false
  };
  openPdf = () => {
    this.setState({ pdf: !this.state.pdf });
  };
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <TouchableOpacity onPress={() => this.openPdf()}>
          <Text>PDF</Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.pdf}
          onBackdropPress={this.openPdf}
          modalType="pdfModal"
          style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
        >
          <TouchableOpacity onPress={() => this.openPdf()}>
            <Text>close</Text>
          </TouchableOpacity>
          <Pdf
            source={{ uri: "https://cpatrivia.s3.amazonaws.com/gameAssets/samplePDF.pdf", cache: true }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            style={styles.pdf}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData,
    clubData: state.ClubReducer.clubData,
    selectedGame: state.ClubReducer.selectedGame
  };
};

const css = StyleSheet.create({});

export default connect(
  mapStateToProps,
  null
)(Testing);
