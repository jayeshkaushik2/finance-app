import React, { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { DataTable } from "react-native-paper";

const Income = () => {
  const { AuthTokens } = useContext(AuthContext);
  let token = AuthTokens?.access;
  const [Lables, setLables] = React.useState(null);
  const [DataSet, setDataSet] = React.useState(null);
  const [IncomeData, setIncomeData] = React.useState(null);
  const [Weeks, setWeeks] = React.useState(10);
  const [Source, setSource] = React.useState("");
  const [Salary, setSalary] = React.useState("");

  const [Page, setPage] = React.useState(1);
  const [PageSize, setPageSize] = React.useState(5);
  const [ItemsPerPage, setItemsPerPage] = React.useState(5);
  const [NumberOfPages, setNumberOfPages] = React.useState(0);

  const getIncomeData = async () => {
    try {
      let response = await CreateApiContext(
        `/income/`,
        "get",
        null,
        { page: Page, page_size: PageSize },
        token
      );
      let temp = await response.json();
      if (response.ok) {
        setNumberOfPages(Math.floor(temp?.count / PageSize));
        setIncomeData(temp?.results);
      }
    } catch (e) {
      console.log("error occured while fetching", e);
    }
  };

  useEffect(() => {
    getIncomeData();
  }, []);

  const postIncomeData = async (data) => {
    let response = await CreateApiContext(
      `/income/`,
      "post",
      data,
      null,
      token
    );
    const temp = await response.json();
    console.log(temp);
    if (response.ok) {
      setSource("");
      setSalary("");
      getIncomeData();
      // re fetch the new updated data
    } else {
      console.log("occur error in income posting");
    }
  };

  const handleIncomeSave = () => {
    let data = {
      source: Source,
      salary: Salary,
    };
    postIncomeData(data);
  };

  const handlePageChange = (page) => {
    console.log("page", page);
    setPage(page);
    getIncomeData();
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
        <View id="income-post">
          <TextInput
            label="Income source"
            value={Source}
            onChangeText={(text) => setSource(text)}
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
            label="Salary"
            value={Salary}
            keyboardType="number-pad"
            onChangeText={(text) => setSalary(text)}
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
            onPress={handleIncomeSave}
          >
            Save
          </Button>
        </View>

        <View id="income-info" style={{ margin: 10 }}>
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
                Source
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "black", fontSize: 15, fontWeight: "bold" }}
                numeric
              >
                Salary
              </DataTable.Title>
            </DataTable.Header>

            {IncomeData?.map((key, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{key?.month}</DataTable.Cell>
                <DataTable.Cell>{key?.source}</DataTable.Cell>
                <DataTable.Cell numeric>{key?.salary} ₹</DataTable.Cell>
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

export default Income;
