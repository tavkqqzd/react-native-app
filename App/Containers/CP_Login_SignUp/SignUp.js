import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import { validateClubID } from "../../Services/API";
import Toast from "react-native-toast-native";
import { connect } from "react-redux";
import { TextField } from "react-native-material-textfield";
import { LoginStyles } from "./Styles/Login-Styles";

const navigateToSignUpPage = NavigationActions.navigate({
  routeName: "SignUp",
  action: NavigationActions.navigate({ routeName: "SignUp" })
});

class SignUp extends React.Component {
  static navigationOptions = {
    title: "Sign Up",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerBackImage: images.back,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: Colors.gradientViolet
    },
    headerLeft: <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
  };
  state = {
    name: "",
    optionalName: "",
    email: "",
    password: "",
    clubMemberId: "",
    employee: false
  };

  render() {
    const { clubLogo } = this.props.clubData;
    const { name, email, optionalName, password, clubMemberId } = this.state;
    return (
      <View style={[centerAlignment.contentAlignInCenter, SignUpStyles.signUpPageActivity]}>
        <Image source={{ uri: clubLogo }} style={{ width: 120, height: 120 }} />
        <TextField
          label="Name*"
          value={name}
          tintColor="#000"
          onChangeText={name => this.setState({ name })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <TextField
          label="User Name(Optional)"
          value={optionalName}
          tintColor="#000"
          onChangeText={optionalName => this.setState({ optionalName })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <TextField
          label="Email Address*"
          value={email}
          tintColor="#000"
          onChangeText={email => this.setState({ email })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <TextField
          label="Password*"
          value={password}
          tintColor="#000"
          onChangeText={password => this.setState({ password })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <TextField
          label="Club Membership ID(Optional)"
          value={clubMemberId}
          tintColor="#000"
          onChangeText={clubMemberId => this.setState({ clubMemberId })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <TextField
          label="Club ID*"
          value={clubId}
          tintColor="#000"
          onChangeText={clubId => this.setState({ clubId })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    clubData: state.ClubReducer.clubData
  };
};

export default connect(
  mapStateToProps,
  null
)(SignUp);
