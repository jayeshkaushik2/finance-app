import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";

// spending-report
const SpendingDetails = () => {
  const [Lables, setLables] = React.useState(null);
  const [DataSet, setDataSet] = React.useState(null);
  const [Weeks, setWeeks] = React.useState(10);
  const { AuthTokens } = useContext(AuthContext);

  const getSpendingDetails = async () => {
    let token = AuthTokens?.access;
    let resp = await CreateApiContext(
      `/income-report/${Weeks}/`,
      "get",
      null,
      null,
      token
    );
    console.log("resp data", resp);
    let tempLables = [];
    let tempDataSet = [];
    let temp = await resp.json();
    for (let i = 0; i < temp.length; i++) {
      tempLables.push(temp[i]?.month);
      tempDataSet.push(temp[i]?.spent_money);
    }
    setLables(tempLables);
    setDataSet(tempDataSet);
  };

  useEffect(() => {
    getSpendingDetails();
  }, []);

  return (
    <View
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
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
          title="Spending"
          titleStyle={{
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: 25,
          }}
        />
        {Lables !== null && DataSet !== null ? (
          <BarChart
            data={{
              labels: Lables,
              datasets: [
                {
                  data: DataSet,
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
  backgroundGradientFrom: "#2979ff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#5393ff",
  backgroundGradientToOpacity: 0.5,
  decimalPlaces: 0.5, // optional, defaults to 2dp To change the left side padding
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
