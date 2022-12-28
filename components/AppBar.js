import { Appbar, Text } from "react-native-paper";
import React from "react";
import { StatusBar, View } from "react-native";

// local imports
import CommonStyles from "../Themes/StyleSheet";

function AppBar(props) {
  const styles = CommonStyles();

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
          height: 25,
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
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </Appbar.Header>
    </View>
  );
}

export default AppBar;
