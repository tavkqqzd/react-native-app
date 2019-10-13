import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
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
var Sound = require("react-native-sound");

Sound.setCategory("Playback");

var whoosh = new Sound("https://cpatrivia.s3.amazonaws.com/gameAssets/WhatsApp+Audio.mp3", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
  console.log("duration in seconds: " + whoosh.getDuration() + "number of channels: " + whoosh.getNumberOfChannels());
});

class Testing extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {
    countDown: 0,
    intervalId: "",
    timer: "",
    paused: false
  };
  showVideo = () => {
    this.setState({
      show: !this.state.show,
      width: widthPercentageToDP("100%"),
      height: heightPercentageToDP("80%")
    });
  };
  timer = () => {
    if (!this.state.paused) {
      this.setState({
        countDown: this.state.countDown + 1
      });
      if (this.state.countDown === 12) {
        this.setState(
          {
            countDown: 0
          },
          () => {
            clearInterval(this.intervalId);
          }
        );
      }
    }
  };

  componentWillUnmount() {
    this.backHandler.remove();
    clearInterval(this.intervalId);
  }

  playSound = () => {
    whoosh.play(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
  };

  pauseSound = () => {
    whoosh.pause(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
  };

  resetSound = () => {
    whoosh.stop(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
        whoosh.play(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
  };

  render() {
    return (
      <View>
        <View style={QuestionAnswerStyle.AudioSection}>
          <View style={QuestionAnswerStyle.AudioImageAlignment}>
            <View style={QuestionAnswerStyle.AudioImageAlignment_BTM_Margin}>
              <Image source={images.audio} style={QuestionAnswerStyle.AudioImage} />
            </View>
            <View style={QuestionAnswerStyle.AudioControlsAlignment}>
              <TouchableOpacity onPress={() => this.playSound()} style={QuestionAnswerStyle.AudioControls}>
                <Text style={QuestionAnswerStyle.AudioControlsText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pauseSound()} style={QuestionAnswerStyle.AudioControls}>
                <Text style={QuestionAnswerStyle.AudioControlsText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.resetSound()} style={QuestionAnswerStyle.AudioControls}>
                <Text style={QuestionAnswerStyle.AudioControlsText}>Repeat</Text>
              </TouchableOpacity>
            </View>
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
                <Text style={{ fontSize: 18 }}>{"30%"}</Text>
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
            <Text style={QuestionAnswerStyle.question}>asdad</Text>
          </View>
          {/* {!!this.props.questions &&
            this.props.questions.result[QuestionIndex].options.map((k, i) => ( */}
          <TouchableOpacity
            // key={i}
            // onPress={() => this.selectedOptionFn(k)}
            style={QuestionAnswerStyle.questionOptions}
          >
            <Text style={QuestionAnswerStyle.optionsText}>asdas</Text>
          </TouchableOpacity>
          {/* ))} */}

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ButtonGradient
              title="Next"
              // clickHandler={() =>
              //   this.submitAnswer(
              //     id,
              //     this.props.questions.result[QuestionIndex].question,
              //     this.props.questions.result[QuestionIndex].queId,
              //     this.state.selectedOption
              //   )
              // }
              color1={Colors.commonButtonGradient1}
              color2={Colors.commonButtonGradient2}
              buttonStyle={QuestionAnswerStyle.nextButton}
              buttonTextStyle={QuestionAnswerStyle.exitButtonText}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
