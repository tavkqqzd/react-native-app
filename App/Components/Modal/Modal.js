import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Modal from "react-native-modal";
import RoundedButton from "../../Components/Buttons/RoundButton";

class ModalC extends React.Component {
  render() {
    let LoginModal = (
      <Modal
        isVisible={this.props.modalState}
        useNativeDriver={true}
        onBackdropPress={this.props.toggleModal}
        height="100%"
        backdropOpacity={0.5}
      >
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 220 }}>
          <RoundedButton
            title="Sign In"
            styleProps={css.b_margin}
            toggleModal={this.props.toggleModal}
            onClickHandler={this.props.navigateToLoginPage && this.props.navigateToLoginPage}
            nav={this.props.nav && this.props.nav}
          />
          <RoundedButton
            title="Sign Up"
            styleProps={css.b_margin}
            toggleModal={this.props.toggleModal}
            onClickHandler={this.props.navigateToSignUpPage && this.props.navigateToSignUpPage}
            nav={this.props.nav && this.props.nav}
          />
        </View>
      </Modal>
    );
    let pdfModal = (
      <Modal
        isVisible={this.props.modalState}
        useNativeDriver={true}
        onBackdropPress={this.props.toggleModal}
        height="90%"
        backdropOpacity={0.5}
      >
        <View>
          <RoundedButton
            title="Close"
            styleProps={css.b_margin}
            toggleModal={this.props.toggleModal}
            onClickHandler={this.props.navigateToLoginPage && this.props.navigateToLoginPage}
            nav={this.props.nav && this.props.nav}
          />
          {this.props.children}
        </View>
      </Modal>
    );
    let regularModal = (
      <Modal
        isVisible={this.props.modalState}
        useNativeDriver={true}
        onBackdropPress={this.props.toggleModal}
        height="50%"
        backdropOpacity={0.5}
      >
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <Text>Do you want to restart the game ?</Text>
          <RoundedButton title="Cancel" styleProps={css.b_margin} toggleModal={this.props.toggleModal} />
          <RoundedButton title="Restart" styleProps={css.b_margin} toggleModal={this.props.restartGameHandler} />
        </View>
      </Modal>
    );
    let selectImageModal = (
      <Modal
        isVisible={this.props.modalState}
        useNativeDriver={true}
        onBackdropPress={this.props.toggleModal}
        height="50%"
        backdropOpacity={0.5}
      >
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20, backgroundColor: "#FFF" }}>
          <Text>Select Image</Text>
          <RoundedButton title="Open Camera" styleProps={css.b_margin} toggleModal={this.props.uploadImageOpenCamera} />
          <RoundedButton title="Open Gallery" styleProps={css.b_margin} toggleModal={this.props.uploadImageGallery} />
        </View>
      </Modal>
    );
    let modal = undefined;
    switch (this.props.modalType) {
      case "loginModal":
        modal = LoginModal;
        break;
      case "pdfModal":
        modal = pdfModal;
        break;
      case "regularModal":
        modal = regularModal;
        break;
      case "selectImageModal":
        modal = selectImageModal;
        break;
      default:
        modal = LoginModal;
    }
    return modal;
  }
}

const css = StyleSheet.create({
  b_margin: {
    margin: 5
  }
});

export default ModalC;
