import React, { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { DataTable } from "react-native-paper";
import CommonStyles from "../Themes/StyleSheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from "react-native-paper";

const Income = () => {
  const styles = CommonStyles();
  const { AuthTokens } = useContext(AuthContext);
  let token = AuthTokens?.access;
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

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
        backgroundColor: "white",
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
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ borderRadius: 15, width: "100%", marginLeft: "auto" }}
        />

        <View id="income-info">
          <DataTable>
            <DataTable.Header
              style={{
                backgroundColor: "#e040fb",
                borderRadius: 15,
                marginTop: 10,
              }}
            >
              <DataTable.Title
                textStyle={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                Month
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                Source
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "white", fontSize: 15, fontWeight: "bold" }}
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
        <View id="income-post">
          <TextInput
            mode="outlined"
            value={Source}
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Income source"
            onChangeText={(value) => setSource(value)}
          />
          <TextInput
            mode="outlined"
            value={Salary}
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Income amount"
            onChangeText={(value) => setSalary(value)}
          />
          <Button
            mode="contained"
            icon={<Icon size={25} name="attach-money" />}
            style={{
              borderRadius: 10,
              backgroundColor: "#0085FF",
              marginLeft: "auto",
              marginTop: 10,
            }}
            labelStyle={{
              fontSize: 17,
              paddingVertical: 5,
              letterSpacing: 0.5,
            }}
            onPress={handleIncomeSave}
          >
            Add Income
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Income;
