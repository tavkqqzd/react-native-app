import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
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
import { ScrollView } from "react-native-gesture-handler";
import { NavigationEvents } from "react-navigation";

Sound.setCategory("Playback");

const CorrectAnswerPage = index =>
  NavigationActions.navigate({
    routeName: "CorrectAnswer",
    action: NavigationActions.navigate({ routeName: "CorrectAnswer" }),
    params: index
  });

const NavigateToDashboard = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

const WrongAnswerPage = index =>
  NavigationActions.navigate({
    routeName: "WrongAnswer",
    action: NavigationActions.navigate({ routeName: "WrongAnswer" }),
    params: index
  });

class QuestionAnswer extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = { selectedOption: "", pdf: false, modal: false, audioToRender: "", whoosh: "" };

  audioToRenderFn = index => {
    if (this.props.questions && this.props.questions.result[index].mediaType === 1) {
      var whoosh = new Sound(this.props.questions.result[index].image, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
      });

      this.setState({ whoosh: whoosh });
    }
  };

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
      // this.props.addScore(this.props.questions.result[questionIndex].score);
      sumbitAnswer(obj)
        .then(res => {
          console.log("correct answer", res);
          if (res.status === 200) {
            this.props.addScore(res.data.currentScore);
            this.props.navigation.dispatch(CorrectAnswerPage(questionIndex));
            this.setState({ selectedOption: null });
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
      this.props.correctAnswer(this.props.questions.result[questionIndex].correctAnswer);
      sumbitAnswer(obj)
        .then(res => {
          console.log("wrong answer", res);
          if (res.status === 401) {
            this.setState({ selectedOption: null });
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

  openModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  selectedOptionFn = ans => {
    this.setState({ selectedOption: ans });
  };

  playSound = () => {
    this.state.whoosh &&
      this.state.whoosh.play(success => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
  };

  pauseSound = () => {
    this.state.whoosh &&
      this.state.whoosh.pause(success => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
  };

  resetSound = () => {
    this.state.whoosh &&
      this.state.whoosh.stop(success => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
    this.state.whoosh &&
      this.state.whoosh.play(success => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
  };

  // media type for video
  mediaType2 = QuestionIndex => {
    let { id, totalQuestions, instruction } = this.props.selectedGame;
    return (
      <ScrollView>
        <View style={{ flexDirection: "row", height: heightPercentageToDP("45%") }}>
          <View style={{ width: widthPercentageToDP("75%"), padding: 5 }}>
            <VideoPlayer
              source={{ uri: this.props.questions.result[QuestionIndex].image }}
              // source={{ uri: "https://www.youtube.com/watch?v=4fndeDfaWCg" }}
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
                clickHandler={() => this.props.navigation.dispatch(NavigateToDashboard)}
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
                <Text style={{ fontSize: 18, fontFamily: Fonts.Fonts.CA_book }}>
                  {QuestionIndex + 1} of {totalQuestions}
                </Text>
              </ProgressCircle>
            </View>
            <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
              <View>
                <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
              </View>
              <View style={QuestionAnswerStyle.score}>
                <Text style={{ fontFamily: Fonts.Fonts.CA_book }}>
                  +{this.props.questions.result[QuestionIndex].score}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 0, marginTop: 25 }}>
              <TouchableOpacity onPress={() => this.openModal()}>
                <Image source={images.ic_info} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
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
        <Modal
          isVisible={this.state.modal}
          onBackdropPress={this.openModal}
          style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
        >
          <ScrollView>
            <TouchableOpacity onPress={() => this.openModal()} style={QuestionAnswerStyle.AudioControls}>
              <Text style={QuestionAnswerStyle.AudioControlsText}>Close</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <View style={InstructionStyle.gameInstructionAlignment}>
                <Text style={InstructionStyle.gameInstructionText}>Instruction for game</Text>
              </View>
              <View>
                <Text>{instruction}</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  };

  // media type for audio
  mediaType1 = QuestionIndex => {
    let { id, totalQuestions, instruction } = this.props.selectedGame;
    return (
      <ScrollView>
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
                clickHandler={() => this.props.navigation.dispatch(NavigateToDashboard)}
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
                <Text style={{ fontSize: 18, fontFamily: Fonts.Fonts.CA_book }}>
                  {QuestionIndex + 1} of {totalQuestions}
                </Text>
              </ProgressCircle>
            </View>
            <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
              <View>
                <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
              </View>
              <View style={QuestionAnswerStyle.score}>
                <Text style={{ fontFamily: Fonts.Fonts.CA_book }}>
                  +{this.props.questions.result[QuestionIndex].score}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 0, marginTop: 25 }}>
              <TouchableOpacity onPress={() => this.openModal()}>
                <Image source={images.ic_info} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
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
        <Modal
          isVisible={this.state.modal}
          onBackdropPress={this.openModal}
          style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
        >
          <ScrollView>
            <TouchableOpacity onPress={() => this.openModal()} style={QuestionAnswerStyle.AudioControls}>
              <Text style={QuestionAnswerStyle.AudioControlsText}>Close</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <View style={InstructionStyle.gameInstructionAlignment}>
                <Text style={InstructionStyle.gameInstructionText}>Instruction for game</Text>
              </View>
              <View>
                <Text>{instruction}</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
        <NavigationEvents
          onWillFocus={payload => {
            this.audioToRenderFn(this.props.questionIndex);
          }}
        />
      </ScrollView>
    );
  };

  // media type for pdf
  mediaType3 = QuestionIndex => {
    let { id, totalQuestions, instruction } = this.props.selectedGame;
    return (
      <ScrollView>
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
                clickHandler={() => this.props.navigation.dispatch(NavigateToDashboard)}
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
                <Text style={{ fontSize: 18, fontFamily: Fonts.Fonts.CA_book }}>
                  {QuestionIndex + 1} of {totalQuestions}
                </Text>
              </ProgressCircle>
            </View>
            <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
              <View>
                <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
              </View>
              <View style={QuestionAnswerStyle.score}>
                <Text style={{ fontFamily: Fonts.Fonts.CA_book }}>
                  +{this.props.questions.result[QuestionIndex].score}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 0, marginTop: 25 }}>
              <TouchableOpacity onPress={() => this.openModal()}>
                <Image source={images.ic_info} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
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
            source={{ uri: this.props.questions.result[QuestionIndex].image, cache: true }}
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
        <Modal
          isVisible={this.state.modal}
          onBackdropPress={this.openModal}
          style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
        >
          <ScrollView>
            <TouchableOpacity onPress={() => this.openModal()} style={QuestionAnswerStyle.AudioControls}>
              <Text style={QuestionAnswerStyle.AudioControlsText}>Close</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <View style={InstructionStyle.gameInstructionAlignment}>
                <Text style={InstructionStyle.gameInstructionText}>Instruction for game</Text>
              </View>
              <View>
                <Text>{instruction}</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  };

  // media type for image
  mediaWithImage = QuestionIndex => {
    let { id, totalQuestions, instruction } = this.props.selectedGame;
    return (
      <ScrollView>
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
                clickHandler={() => this.props.navigation.dispatch(NavigateToDashboard)}
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
                <Text style={{ fontSize: 18, fontFamily: Fonts.Fonts.CA_book }}>
                  {QuestionIndex + 1} of {totalQuestions}
                </Text>
              </ProgressCircle>
            </View>
            <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
              <View>
                <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
              </View>
              <View style={QuestionAnswerStyle.score}>
                <Text>+{this.props.questions.result[QuestionIndex].score}</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 0, marginTop: 25 }}>
              <TouchableOpacity onPress={() => this.openModal()}>
                <Image source={images.ic_info} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
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
          <Modal
            isVisible={this.state.modal}
            onBackdropPress={this.openModal}
            style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
          >
            <ScrollView>
              <TouchableOpacity onPress={() => this.openModal()} style={QuestionAnswerStyle.AudioControls}>
                <Text style={QuestionAnswerStyle.AudioControlsText}>Close</Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <View style={InstructionStyle.gameInstructionAlignment}>
                  <Text style={InstructionStyle.gameInstructionText}>Instruction for game</Text>
                </View>
                <View>
                  <Text>{instruction}</Text>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </ScrollView>
    );
  };

  // regular question answer (MCQ)
  regularQuestionAnswer = QuestionIndex => {
    let { id, totalQuestions, instruction } = this.props.selectedGame;
    return (
      <ScrollView>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", margin: 20 }}>
          <ButtonGradient
            title="Exit"
            clickHandler={() => this.props.navigation.dispatch(NavigateToDashboard)}
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={QuestionAnswerStyle.exitButton}
            buttonTextStyle={QuestionAnswerStyle.exitButtonText}
          />
        </View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 50 }}>
          <TouchableOpacity onPress={() => this.openModal()}>
            <Image source={images.ic_info} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
        </View>
        <View style={InstructionStyle.instructionIntent}>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <ProgressCircle percent={30} radius={40} borderWidth={2} color="#1CACF4" shadowColor="#999" bgColor="#fff">
              <Text style={{ fontSize: 18, fontFamily: Fonts.Fonts.CA_book }}>
                {QuestionIndex + 1} of {totalQuestions}
              </Text>
            </ProgressCircle>
          </View>
          <View style={QuestionAnswerStyle.coinAlignment}>
            <View>
              <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
            </View>
            <View style={QuestionAnswerStyle.score}>
              <Text style={{ fontFamily: Fonts.Fonts.CA_book }}>
                +{this.props.questions.result[QuestionIndex].score}
              </Text>
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
        <View style={{ marginTop: 30, alignItems: "center" }}>
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
        <Modal
          isVisible={this.state.modal}
          onBackdropPress={this.openModal}
          style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}
        >
          <ScrollView>
            <TouchableOpacity onPress={() => this.openModal()} style={QuestionAnswerStyle.AudioControls}>
              <Text style={QuestionAnswerStyle.AudioControlsText}>Close</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <View style={InstructionStyle.gameInstructionAlignment}>
                <Text style={InstructionStyle.gameInstructionText}>Instruction for game</Text>
              </View>
              <View>
                <Text>{instruction}</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
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
    return this.renderTypeOfQuestion(QuestionIndex);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIndexOfQuestion: index => dispatch(actions.indexOfQuestion(index)),
    correctAnswer: ans => dispatch(actions.correctAnswer(ans)),
    addScore: score => dispatch(actions.scoreOfPlayer(score))
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
    questionIndex: state.ClubReducer.indexOfQuestion,
    gameData: state.ClubReducer.gameData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionAnswer);
