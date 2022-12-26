import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";

const IncomeDetails = () => {
  const [Lables, setLables] = React.useState(null);
  const [DataSet, setDataSet] = React.useState(null);
  const [Weeks, setWeeks] = React.useState(10);
  const { AuthTokens } = useContext(AuthContext);

  const getIncomeDetails = async () => {
    try {
      let token = AuthTokens?.access;
      let resp = await CreateApiContext(
        `/income-report/${Weeks}/`,
        "get",
        null,
        null,
        token
      );
      let tempLables = [];
      let tempDataSet = [];
      console.log("resp data", resp);
      let temp = await resp.json();
      for (let i = 0; i < temp.length; i++) {
        tempLables.push(temp[i]?.month);
        tempDataSet.push(temp[i]?.salary);
      }
      setLables(tempLables);
      setDataSet(tempDataSet);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIncomeDetails();
  }, []);

  return (
    <View
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card
        style={{
          width: Dimensions.get("window").width,
          backgroundColor: "white",
          borderRadius: 15,
        }}
      >
        <Card.Title
          title="Income"
          titleStyle={{
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: 25,
          }}
        />
        {Lables !== null && DataSet !== null ? (
          <LineChart
            data={{
              labels: Lables,
              datasets: [
                {
                  data: DataSet,
                },
              ],
            }}
            width={Dimensions.get("window").width - 10}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 15,
            }}
          />
        ) : (
          <ActivityIndicator
            style={{ margin: 10 }}
            animating={true}
            color="black"
          />
        )}
      </Card>
    </View>
  );
};
const chartConfig = {
  backgroundColor: "#e3f2fd",
  backgroundGradientFrom: "#0288d1",
  backgroundGradientTo: "#81d4fa",
  decimalPlaces: 0.5, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#1e88e5",
  },
};

export default IncomeDetails;
