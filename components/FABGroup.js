import React from "react";
import { FAB, Portal, Provider, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { View } from "react-native";

const FABGroup = () => {
  const IncomeIcon = <MaterialCommunityIcons name="currency-inr" />;
  const SpendingIcon = <MaterialCommunityIcons name="money-check-alt" />;
  const ProfileIcon = <Entypo name="user" />;
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <Provider>
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
              icon: IncomeIcon,
              label: "Income",
              color: "black",
              onPress: () => console.log("Pressed Income"),
            },
            {
              icon: SpendingIcon,
              label: "Spending",
              color: "black",
              onPress: () => console.log("Pressed Spending"),
            },
            {
              icon: ProfileIcon,
              label: "Profile",
              color: "black",
              onPress: () => console.log("Pressed Profile"),
            },
            { icon: "plus", onPress: () => console.log("Pressed add") },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default FABGroup;
