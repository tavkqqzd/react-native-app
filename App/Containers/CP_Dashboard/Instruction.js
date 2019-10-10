import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getGameAndUserDetail, validateClubID } from "../../Services/API";

const navigateToProfilePage = NavigationActions.navigate({
  routeName: "Profile",
  action: NavigationActions.navigate({ routeName: "Profile" })
});

class InstructionPage extends React.Component {
  state = {};

  render() {
    let { instruction } = this.props.navigation.state.params;
    console.log("instructions page", this.props.navigation.state.params);
    // let { gameData } = this.props;
    return (
      <View style={{ padding: 10, alignItems: "center", position: "relative" }}>
        <View>
          <Image source={images.small_logo} />
        </View>
        <View>
          <Text>Club Passport is your ticket to all the Fun that is available at your Club...</Text>
        </View>
        <View>
          <Text>Instruction for game</Text>
        </View>
        <View>
          <Text>{instruction}</Text>
        </View>
        <View>
          <ButtonGradient
            title="Enter The Game"
            // clickHandler={() => this.APILogin(getPhoneNumber, password, clubId.toUpperCase())}
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={css.startButton}
            buttonTextStyle={css.buttonTextStyle}
          />
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold"
  },
  startButton: {
    height: 50,

    borderRadius: 30
  }
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
    getClubData: data => dispatch(actions.getClubData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionPage);
