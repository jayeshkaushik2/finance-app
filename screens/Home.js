import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Text } from "react-native-paper";
import IncomeDetails from "../components/IncomeDetails";
import SpendingDetails from "../components/SpendingDetails";
import SummaryDetails from "../components/SummaryDetails";
import CommonStyles from "../Themes/StyleSheet";

const Home = () => {
  const styles = CommonStyles();

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        backgroundColor: "#eeeeee",
      }}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight + 20,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <View id="incomes">
          <IncomeDetails />
        </View>
        <View id="spendings">
          <SpendingDetails />
        </View>
        <View id="summary" style={{ width: "100%" }}>
          <SummaryDetails />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
