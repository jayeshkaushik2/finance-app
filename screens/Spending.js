import React, { useContext } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import AuthContext from "../context/AuthContext";

const Spending = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        backgroundColor: "#e0e0e0",
      }}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          fontSize: 20,
          justifyContent: "center",
          alignItems: "center",
          flex: 0.8,
        }}
      >
        <Text>sepdning</Text>
      </View>
    </ScrollView>
  );
};

export default Spending;
