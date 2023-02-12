import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const colors = {
  background_color: "black",
};

function VerifyRegisterUserOtp(props) {
  return (
    <View style={styles.container}>
      <View style={styles.second_container}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          onChangeText={(value) => setPassword(value)}
        />
        <Pressable title="Submit" style={styles.pressable_btn}>
          <Text style={styles.pressable_btn_text}>Submit</Text>
        </Pressable>

        <Pressable title="Resend" style={styles.pressable_btn}>
          <Text style={styles.pressable_btn_text}>Resend</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    flex: 1,
    top: -40,
    justifyContent: "center",
    alignItems: "center",
  },
  second_container: {
    color: "gray",
    width: "95%",
  },
  text_heading: {
    fontSize: 25,
    color: colors.background_color,
    fontStyle: "italic",
    textShadowColor: "gray",
    bottom: 100,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    bottom: 10,
  },

  input: {
    backgroundColor: "#eeeeee",
    padding: 10,
    paddingVertical: 13,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
  },
  pressable_btn: {
    marginTop: 10,
    paddingVertical: 13,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.background_color,
    alignItems: "center",
  },
  pressable_btn_text: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  bottom_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  forgot_btn: {
    top: 40,
    bottom: 40,
    fontWeight: "600",
    fontSize: 15,
    color: colors.background_color,
  },
  login_with_google_or_facebook: {
    width: "100%",
    flexDirection: "row",
    top: 40,
    justifyContent: "space-around",
  },
  pressable_btn_outlined: {
    top: 30,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.3,
    borderColor: "gray",
    backgroundColor: "white",
    paddingVertical: 10,
    width: "40%",
  },
  pressable_btn_text_outlined: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  png_icon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 5,
  },
  bottom_last_container: {
    marginTop: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "blue",
  },
  signup_text: {
    fontWeight: "600",
    fontSize: 15,
    color: colors.background_color,
  },
});

export default VerifyRegisterUserOtp;
