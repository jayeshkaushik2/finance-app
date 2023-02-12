import { Appbar, Avatar, Text, TouchableRipple } from "react-native-paper";
import React from "react";
import { StatusBar, View } from "react-native";

function AppBar(props) {
  const handleProfileClick = () => {
    console.log("pressed", props);
    props?.navigation?.navigate("profile");
  };

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        margin: 0,
      }}
    >
      <Appbar.Header
        style={{
          backgroundColor: "black",
          height: 40,
          padding: 0,
          margin: 0,
        }}
      >
        <Appbar.Content
          color="white"
          title="FINANCE ₹"
          titleStyle={{
            marginTop: -13,
            fontSize: 25,
            fontWeight: "bold",
            fontStyle: "italic",
            marginRight: "auto",
          }}
        />
        <TouchableRipple onPress={() => handleProfileClick()}>
          <Avatar.Image
            size={40}
            source={require("../assets/profile.png")}
            style={{
              marginTop: -20,
              backgroundColor: "white",
            }}
          />
        </TouchableRipple>
      </Appbar.Header>
    </View>
  );
}

export default AppBar;
