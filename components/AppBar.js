import { Appbar, Text } from "react-native-paper";
import React from "react";
import { StatusBar, View } from "react-native";

// local imports
import CommonStyles from "../Themes/StyleSheet";

function AppBar(props) {
  const styles = CommonStyles();

  return (
    <View style={{ marginTop: StatusBar.currentHeight, margin: 0 }}>
      <Appbar.Header
        style={{
          margin: 0,
          marginTop: -10,
          // shadowColor: "black",
          // shadowOffset: { width: 1, height: 1 },
          // shadowOpacity: 1,
          // shadowRadius: 1,
        }}
      >
        <Appbar.Content
          title="FINANCE ₹"
          titleStyle={{
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
