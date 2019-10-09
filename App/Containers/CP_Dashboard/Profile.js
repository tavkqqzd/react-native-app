import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { ProfileStyle } from "./Styles/Profile-Style";

import DashboardCard from "../../Components/Card/DashboardCard";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP } from "../../Components/Utils/PercentageToPixels";

const navigateBackToDashboard = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

class ProfilePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerBackImage: images.back,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: Colors.gradientViolet
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(navigateBackToDashboard)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity>
          <Image source={images.setting} style={{ height: 24, width: 25, marginRight: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      )
    };
  };

  state = {};

  componentDidMount() {
    console.log("clubData", this.props.clubData);
  }

  render() {
    let { playerName, clubId } = this.props.userLoginData;
    return (
      <View style={ProfileStyle.profileActivity}>
        <View style={ProfileStyle.basicProfileInfo}>
          <View style={ProfileStyle.col6}>
            <View>
              <Text style={ProfileStyle.userName}>{playerName}</Text>
            </View>
            <View>
              <Text style={ProfileStyle.clubId}>{clubId}</Text>
            </View>
            <View>
              <Text style={ProfileStyle.changeClub}>Change Club</Text>
            </View>
          </View>
          <View style={[ProfileStyle.col6, { position: "relative" }]}>
            <View style={ProfileStyle.userImage}>
              <Image source={images.ic_passport} style={ProfileStyle.userImagePic} />
            </View>
          </View>
        </View>
        <View style={ProfileStyle.basicProfileInfo}>
          <View style={ProfileStyle.clubNameBox}>
            <View style={ProfileStyle.col6}>
              <Text>A</Text>
            </View>
            <View style={ProfileStyle.col6}>
              <Text>B</Text>
            </View>
          </View>
          <View style={ProfileStyle.totalScoreSection}>
            <View>
              <Text>Total Score</Text>
            </View>
            <View>
              <Text>+0</Text>
            </View>
            <View>
              <Text>Leader Board</Text>
            </View>
          </View>
        </View>
        <ScrollView></ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData,
    clubData: state.ClubReducer.clubData
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     storeGameData: data => dispatch(actions.storeGameData(data))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(ProfilePage);
