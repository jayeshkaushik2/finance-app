import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const [ProfileData, setProfileData] = useState(null);
  const { AuthTokens } = useContext(AuthContext);

  const getProfileData = async () => {
    let token = AuthTokens?.access;
    const response = await CreateApiContext(
      "/user-details/",
      "get",
      null,
      null,
      token
    );
    let data = await response.json();
    console.log("response", data);
    if (response.ok) {
      setProfileData(data);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

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
        {ProfileData !== null ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {ProfileData?.profile_image !== null &&
            ProfileData?.profile_image !== "" ? (
              <Avatar.Image
                size={40}
                source={{ uri: ProfileData?.profile_image }}
              />
            ) : null}
            <Text variant="headlineSmall" style={{ textAlign: "center" }}>
              {ProfileData?.username}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Profile;
