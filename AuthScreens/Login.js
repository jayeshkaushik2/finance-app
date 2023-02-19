import React, { useContext, useEffect } from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import AuthContext from "../context/AuthContext";
import { TextInput, Button } from "react-native-paper";
import CommonStyles from "../Themes/StyleSheet";

import { StatusBar } from "react-native";

function Login(props) {
  const { loginUser, user, login } = useContext(AuthContext);
  // styles
  const styles = CommonStyles();
  // variables used
  const [showCompanyName, setShowCompanyName] = React.useState(true);
  const [showGoogleFacebook, setshowGoogleFacebook] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  const handleLogin = () => {
    try {
      setShowLoading(true);
      let data = {
        email: email,
        password: password,
      };
      loginUser(null, data, props, "home");
      setEmail(null);
      setPassword(null);
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
    }
  };

  const handleForgotPass = () => {
    props?.navigation.navigate("forgot_password");
  };

  const handleGoogleLogin = () => {
    console.log("handleGoogleLogin");
  };

  const handleFacebookLogin = () => {
    console.log("handleFacebookLogin");
  };

  const handleSignup = () => {
    props?.navigation.navigate("signup");
  };

  useEffect(() => {
    if (user !== null && login === "Logout") {
      props?.navigation.navigate("home");
    }
  }, []);

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 0.8,
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
          placeholder="Email"
          value={email}
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
          secureTextEntry={!showPassword}
          placeholder="Password"
          value={password}
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
          icon="login"
          mode="contained"
          style={styles.custom_btn}
          labelStyle={styles.custom_btn_text}
          loading={showLoading}
          onPress={handleLogin}
        >
          Login
        </Button>
      </View>

      <View styles={styles.bottom_container}>
        <Text style={styles.forgot_btn} onPress={handleForgotPass}>
          Forgot password?
        </Text>
      </View>

      {showGoogleFacebook ? (
        <View style={styles.login_with_google_or_facebook}>
          <Pressable
            title="Login"
            style={styles.pressable_btn_outlined}
            onPress={handleGoogleLogin}
          >
            <Image
              source={require("../assets/google.png")}
              style={styles.png_icon}
            />
            <Text style={styles.pressable_btn_text_outlined}>Google</Text>
          </Pressable>

          <Pressable
            title="Login"
            style={styles.pressable_btn_outlined}
            onPress={handleFacebookLogin}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={styles.png_icon}
            />
            <Text style={styles.pressable_btn_text_outlined}>Facebook</Text>
          </Pressable>
        </View>
      ) : null}

      <View styles={styles.bottom_last_container}>
        <Text style={{ top: 60 }}>
          Don't have an account?
          <Text style={styles.signup_text} onPress={handleSignup}>
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default Login;
