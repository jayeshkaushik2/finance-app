import { Appbar, Avatar, Text, TouchableRipple } from "react-native-paper";
import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import AuthContext from "../context/AuthContext";
import { CreateApiContext } from "../context/Apis";

function AppBar(props) {
  const handleProfileClick = () => {
    console.log("pressed", props);
    props?.navigation?.navigate("profile");
  };
  const { user, AuthTokens } = React.useContext(AuthContext);
  const [profileData, setProfileData] = React.useState(null);

  const getProfileData = async () => {
    const response = await CreateApiContext(
      "/user-details/",
      "get",
      null,
      null,
      AuthTokens?.access
    );
    let data = await response.json();
    if (response.ok) {
      console.log("profile dasta", data);
      setProfileData(data);
    }
  };
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("token  and user", user);
  //     if (user !== null) {
  //       getProfileData();
  //     }
  //   }, 5 * 1000);
  // }, []);

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        margin: 0,
      }}
    >
      <Appbar.Header
        style={{
          backgroundColor: "black",
          height: 40,
          padding: 0,
          margin: 0,
        }}
      >
        <Appbar.Content
          color="white"
          title="FINANCE ₹"
          titleStyle={{
            marginTop: -13,
            fontSize: 25,
            fontWeight: "bold",
            fontStyle: "italic",
            marginRight: "auto",
          }}
        />
        <TouchableRipple onPress={() => handleProfileClick()}>
          {profileData?.profile_image !== null ? (
            <Avatar.Image
              size={40}
              source={{ uri: profileData?.profile_image }}
              style={{
                marginTop: -20,
                backgroundColor: "white",
                display: `${user === null ? "none" : "flex"}`,
              }}
            />
          ) : (
            <Avatar.Image
              size={40}
              source={require("../assets/profile.png")}
              style={{
                marginTop: -20,
                backgroundColor: "white",
                display: `${user === null ? "none" : "flex"}`,
              }}
            />
          )}
        </TouchableRipple>
      </Appbar.Header>
    </View>
  );
}

export default AppBar;
