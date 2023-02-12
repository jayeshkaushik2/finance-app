import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AuthContext from "../context/AuthContext";

const FABGroup = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { logoutUser } = React.useContext(AuthContext);

  const handleIncomeClick = () => {
    props?.navigate?.navigation?.navigate("income");
  };

  const handleSpendingClick = () => {
    props?.navigate?.navigation?.navigate("spending");
  };

  const handleProfileClick = () => {
    props?.navigate?.navigation?.navigate("profile");
  };

  const handleHomeClick = () => {
    props?.navigate?.navigation?.navigate("home");
  };

  return (
    <>
      <Portal style={{ backgroundColor: "green" }}>
        <FAB.Group
          open={open}
          visible
          color="white"
          mode="flat"
          icon={open ? "close" : "plus"}
          fabStyle={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
          }}
          style={{
            backgroundColor: "transparent",
          }}
          actions={[
            {
              icon: "email",
              label: "Income",
              color: "black",
              onPress: () => handleIncomeClick(),
            },
            {
              icon: "bell",
              label: "Spending",
              color: "black",
              onPress: () => handleSpendingClick(),
            },
            {
              icon: "bell",
              label: "Profile",
              color: "black",
              onPress: () => handleProfileClick(),
            },
            {
              icon: "home",
              label: "home",
              color: "black",
              onPress: () => handleHomeClick(),
            },
            { icon: "plus", onPress: null },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </>
  );
};

export default FABGroup;
