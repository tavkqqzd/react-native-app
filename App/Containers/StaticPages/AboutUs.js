import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";

const navigateToSettingsPage = NavigationActions.navigate({
  routeName: "Settings",
  action: NavigationActions.navigate({ routeName: "Settings" })
});

class TermsOfService extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "About Us",
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
        <TouchableOpacity onPress={() => navigation.dispatch(navigateToSettingsPage)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      ),
      headerRight: <View />
    };
  };

  render() {
    return (
      <ScrollView style={{ margin: 20 }}>
        <View>
          <Text style={css.RegularText}>
            The Club Passport App is the brainchild of Mark Schlake. Mark has been involved with technology solutions
            for private clubs for over 30+ years. If your club uses Jonas, Clubessential (ClubSoft) or Northstar
            Technologies then you are already familiar with Mark's work. Jonas's first website product, Clubhouse Online
            was developed with Mark's ClubSoft team in Kansas City. Then ClubSoft's Accounting and Point-of-Sale
            products were acquired by Clubessential. And now Mark is the VP of product Strategy at Northstar Technology
            after a stint of developing the successful ForeTees App.
          </Text>
          <Text style={css.RegularText}>
            Club's have been looking for additional ways to keep their clubs vibrant in the lives of all their members;
            husbands, wives and children. Of course Golf, Fitness, Dining, Tennis and Aquatics are the main amenities
            that appeal to your members, but it is the rare member that embraces everyone of those activities. The truth
            is, especially with Millennials, clubs are looking for new ways to engage their members. And as before, Mark
            turned to technology for the answer, hence the Club Passport Mobile App.
          </Text>
          <Text style={css.RegularText}>
            When in Kansas City, Mark lived across from the cities top-notched Museum where Mark developed a Mobile App
            as a Scavenger Hunt through the many exhibits. Marks' wife, a long time educator, insisted upon an
            educational component, multiple choice questions, and now those same concepts are in ClubPassports.
          </Text>
          <Text style={css.RegularText}>
            The App is completely controlled by the club staff and very simple for any Adult or Child to navigate. Clubs
            can get very creative in how they design their Games/Tours/Orientations so any sized club can adapt the App
            to their needs.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const css = StyleSheet.create({
  RegularText: {
    fontFamily: Fonts.Fonts.CA_book,
    fontSize: 16,
    paddingTop: 15
  },
  HeaderText: {
    paddingTop: 15,
    fontFamily: Fonts.Fonts.CA_bold,
    fontSize: 20,
    color: Colors.black
  }
});

export default TermsOfService;
