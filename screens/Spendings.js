import React from "react";
import { StatusBar, View } from "react-native";

const Spendings = () => {
  return (
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
  );
};

export default Spendings;
