import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { NavigationActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import * as ActivityStyles from "../../Themes/ActivityStyles";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import { ScoreStyles } from "./Styles/ScoreScreen-Style";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";

const NavigateToDashboard = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

class Testing extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = { show: false, paused: true, height: 300, width: 300, repeat: false };
  showVideo = () => {
    this.setState({
      show: !this.state.show,
      paused: false,
      width: widthPercentageToDP("100%"),
      height: heightPercentageToDP("80%")
    });
  };
  pauseVideo = () => {
    this.setState({ paused: !this.state.paused });
  };
  repeatVideo = () => {
    this.setState(prevState => ({
      repeat: !prevState.repeat
    }));
  };
  componentDidMount() {
    this.setState({ paused: this.state.paused, repeat: this.state.repeat });
  }
  render() {
    return (
      <View style={ActivityStyles.coverCompleteActivity.globalPage}>
        <View style={{ height: this.state.height, width: this.state.width }}>
          <VideoPlayer
            source={{ uri: "https://cpatrivia.s3.amazonaws.com/gameAssets/sampleVideo.mp4" }}
            toggleResizeModeOnFullscreen={true}
            navigator={this.props.navigator}
            paused={this.state.paused}
            repeat={this.state.repeat}
          />
        </View>
        <TouchableOpacity onPress={() => this.pauseVideo()}>
          <Text>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.showVideo()}>
          <Text>Enlarge</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.repeatVideo()}>
          <Text>repeatVideo</Text>
        </TouchableOpacity>
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
