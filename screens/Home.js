import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import IncomeDetails from "../components/IncomeDetails";
import SpendingDetails from "../components/SpendingDetails";
import SummaryDetails from "../components/SummaryDetails";
import CommonStyles from "../Themes/StyleSheet";
import { Dimensions } from "react-native";
import FABGroup from "../components/FABGroup";

const Home = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          minHeight: Dimensions.get("window").height,
          marginBottom: 50,
        }}
      >
        <View id="incomes" style={{ width: "100%" }}>
          <IncomeDetails />
        </View>
        <View id="spendings" style={{ width: "100%" }}>
          <SpendingDetails />
        </View>
        {/* <View id="summary" style={{ width: "100%" }}>
          <SummaryDetails />
        </View> */}
      </View>
      <FABGroup navigate={props} />
    </ScrollView>
  );
};

export default Home;
