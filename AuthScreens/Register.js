import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { CreateApiContext } from "../context/Apis";

import AuthContext from "../context/AuthContext";
import { Button, TextInput } from "react-native-paper";
import CommonStyles from "../Themes/StyleSheet";
import { StatusBar } from "react-native";

const colors = {
  background_color: "black",
};

function Register(props) {
  // styles
  const styles = CommonStyles();
  // variables used
  const [showCompanyName, setShowCompanyName] = React.useState(true);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const postData = async (data) => {
    try {
      await CreateUserApi({ userData: data });
      alert("user created");
      props?.navigation.navigate("verify_newuser_otp");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSigup = () => {
    if (password !== confirmPassword) {
      alert("your passwords are not matching!");
    } else {
      let data = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        mobile: mobile,
        password: password,
      };
      postData(data);
    }
  };

  const handleLogin = () => {
    props?.navigation.navigate("login");
  };

  return (
    <ScrollView>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          fontSize: 20,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={styles.second_container}>
          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="First name"
            onChangeText={(value) => setFirstName(value)}
          />
          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Last name"
            onChangeText={(value) => setLastName(value)}
          />
          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
          />

          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Mobile"
            onChangeText={(value) => setMobile(value)}
          />

          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Username"
            onChangeText={(value) => setUsername(value)}
          />

          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            secureTextEntry
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
          />

          <TextInput
            mode="outlined"
            selectionColor="black"
            outlineColor="#e0e0e0"
            activeOutlineColor="#e0e0e0"
            dense={true}
            outlineStyle={styles.custom_outlineStyle}
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            right={
              !showPassword ? (
                <TextInput.Icon
                  icon="eye-off"
                  onPress={() => setShowPassword(true)}
                />
              ) : (
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPassword(false)}
                />
              )
            }
          />
          <Button
            mode="contained"
            style={styles.custom_btn}
            labelStyle={styles.custom_btn_text}
            onPress={handleSigup}
          >
            Create Account
          </Button>
        </View>

        <View styles={styles.bottom_last_container}>
          <Text style={{ top: 40 }}>
            already have an account?
            <Text style={styles.signup_text} onPress={handleLogin}>
              {" "}
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Register;
