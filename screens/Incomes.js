import React from "react";
import { StatusBar, View } from "react-native";
import { Text } from "react-native-paper";

const Incomes = () => {
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
      <Text>Incomes</Text>
    </View>
  );
};

export default Incomes;
