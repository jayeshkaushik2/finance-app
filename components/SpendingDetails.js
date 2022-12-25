import React from "react";
import { View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Card, Text } from "react-native-paper";
import { Dimensions } from "react-native";

const SpendingDetails = () => {
  return (
    <View
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
      }}
    >
      <Card style={{ width: "100%", backgroundColor: "white" }}>
        <Card.Title
          title="Spending"
          titleStyle={{
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: 25,
          }}
        />
        <BarChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 10} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            shadowColor: "black",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
        />
      </Card>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#2979ff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#5393ff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default SpendingDetails;
