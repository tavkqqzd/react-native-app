import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Button } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getQuestions, sumbitAnswer, getGameAndUserDetail } from "../../Services/API";
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

  componentDidMount() {
    getQuestions(1)
      .then(res => {
        console.log("getQuestions", res.data);
        if (res.status === 200) {
          this.props.getQuestions(res.data);
          this.props.navigation.dispatch(QuestionAnswerPage);
        } else if (res.status === 404) {
          // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <View>
        <View style={QuestionAnswerStyle.AudioSection}>
          <View style={QuestionAnswerStyle.AudioImageAlignment}>
            <View style={QuestionAnswerStyle.AudioImageAlignment_BTM_Margin}>
              <Image
                source={{ uri: this.props.questions && this.props.questions.result[7].image }}
                style={{ height: 250, width: 250 }}
              />
            </View>
            <View style={QuestionAnswerStyle.AudioControlsAlignment}></View>
          </View>
          <View style={QuestionAnswerStyle.AudioViewRightView}>
            <View>
              <ButtonGradient
                title="Exit"
                // clickHandler={() => this.getQuestions(id)}
                color1={Colors.commonButtonGradient1}
                color2={Colors.commonButtonGradient2}
                buttonStyle={QuestionAnswerStyle.exitButton}
                buttonTextStyle={QuestionAnswerStyle.exitButtonText}
              />
            </View>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <ProgressCircle
                percent={30}
                radius={40}
                borderWidth={2}
                color="#1CACF4"
                shadowColor="#999"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18 }}>30%</Text>
              </ProgressCircle>
            </View>
            <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
              <View>
                <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
              </View>
              <View style={QuestionAnswerStyle.score}>
                <Text>+5</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", height: heightPercentageToDP("55%") }}>
          <View>
            <Text style={QuestionAnswerStyle.question}>
              {this.props.questions && this.props.questions.result[7].question}
            </Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[7].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={QuestionAnswerStyle.questionOptions}
              >
                <Text style={QuestionAnswerStyle.optionsText}>{k}</Text>
              </TouchableOpacity>
            ))}
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ButtonGradient
              title="Next"
              clickHandler={() =>
                this.submitAnswer(
                  id,
                  this.props.questions.result[8].question,
                  this.props.questions.result[8].queId,
                  this.state.selectedOption
                )
              }
              color1={Colors.commonButtonGradient1}
              color2={Colors.commonButtonGradient2}
              buttonStyle={QuestionAnswerStyle.nextButton}
              buttonTextStyle={QuestionAnswerStyle.exitButtonText}
            />
          </View>
        </View>

        <Modal
          isVisible={this.state.pdf}
          onBackdropPress={this.openPdf}
          modalType="pdfModal"
          style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
        >
          <TouchableOpacity onPress={() => this.openPdf()} style={QuestionAnswerStyle.AudioControls}>
            <Text style={QuestionAnswerStyle.AudioControlsText}>Close</Text>
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
    selectedGame: state.ClubReducer.selectedGame,
    questions: state.ClubReducer.questions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGameData: data => dispatch(actions.storeGameData(data)),
    getQuestions: data => dispatch(actions.getQuestions(data))
  };
};

const css = StyleSheet.create({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Testing);
