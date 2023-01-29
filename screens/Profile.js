import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import { Avatar, Text, Button } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const [ProfileData, setProfileData] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [Username, setUsername] = useState(null);
  const { AuthTokens } = useContext(AuthContext);
  let token = AuthTokens?.access;

  const getProfileData = async () => {
    const response = await CreateApiContext(
      "/user-details/",
      "get",
      null,
      null,
      token
    );
    let data = await response.json();
    if (response.ok) {
      setProfileData(data);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  const handleProfileUpload = async () => {
    console.log("image clicked");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    } else {
      alert("You did not select any image.");
    }
  };

  const updateProfile = async () => {
    try {
      console.log("updating image...");
      const form_data = new FormData();
      // adding profile image
      let localUri = ProfileImage.uri;
      let filename = localUri.split("/").pop();
      if (ProfileImage !== null && ProfileImage !== undefined) {
        form_data.append("profile_image", { uri: localUri, name: filename });
      }
      // adding user name
      if (Username !== null && Username !== "") {
        form_data.append("username", Username);
      }
      console.log("form data", form_data);
      let response = await CreateApiContext(
        "/user-details/",
        "post",
        form_data,
        null,
        token,
        "binary",
        false
      );
      let data = await response.json();
      console.log("data after uploading", data);
    } catch (error) {
      console.log(error);
    }
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
        {ProfileData !== null ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button onPress={() => updateProfile()}>Save Changes</Button>

            <TouchableOpacity onPress={() => handleProfileUpload()}>
              {ProfileData?.profile_image !== null &&
              ProfileData?.profile_image !== "" ? (
                <Avatar.Image
                  size={70}
                  source={{ uri: ProfileData?.profile_image }}
                />
              ) : (
                <Avatar.Icon
                  icon="camera"
                  size={70}
                  onPress={() => handleProfileUpload()}
                />
              )}
            </TouchableOpacity>
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
