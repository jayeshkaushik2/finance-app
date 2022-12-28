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
    try {
      // let token = AuthTokens?.access;
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjM5MzQ4LCJpYXQiOjE2NzIyMzc1NDgsImp0aSI6ImYyMWEwMDY4M2I4ZDQyYjFiNGRiNjlkMDQ2MmJlMWVhIiwidXNlcl9pZCI6Mn0.ZaK4m5vLbq_9gDGhwkfQ0MgZVujXAzpyNfkwPchMDDw";
      let response = await CreateApiContext(
        `/spending-report/${Weeks}/`,
        "get",
        null,
        null,
        token
      );
      let temp = await response.json();
      console.log("response data:", temp);
      if (response.ok) {
        let tempLables = [];
        let tempDataSet = [];
        for (let i = 0; i < temp.slice(0, 5).length; i++) {
          tempLables.push(temp[i]?.month);
          tempDataSet.push(temp[i]?.spent_money);
        }
        setLables(tempLables);
        setDataSet(tempDataSet);
      }
    } catch (e) {
      console.log("got error while fetching", e);
    }
  };

  useEffect(() => {
    getSpendingDetails();
  }, []);

  return (
    <View
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
        marginTop: 10,
      }}
    >
      <Card
        style={{
          width: "100%",
          // width: Dimensions.get("window").width,
          backgroundColor: "white",
          borderRadius: 10,
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
            width={Dimensions.get("window").width - 19} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            style={{
              borderRadius: 10,
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
    borderRadius: 10,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default SpendingDetails;
