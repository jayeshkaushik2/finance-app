import React, { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { DataTable } from "react-native-paper";

const Spending = () => {
  const { AuthTokens } = useContext(AuthContext);
  let token = AuthTokens?.access;
  const [Lables, setLables] = React.useState(null);
  const [DataSet, setDataSet] = React.useState(null);
  const [SpendingData, setSpendingData] = React.useState(null);
  const [Weeks, setWeeks] = React.useState(10);
  const [SpentOn, setSpentOn] = React.useState("");
  const [SpentMoney, setSpentMoney] = React.useState("");

  const [Page, setPage] = React.useState(1);
  const [PageSize, setPageSize] = React.useState(5);
  const [ItemsPerPage, setItemsPerPage] = React.useState(5);
  const [NumberOfPages, setNumberOfPages] = React.useState(0);

  const getSpendingData = async () => {
    try {
      let response = await CreateApiContext(
        `/spending/`,
        "get",
        null,
        { page: Page, page_size: PageSize },
        token
      );
      let temp = await response.json();
      if (response.ok) {
        setNumberOfPages(Math.floor(temp?.count / PageSize));
        setSpendingData(temp?.results);
      }
    } catch (e) {
      console.log("error occured while fetching", e);
    }
  };

  useEffect(() => {
    getSpendingData();
  }, []);

  const postSpendingData = async (data) => {
    let response = await CreateApiContext(
      `/spending/`,
      "post",
      data,
      null,
      token
    );
    const temp = await response.json();
    console.log(temp);
    if (response.ok) {
      setSpentOn("");
      setSpentMoney("");
      getSpendingData();
      // re fetch the new updated data
    } else {
      console.log("occur error in spending posting");
    }
  };

  const handleSpendingSave = () => {
    let data = {
      spent_on: SpentOn,
      spent_money: SpentMoney,
    };
    postSpendingData(data);
  };

  const handlePageChange = (page) => {
    console.log("page", page);
    setPage(page);
    getSpendingData();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        backgroundColor: "#e0e0e0",
      }}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight + 20,
          marginBottom: 20,
          marginTop: 10,
          minHeight: Dimensions.get("window").height,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View id="spending-post">
          <TextInput
            label="spent on"
            value={SpentOn}
            onChangeText={(text) => setSpentOn(text)}
            mode="outlined"
            selectionColor="black"
            outlineStyle={{
              borderColor: "black",
              color: "black",
              borderRadius: 15,
            }}
            contentStyle={{ color: "black" }}
            style={{ margin: 10, height: 60, fontSize: 18 }}
          />
          <TextInput
            label="money spent"
            value={SpentMoney}
            keyboardType="number-pad"
            onChangeText={(text) => setSpentMoney(text)}
            mode="outlined"
            selectionColor="black"
            outlineStyle={{
              borderColor: "black",
              color: "black",
              borderRadius: 15,
            }}
            contentStyle={{ color: "black" }}
            style={{ margin: 10, height: 60, fontSize: 18 }}
          />
          <Button
            mode="contained"
            labelStyle={{
              fontSize: 18,
              marginTop: 0,
              height: 60,
              textAlignVertical: "center",
            }}
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{
              margin: 10,
              backgroundColor: "black",
              height: 60,
            }}
            onPress={handleSpendingSave}
          >
            Save
          </Button>
        </View>

        <View id="spending-info" style={{ margin: 10 }}>
          <DataTable>
            <DataTable.Header
              style={{ backgroundColor: "white", borderRadius: 15 }}
            >
              <DataTable.Title
                textStyle={{ color: "black", fontSize: 15, fontWeight: "bold" }}
              >
                Month
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "black", fontSize: 15, fontWeight: "bold" }}
              >
                spent on
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "black", fontSize: 15, fontWeight: "bold" }}
                numeric
              >
                money spent
              </DataTable.Title>
            </DataTable.Header>

            {SpendingData?.map((key, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{key?.month}</DataTable.Cell>
                <DataTable.Cell>{key?.spent_on}</DataTable.Cell>
                <DataTable.Cell numeric>{key?.spent_money} ₹</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={Page}
              numberOfPages={NumberOfPages}
              onPageChange={(page) => handlePageChange(page)}
              label={`${Page + 1} to ${NumberOfPages}`}
              itemsPerPage={ItemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Spending;
