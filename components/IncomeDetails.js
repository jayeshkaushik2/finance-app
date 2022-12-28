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
      // let token = AuthTokens?.access;
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjQxNTk5LCJpYXQiOjE2NzIyMzk3OTksImp0aSI6IjVmMTAxOTdlZGNlYTQ5OTBiMzQxYTUxYzdkNDU5OGQ2IiwidXNlcl9pZCI6Mn0.2Qy9nmND1rFrC536SxHCCOSrFTbkeUAtw9lorG8bnwU";
      let response = await CreateApiContext(
        `/income-report/${Weeks}/`,
        "get",
        null,
        null,
        token
      );
      let temp = await response.json();
      // console.log("response data:", temp);
      if (response.ok) {
        let tempLables = [];
        let tempDataSet = [];
        for (let i = 0; i < temp.slice(0, 5).length; i++) {
          tempLables.push(temp[i]?.month);
          tempDataSet.push(temp[i]?.salary);
        }
        setLables(tempLables);
        setDataSet(tempDataSet);
      }
    } catch (e) {
      console.log("error occured while fetching", e);
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
        width: "95%",
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
            width={Dimensions.get("window").width - 19} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
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
  backgroundColor: "#e3f2fd",
  backgroundGradientFrom: "#0288d1",
  backgroundGradientTo: "#81d4fa",
  decimalPlaces: 0.5, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 10,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#1e88e5",
  },
};

export default IncomeDetails;
