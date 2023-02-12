import React, { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { DataTable } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import CommonStyles from "../Themes/StyleSheet";
import Icon from "react-native-vector-icons/MaterialIcons";

const Spending = () => {
  const styles = CommonStyles();

  const { AuthTokens } = useContext(AuthContext);
  let token = AuthTokens?.access;

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
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
        <View id="spending-info">
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
                spent on
              </DataTable.Title>
              <DataTable.Title
                textStyle={{ color: "white", fontSize: 15, fontWeight: "bold" }}
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

        <View id="spending-post">
          <TextInput
            mode="outlined"
            value={SpentOn}
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Spent on"
            onChangeText={(value) => setSpentOn(value)}
          />
          <TextInput
            mode="outlined"
            value={SpentMoney}
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Spent amount"
            onChangeText={(value) => setSpentMoney(value)}
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
            onPress={handleSpendingSave}
          >
            Add Spending
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Spending;
