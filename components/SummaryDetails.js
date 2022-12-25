import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  DataTable,
} from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const SummaryDetails = () => {
  const data = [
    {
      name: "total income",
      income: 1000,
      color: "#ff5722",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "total spending",
      income: 500,
      color: "#0091ea",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
    {
      name: "total income",
      income: 500,
      color: "#18ffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
    },
  ];
  return (
    <View
      style={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
      }}
    >
      <Card style={{ width: "100%", backgroundColor: "white" }}>
        <Card.Title
          title="Summary"
          titleStyle={{
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: 25,
          }}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
                Total Income
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: 20 }} numeric>
                1000 ₹
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
                Total Spending
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: 20 }} numeric>
                - 500 ₹
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
                Savings
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: 20 }} numeric>
                500 ₹
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      <View style={{ marginTop: 10 }}>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"income"}
          center={[10, 50]}
          style={{
            borderRadius: 16,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
            width: "100%",
          }}
        />
      </View>
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

export default SummaryDetails;
