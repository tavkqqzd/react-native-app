import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, RefreshControl, FlatList, ListView } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import * as actions from "../../Store/Actions/ClubData";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getGameAndUserDetail, validateClubID, restartGame } from "../../Services/API";
import { randomColorGenerator } from "../../Components/Utils/RandomColorGenerator";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import { InstructionStyle } from "./Styles/Instruction-Style";

import DashboardCard from "../../Components/Card/DashboardCard";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";

const navigateToProfilePage = NavigationActions.navigate({
  routeName: "Profile",
  action: NavigationActions.navigate({ routeName: "Profile" })
});

const navigateToInstructionsPage = NavigationActions.navigate({
  routeName: "Instructions",
  action: NavigationActions.navigate({ routeName: "Instructions" })
});

class DashboardPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Club Passport",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerBackImage: images.back,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: Colors.gradientViolet
      },
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.dispatch(navigateToProfilePage)}>
          <Image source={images.user} style={{ height: 24, width: 20, marginRight: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      )
    };
  };
  state = {
    cardsData: "",
    modal: "",
    gameId: "",
    refreshing: false,
    startIndex: 0,
    endIndex: 10,
    scrollY: 0
  };

  openModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  getGamesOnMount = () => {
    let { clubId, playerId, employeeTypeCode } = this.props.userLoginData;
    getGameAndUserDetail(employeeTypeCode, clubId, this.state.startIndex, this.state.endIndex, playerId)
      .then(res => {
        console.log("once called");
        if (res.status === 200) {
          let data = [...this.props.gameData, ...res.data.result];
          this.props.storeGameData(data);
        } else if (res.status === 404) {
          // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        console.log(err, err);
      });
  };

  componentDidMount() {
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDay();
    let arr = [].concat(y, m, d);
    let { clubId } = this.props.userLoginData;
    this.getGamesOnMount();
    validateClubID(clubId)
      .then(res => {
        if (res.status === 200) {
          this.props.getClubData(res.data.result[0]);
        }
      })
      .catch(err => console.log(err));
  }

  selectedGame = data => {
    this.props.selectedGame(data);
    if (data.isGamePlayed === 2) {
      this.setState({ modal: true, gameId: data.id });
    } else if (data.isGamePlayed === 0) {
      this.props.navigation.dispatch(navigateToInstructionsPage);
    } else if (data.isGamePlayed === 1) {
      this.props.navigation.dispatch(navigateToInstructionsPage);
    }
  };

  restartGame = (gid, uId) => {
    restartGame(gid, uId)
      .then(res => {
        this.getGamesOnMount();
        this.setState({ modal: false });
      })
      .catch(err => {
        this.setState({ modal: false });
        console.log("failed restart game", err);
      });
  };

  gameStatusDisplay = obj => {
    if (obj.isGamePlayed === 2) {
      return "Restart";
    } else if (obj.isGamePlayed === 0) {
      return "Play";
    } else if (obj.isGamePlayed === 1) {
      return "Resume";
    }
  };

  questionsRemainingRender = obj => {
    if (obj.totalQuestions === obj.remainingQuestions) {
      return `${obj.remainingQuestions} Questions`;
    } else if (obj.totalQuestions !== obj.remainingQuestions) {
      return `${obj.totalQuestions - obj.remainingQuestions}` + "/" + `${obj.totalQuestions} Questions`;
    }
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    let { clubId, playerId, employeeTypeCode } = this.props.userLoginData;
    getGameAndUserDetail(employeeTypeCode, clubId, 0, 10, playerId)
      .then(res => {
        if (res.status === 200) {
          this.props.storeGameData(res.data);
          this.setState({ refreshing: false });
        } else if (res.status === 404) {
          this.setState({ refreshing: false });
          // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          this.setState({ refreshing: false });
          // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        this.setState({ refreshing: false });
        console.log(err, err);
      });
  };

  handleLoadMore = () => {
    console.log("handle load more called");
    this.setState(
      {
        startIndex: this.state.startIndex + 10,
        endIndex: this.state.endIndex + 10
      },
      () => {
        this.getGamesOnMount();
      }
    );
  };

  render() {
    let { gameData } = this.props;
    return (
      <View>
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          onScroll={this.handleScroll}
          pagingEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}
          keyExtractor={item => item.name}
          data={!!gameData && gameData}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={100}
          renderItem={({ item }) => (
            <View key={item.name}>
              <LinearGradient
                useAngle={true}
                angle={90}
                colors={[randomColorGenerator(), randomColorGenerator()]}
                style={css.card}
              >
                <View style={css.gameName}>
                  <Text style={css.gameNameText}>{item.name}</Text>
                </View>
                <View style={css.cardBottomRow}>
                  <View style={css.questionSection}>
                    <Text style={css.questionsText}>{this.questionsRemainingRender(item)}</Text>
                  </View>
                  <View style={css.bottomButtonSection}>
                    <TouchableOpacity style={css.button} onPress={() => this.selectedGame(item)}>
                      <Text style={css.questionsText}>{this.gameStatusDisplay(item)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )}
        />
        <Modal
          isVisible={this.state.modal}
          onBackdropPress={this.openModal}
          useNativeDriver={true}
          style={{ alignItems: "center" }}
        >
          <View
            style={{ width: "95%", height: "auto", backgroundColor: Colors.white, borderRadius: 30, paddingTop: 20 }}
          >
            <View style={{ alignItems: "center" }}>
              <View style={InstructionStyle.gameInstructionAlignment}>
                <Text style={InstructionStyle.DashboardCardModalText}>
                  You have already completed the game. Do you want to play it again
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 20 }}>
                <TouchableOpacity style={InstructionStyle.ModalButtons} onPress={() => this.openModal()}>
                  <Text style={InstructionStyle.ModalButtonText}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={InstructionStyle.ModalButtons}
                  onPress={() => this.restartGame(this.state.gameId, this.props.userLoginData.playerId)}
                >
                  <Text style={InstructionStyle.ModalButtonText}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const css = StyleSheet.create({
  header: {
    margin: 15
  },
  headerText: { textAlign: "center" },
  card: {
    borderRadius: 10,
    height: 120,
    marginTop: 10,
    marginBottom: 10
  },
  cardBottomRow: {
    flexDirection: "row"
  },
  button: {
    borderRadius: 15,
    marginLeft: 10,
    padding: 10,
    borderColor: Colors.white,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 100
  },
  gameName: { height: 60, padding: 10 },
  gameNameText: { fontSize: 24, color: Colors.white, fontFamily: Fonts.Fonts.CA_bold },
  questionsText: { fontSize: 18, color: Colors.white, fontFamily: Fonts.Fonts.CA_bold },
  cardBottomRow: { height: 60, flexDirection: "row", padding: 10 },
  questionSection: { width: widthPercentageToDP("40%"), justifyContent: "flex-end" },
  bottomButtonSection: { width: widthPercentageToDP("50%"), flexDirection: "row", justifyContent: "flex-end" }
});

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGameData: data => dispatch(actions.storeGameData(data)),
    getClubData: data => dispatch(actions.getClubData(data)),
    selectedGame: data => dispatch(actions.selectedGame(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
