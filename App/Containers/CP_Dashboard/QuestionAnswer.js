import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
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
import Modal from "react-native-modal";
import Pdf from "react-native-pdf";

Sound.setCategory("Playback");

var whoosh = new Sound("https://cpatrivia.s3.amazonaws.com/gameAssets/WhatsApp+Audio.mp3", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
  console.log("duration in seconds: " + whoosh.getDuration() + "number of channels: " + whoosh.getNumberOfChannels());
});

const CorrectAnswerPage = index =>
  NavigationActions.navigate({
    routeName: "CorrectAnswer",
    action: NavigationActions.navigate({ routeName: "CorrectAnswer" }),
    params: index
  });

const WrongAnswerPage = index =>
  NavigationActions.navigate({
    routeName: "WrongAnswer",
    action: NavigationActions.navigate({ routeName: "WrongAnswer" }),
    params: index
  });

class QuestionAnswer extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = { selectedOption: "", pdf: false };

  submitAnswer = (id, question, qId, selectedAnswer) => {
    let { questionIndex } = this.props;
    let { remainingQuestions, totalQuestions } = this.props.selectedGame;
    let obj = [
      {
        gameId: id,
        question: question,
        queId: qId,
        playerId: this.props.userData.playerId,
        selectedAnswer: selectedAnswer
      }
    ];
    if (this.props.questions.result[questionIndex].correctAnswer === this.state.selectedOption) {
      sumbitAnswer(obj)
        .then(res => {
          if (res.status === 200) {
            this.props.navigation.dispatch(CorrectAnswerPage(questionIndex));
          } else if (res.status === 404) {
            console.log("404");
          } else if (res.status === 500) {
            console.log("500");
          }
        })
        .catch(err => {
          console.log("catch err", err);
        });
    } else if (this.props.questions.result[questionIndex].correctAnswer !== this.state.selectedOption) {
      sumbitAnswer(obj)
        .then(res => {
          if (res.status === 401) {
            this.props.navigation.dispatch(WrongAnswerPage(questionIndex));
          }
        })
        .catch(err => {
          console.log("catch err", err);
        });
    }
  };

  openPdf = () => {
    this.setState({ pdf: !this.state.pdf });
  };

  selectedOptionFn = ans => {
    this.setState({ selectedOption: ans });
  };

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

  mediaType2 = QuestionIndex => {
    let { id } = this.props.selectedGame;
    return (
      <View>
        <View style={{ flexDirection: "row", height: heightPercentageToDP("45%") }}>
          <View style={{ width: widthPercentageToDP("75%"), padding: 5 }}>
            <VideoPlayer
              source={{ uri: "https://cpatrivia.s3.amazonaws.com/gameAssets/sampleVideo.mp4" }}
              toggleResizeModeOnFullscreen={true}
              navigator={this.props.navigator}
              paused={false}
              repeat={false}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP("25%"),
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
          >
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
            <Text style={QuestionAnswerStyle.question}>{this.props.questions.result[QuestionIndex].question}</Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[QuestionIndex].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={
                  this.state.selectedOption === k
                    ? QuestionAnswerStyle.questionOptionsSelected
                    : QuestionAnswerStyle.questionOptions
                }
              >
                <Text
                  style={
                    this.state.selectedOption === k
                      ? QuestionAnswerStyle.optionsTextSelected
                      : QuestionAnswerStyle.optionsText
                  }
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ButtonGradient
              title="Next"
              clickHandler={() =>
                this.submitAnswer(
                  id,
                  this.props.questions.result[QuestionIndex].question,
                  this.props.questions.result[QuestionIndex].queId,
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
      </View>
    );
  };

  mediaType1 = QuestionIndex => {
    let { id } = this.props.selectedGame;
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
            <Text style={QuestionAnswerStyle.question}>{this.props.questions.result[QuestionIndex].question}</Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[QuestionIndex].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={
                  this.state.selectedOption === k
                    ? QuestionAnswerStyle.questionOptionsSelected
                    : QuestionAnswerStyle.questionOptions
                }
              >
                <Text
                  style={
                    this.state.selectedOption === k
                      ? QuestionAnswerStyle.optionsTextSelected
                      : QuestionAnswerStyle.optionsText
                  }
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ButtonGradient
              title="Next"
              clickHandler={() =>
                this.submitAnswer(
                  id,
                  this.props.questions.result[QuestionIndex].question,
                  this.props.questions.result[QuestionIndex].queId,
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
      </View>
    );
  };

  mediaType3 = QuestionIndex => {
    let { id } = this.props.selectedGame;
    return (
      <View>
        <View style={QuestionAnswerStyle.AudioSection}>
          <View style={QuestionAnswerStyle.AudioImageAlignment}>
            <View style={QuestionAnswerStyle.AudioImageAlignment_BTM_Margin}>
              <Image source={images.pdf} style={QuestionAnswerStyle.AudioImage} />
            </View>
            <View style={QuestionAnswerStyle.AudioControlsAlignment}>
              <TouchableOpacity onPress={() => this.openPdf()} style={QuestionAnswerStyle.AudioControls}>
                <Text style={QuestionAnswerStyle.AudioControlsText}>Open PDF</Text>
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
              {this.props.questions && this.props.questions.result[QuestionIndex].question}
            </Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[QuestionIndex].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={
                  this.state.selectedOption === k
                    ? QuestionAnswerStyle.questionOptionsSelected
                    : QuestionAnswerStyle.questionOptions
                }
              >
                <Text
                  style={
                    this.state.selectedOption === k
                      ? QuestionAnswerStyle.optionsTextSelected
                      : QuestionAnswerStyle.optionsText
                  }
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ButtonGradient
              title="Next"
              clickHandler={() =>
                this.submitAnswer(
                  id,
                  this.props.questions.result[QuestionIndex].question,
                  this.props.questions.result[QuestionIndex].queId,
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
  };

  mediaWithImage = QuestionIndex => {
    let { id } = this.props.selectedGame;
    return (
      <View>
        <View style={QuestionAnswerStyle.AudioSection}>
          <View style={QuestionAnswerStyle.AudioImageAlignment}>
            <View style={QuestionAnswerStyle.AudioImageAlignment_BTM_Margin}>
              <Image
                source={{ uri: this.props.questions && this.props.questions.result[QuestionIndex].image }}
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
              {this.props.questions && this.props.questions.result[QuestionIndex].question}
            </Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[QuestionIndex].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={
                  this.state.selectedOption === k
                    ? QuestionAnswerStyle.questionOptionsSelected
                    : QuestionAnswerStyle.questionOptions
                }
              >
                <Text
                  style={
                    this.state.selectedOption === k
                      ? QuestionAnswerStyle.optionsTextSelected
                      : QuestionAnswerStyle.optionsText
                  }
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ButtonGradient
              title="Next"
              clickHandler={() =>
                this.submitAnswer(
                  id,
                  this.props.questions.result[QuestionIndex].question,
                  this.props.questions.result[QuestionIndex].queId,
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
      </View>
    );
  };

  regularQuestionAnswer = QuestionIndex => {
    let { id } = this.props.selectedGame;
    return (
      <View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", margin: 20 }}>
          <ButtonGradient
            title="Exit"
            // clickHandler={() => this.getQuestions(id)}
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={QuestionAnswerStyle.exitButton}
            buttonTextStyle={QuestionAnswerStyle.exitButtonText}
          />
        </View>
        <View style={InstructionStyle.instructionIntent}>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <ProgressCircle percent={30} radius={40} borderWidth={2} color="#1CACF4" shadowColor="#999" bgColor="#fff">
              <Text style={{ fontSize: 18 }}>{"30%"}</Text>
            </ProgressCircle>
          </View>
          <View style={QuestionAnswerStyle.coinAlignment}>
            <View>
              <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
            </View>
            <View style={QuestionAnswerStyle.score}>
              <Text>+5</Text>
            </View>
          </View>
          <View>
            <Text style={QuestionAnswerStyle.question}>
              {this.props.questions && this.props.questions.result[QuestionIndex].question}
            </Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[QuestionIndex].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={
                  this.state.selectedOption === k
                    ? QuestionAnswerStyle.questionOptionsSelected
                    : QuestionAnswerStyle.questionOptions
                }
              >
                <Text
                  style={
                    this.state.selectedOption === k
                      ? QuestionAnswerStyle.optionsTextSelected
                      : QuestionAnswerStyle.optionsText
                  }
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={{ bottom: 200, alignItems: "center" }}>
          <ButtonGradient
            title="Next"
            clickHandler={() =>
              this.submitAnswer(
                id,
                this.props.questions.result[QuestionIndex].question,
                this.props.questions.result[QuestionIndex].queId,
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
    );
  };

  renderTypeOfQuestion = QuestionIndex => {
    let display = "";
    if (this.props.questions && this.props.questions.result[QuestionIndex].mediaType === 2) {
      display = this.mediaType2(QuestionIndex);
    } else if (this.props.questions && this.props.questions.result[QuestionIndex].mediaType === 1) {
      display = this.mediaType1(QuestionIndex);
    } else if (this.props.questions && this.props.questions.result[QuestionIndex].mediaType === 3) {
      display = this.mediaType3(QuestionIndex);
    } else if (
      this.props.questions.result[QuestionIndex].questionType === 2 &&
      this.props.questions.result[QuestionIndex].mediaType === 0
    ) {
      display = this.regularQuestionAnswer(QuestionIndex);
    } else if (this.props.questions && this.props.questions.result[QuestionIndex].mediaType === 0) {
      display = this.mediaWithImage(QuestionIndex);
    }
    return display;
  };

  render() {
    let QuestionIndex = this.props && this.props.questionIndex;
    console.log("render index", this.props.questionIndex);
    return this.renderTypeOfQuestion(QuestionIndex);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIndexOfQuestion: index => dispatch(actions.indexOfQuestion(index))
  };
};

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
    questions: state.ClubReducer.questions,
    selectedGame: state.ClubReducer.selectedGame,
    userData: state.ClubReducer.userData,
    questionIndex: state.ClubReducer.indexOfQuestion
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionAnswer);
