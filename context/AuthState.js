import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CreateApiContext } from "./Apis";

const AuthState = ({ children }) => {
  const [User, setUser] = useState(() =>
    AuthTokenVar ? jwt_decode(JSON.parse(AuthTokenVar).access) : null
  );
  const [AuthTokenVar, setAuthTokenVar] = React.useState("");
  const [AuthToken, setAuthToken] = useState(() =>
    AuthTokenVar ? JSON.parse(AuthTokenVar) : null
  );
  const [Login, setLogin] = useState(AuthTokenVar ? "Logout" : "Login");

  const AsyncStorageFunction = async (type, key, value) => {
    try {
      if (type === "get") {
        const val = await AsyncStorage.getItem(key);
        setAuthTokenVar(val);
      } else if (type === "set") {
        await AsyncStorage.setItem(key, value);
      } else if (type === "remove") {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      return null;
    }
  };

  let LoginUser = async (e, info, props, next_page) => {
    console.log("login User...");
    let response = await CreateApiContext("/login/", "post", info);
    let data = await response.json();
    if (response.ok) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      setLogin("Logout");
      AsyncStorageFunction("set", "AuthToken", JSON.stringify(data));
      props?.navigation.navigate(next_page);
    } else console.log("unable to login...", data);
  };

  let RefreshUserAccess = async () => {
    let res = await CreateApiContext("/token/refresh/", "post", {
      refresh: AuthToken.refresh,
    });
    let data = await response.json();
    if (response.ok) {
      if (res.status === 200) {
        setAuthToken(res);
        setUser(jwt_decode(data.access));
        AsyncStorageFunction("set", "AuthToken", JSON.stringify(data));
      } else {
        LogoutUser();
      }
    } else console.log("unable to login...", data);
  };

  const LogoutUser = (props, next_page) => {
    setAuthToken(null);
    setUser(null);
    setLogin("Login");
    AsyncStorageFunction("remove", "AuthToken", "");
    AsyncStorageFunction("remove", "Cart", "");
    props?.navigation.navigate(next_page);
  };

  let userData = {
    user: User,
    AuthTokens: AuthToken,
    login: Login,
    loginUser: LoginUser,
    logoutUser: LogoutUser,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (AuthToken) {
        RefreshUserAccess();
        AsyncStorageFunction("get", "AuthToken", "");
      }
    }, 4 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [AuthToken]);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthState;
