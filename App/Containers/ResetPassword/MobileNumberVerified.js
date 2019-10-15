import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import Toast from "react-native-toast-native";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { setNewPassword } from "../../Services/API";
import { LoginStyles } from "../CP_Login_SignUp/Styles/Login-Styles";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { TextField } from "react-native-material-textfield";

const navigateToLoginPage = NavigationActions.navigate({
  routeName: "Login",
  action: NavigationActions.navigate({ routeName: "Login" })
});

class HelpWithPassword extends React.Component {
  static navigationOptions = {
    title: "Help With Password",
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
    password1: "",
    password2: ""
  };

  setNewPassword = () => {
    let { params } = this.props.navigation.state;
    let { password1, password2 } = this.state;
    if (password1 === password2) {
      setNewPassword(params, password1)
        .then(res => {
          if (res.status === 200) {
            Toast.show("Password Reset Successfull", Toast.LONG, Toast.BOTTOM, phoneNumberError);
            this.props.navigation.dispatch(navigateToLoginPage);
          } else if (res.status === 404) {
            Toast.show("Invalid OTP", Toast.LONG, Toast.BOTTOM, phoneNumberError);
          } else if (res.status === 500) {
            Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, phoneNumberError);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      Toast.show("Please Check your password", Toast.LONG, Toast.BOTTOM, phoneNumberError);
    }
  };

  render() {
    let { password1, password2 } = this.state;
    return (
      <View style={SignUpStyles.signUpPageActivity}>
        <View style={css.header}>
          <Text style={css.headerText}>Mobile number verified. Enter your new password</Text>
        </View>
        <TextField
          labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
          titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
          label="Your new Passowrd"
          value={password1}
          tintColor="#000"
          onChangeText={password1 => this.setState({ password1 })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <TextField
          labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
          titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
          label="Re-enter Password"
          value={password2}
          tintColor="#000"
          onChangeText={password2 => this.setState({ password2 })}
          inputContainerStyle={LoginStyles.MatUI_Text_Field}
        />
        <ButtonGradient
          clickHandler={() => this.setNewPassword()}
          title="Next"
          color1={Colors.commonButtonGradient1}
          color2={Colors.commonButtonGradient2}
          buttonStyle={SignUpStyles.signUpButton}
          buttonTextStyle={LoginStyles.loginButtonText}
        />
      </View>
    );
  }
}

const phoneNumberError = {
  width: 300,
  yOffset: 60,
  height: 120,
  backgroundColor: "#545454",
  color: "#FFFFFF",
  fontSize: 17
};

const css = StyleSheet.create({
  header: {
    margin: 15
  },
  headerText: { textAlign: "center", fontFamily: Fonts.Fonts.CA_book, fontSize: 17 }
});

export default HelpWithPassword;
