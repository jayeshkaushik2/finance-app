import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";
import { List } from "react-native-paper";

// spending-report
const SpendingDetails = () => {
  const [Lables, setLables] = React.useState(null);
  const [DataSet, setDataSet] = React.useState(null);
  const [Weeks, setWeeks] = React.useState(10);
  const { AuthTokens } = useContext(AuthContext);
  const [ShowImg, setShowImg] = React.useState(false);

  const getSpendingDetails = async () => {
    try {
      let token = AuthTokens?.access;
      let response = await CreateApiContext(
        `/spending-report/${Weeks}/`,
        "get",
        null,
        null,
        token
      );
      let temp = await response.json();
      // console.log("response data:", temp);
      if (response.ok) {
        if (temp?.length > 0) {
          let tempLables = [];
          let tempDataSet = [];
          for (let i = 0; i < temp.slice(0, 5).length; i++) {
            tempLables.push(temp[i]?.month);
            tempDataSet.push(temp[i]?.spent_money);
          }
          setLables(tempLables);
          setDataSet(tempDataSet);
        } else {
          setShowImg(true);
        }
      }
    } catch (e) {
      console.log("got error while fetching", e);
    }
  };

  useEffect(() => {
    getSpendingDetails();
  }, []);

  console.log(Lables, DataSet);

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
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Card.Title
          title="Spending"
          titleStyle={{
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: 25,
          }}
        />
        {Lables !== null &&
        Lables?.length > 0 &&
        DataSet !== null &&
        DataSet?.length > 0 ? (
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
          />
        ) : (
          <ActivityIndicator
            style={{
              margin: 10,
            }}
            animating={true}
            color="black"
          />
        )}
        {ShowImg === true ? (
          <List.Image
            variant="image"
            style={{ marginLeft: "auto", marginRight: "auto", margin: 15 }}
            source={require("../assets/not_found.png")}
          />
        ) : null}
      </Card>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#2979ff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#5393ff",
  decimalPlaces: 0.2, // optional, defaults to 2dp To change the left side padding
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.3,
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
