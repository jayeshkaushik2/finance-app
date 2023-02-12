import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import { Avatar, Text, Button } from "react-native-paper";
import { CreateApiContext } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = (props) => {
  const [ProfileData, setProfileData] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [Username, setUsername] = useState(null);
  const [saveChangeBtnActive, setsaveChangeBtnActive] = useState(true);
  const { AuthTokens, logoutUser } = useContext(AuthContext);
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
      setsaveChangeBtnActive(false);
    } else {
      alert("You did not select any image.");
    }
  };

  const updateProfile = async () => {
    try {
      const form_data = new FormData();
      // adding profile image
      let localUri = ProfileImage.uri;
      let filename = localUri.split("/").pop();
      setsaveChangeBtnActive(true);
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

  const handleSettingsClick = () => {
    console.log("settings clicked");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          {ProfileData?.profile_image !== null &&
          ProfileData?.profile_image !== "" ? (
            <Avatar.Image
              size={70}
              source={{ uri: ProfileData?.profile_image }}
              style={{ top: 15 }}
            />
          ) : (
            <Avatar.Icon
              icon="camera"
              size={70}
              style={{ top: 15 }}
              onPress={() => handleProfileUpload()}
            />
          )}
          <Text
            variant="headlineSmall"
            style={{ top: 20, justifyContent: "space-evenly" }}
          >
            {ProfileData?.username}
          </Text>

          <Icon
            size={25}
            color="black"
            onPress={() => handleProfileUpload()}
            name="settings-sharp"
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: 100,
              marginLeft: 210,
              padding: 8,
              top: -17,
            }}
          />
        </View>
        <Button onPress={() => updateProfile()} disabled={saveChangeBtnActive}>
          Save Changes
        </Button>

        <Button
          icon="login"
          mode="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#FF0000",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "100%",
          }}
          labelStyle={{
            fontSize: 17,
            paddingVertical: 5,
            letterSpacing: 0.5,
          }}
          onPress={() => logoutUser(props, "login")}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

export default Profile;
