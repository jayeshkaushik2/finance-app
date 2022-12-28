import React, { useEffect } from "react";
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
import { CreateApiContext } from "../context/Apis";
const screenWidth = Dimensions.get("window").width;
import { ActivityIndicator } from "react-native-paper";

// summary-report
const SummaryDetails = () => {
  const [SummaryData, setSummaryData] = React.useState(null);

  const getSummaryDetails = async () => {
    try {
      // let token = AuthTokens?.access;
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjQxNTk5LCJpYXQiOjE2NzIyMzk3OTksImp0aSI6IjVmMTAxOTdlZGNlYTQ5OTBiMzQxYTUxYzdkNDU5OGQ2IiwidXNlcl9pZCI6Mn0.2Qy9nmND1rFrC536SxHCCOSrFTbkeUAtw9lorG8bnwU";
      let response = await CreateApiContext(
        `/summary-report/`,
        "get",
        null,
        null,
        token
      );
      let temp = await response.json();
      // console.log("response data:", temp);
      if (response.ok) {
        // let data = [];
        // for (var key in temp) {
        //   data.push({
        //     name: key,
        //     income: temp[key],
        //     color: "#ff5722",
        //     legendFontColor: "#7F7F7F",
        //     legendFontSize: 13,
        //   });
        // }
        // console.log("daat", data);
        // setSummaryData(data);
        setSummaryData(temp);
      }
    } catch (e) {
      console.log("error occured while fetching", e);
    }
  };

  let dd = [
    {
      color: "#ff5722",
      income: 40000,
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
      name: "total_income",
    },
    {
      color: "#ff5722",
      income: 310583,
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
      name: "total_spending",
    },
    {
      color: "#ff5722",
      income: -270583,
      legendFontColor: "#7F7F7F",
      legendFontSize: 13,
      name: "total_saving",
    },
  ];

  useEffect(() => {
    getSummaryDetails();
  }, []);
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
          {SummaryData !== null ? (
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell
                  textStyle={{ fontWeight: "bold", fontSize: 20 }}
                >
                  Total Income
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: 20 }} numeric>
                  {SummaryData?.total_income} ₹
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell
                  textStyle={{ fontWeight: "bold", fontSize: 20 }}
                >
                  Total Spending
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: 20 }} numeric>
                  - {SummaryData?.total_spending} ₹
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell
                  textStyle={{ fontWeight: "bold", fontSize: 20 }}
                >
                  Savings
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ fontSize: 20 }} numeric>
                  {SummaryData?.total_saving} ₹
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          ) : (
            <ActivityIndicator
              style={{ margin: 10 }}
              animating={true}
              color="black"
            />
          )}
        </Card.Content>
      </Card>

      {/* <View style={{ marginTop: 10 }}>
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
      </View> */}
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
