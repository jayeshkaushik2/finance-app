import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

//local imports
import Login from "./AuthScreens/Login";
import ForgotPassword from "./AuthScreens/ForgotPassword";
import VerifyForgotPassOtp from "./AuthScreens/VerifyForgotPassOtp";
import Register from "./AuthScreens/Register";
import VerifyRegisterUserOtp from "./AuthScreens/VerifyRegisterUserOtp";
import AuthState from "./context/AuthState";
import Incomes from "./screens/Incomes";
import Home from "./screens/Home";
import Spendings from "./screens/Spendings";
import AppBar from "./components/AppBar";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthState>
          <AppBar />
          <Stack.Navigator initialRouteName="home">
            {/* authentication pages start */}
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="forgot_password"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="verify_forgotpass_otp"
              component={VerifyForgotPassOtp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="verify_newuser_otp"
              component={VerifyRegisterUserOtp}
              options={{ headerShown: false }}
            />
            {/* authentication pages end */}
            {/* home pages start */}
            <Stack.Screen
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="incomes"
              component={Incomes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="spendings"
              component={Spendings}
              options={{ headerShown: false }}
            />
            {/* home pages end */}
          </Stack.Navigator>
        </AuthState>
      </NavigationContainer>
    </PaperProvider>
  );
}
