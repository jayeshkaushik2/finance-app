import { StyleSheet, Platform } from "react-native";

const colors = {
  background_color: "black",
  icon_color: "white",
};

const customAppBarStyles = {
  container: {
    backgroundColor: colors.background_color,
    height: 100,
  },
  search_bar_input: {
    fontSize: 17,
  },
  search_bar: {
    width: "85%",
    marginLeft: 4,
  },
  mic: { color: "white" },
};

const LoginActionStyles = {
  loginContainer: {
    flexDirection: "row",
    padding: 10,
  },
  btn: {
    width: "50%",
    backgroundColor: colors.background_color,
    marginRight: 5,
    borderRadius: 100,
  },
  btn_text: {
    paddingVertical: 10,
    fontSize: 17,
    width: "100%",
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const CustomerProfileStyles = {
  loginStyle: LoginActionStyles,
  cardStyle: { margin: 0, padding: 0, backgroundColor: "blue" },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    margin: 10,
  },
  name_text: { marginLeft: "auto", marginRight: "auto" },
  btnContainer: { padding: 20 },
  btnStyle: {
    marginBottom: 5,
    width: "100%",
    backgroundColor: "black",
    borderColor: "orange",
  },
  outlineBtnStyle: {
    marginBottom: 5,
    width: "100%",
    borderColor: colors?.background_color,
  },
  btnLabelStyle: {
    paddingVertical: 10,
  },
  avatar: { marginLeft: 10 },
  user_name: { top: 50, marginLeft: 40 },
};

const ProductCardStyles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    paddingBottom: 10,
    paddingTop: 10,
  },
  card: {
    width: "97%",
    height: 320,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  card_cover: {
    height: 200,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomEndRadius: 0,
  },
  card_action: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
  },
  add_to_cart_btn: {
    fontSize: 17,
    width: "100%",
    letterSpacing: 0.5,
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  add_to_cart_btn_label: {
    fontSize: 17,
    width: "50%",
    letterSpacing: 0.5,
    color: "white",
  },
  buy_btn: {
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  buy_btn_label: {
    fontSize: 17,
    width: "100%",
    letterSpacing: 0.5,
    color: "white",
  },
};

const CustomBottomAppbarStyles = {
  backgroundColor: "#e0e0e0",
};

const HomeCategoryStyles = {
  imgContainer: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginTop: "15%",
    marginLeft: 5,
  },
  items: {
    marginBottom: 2,
    marginRight: 25,
    marginLeft: 25,
  },
  catContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
};

const HomePageStyles = {
  container: {
    height: "100%",
  },
};

const MainTheme = {
  height: "100%",
  backgroundColor: "#e0e0e0",
};

const CommonStyles = () => {
  const styles = StyleSheet.create({
    MainTheme: MainTheme,
    container: {
      fontSize: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    second_container: {
      color: "gray",
      width: "95%",
    },
    text_heading: {
      fontSize: 30,
      color: colors.background_color,
      fontStyle: "italic",
      textShadowColor: "gray",
      fontWeight: "bold",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: "gray",
      bottom: 10,
    },
    custom_outlineStyle: {
      borderRadius: 10,
    },
    input: {
      backgroundColor: "#e0e0e0",
      padding: 10,
      paddingVertical: 10,
      borderRadius: 15,
      fontSize: 16,
      marginTop: 6,
      marginBottom: 6,
    },
    custom_btn: {
      top: 15,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: colors.background_color,
      alignItems: "center",
    },
    custom_btn_text: {
      fontSize: 17,
      paddingVertical: 10,
      fontWeight: "bold",
      letterSpacing: 0.5,
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

    colors: colors,

    CustomAppBar: customAppBarStyles,

    CustomBottomAppbarStyles: CustomBottomAppbarStyles,

    HomeCategory: HomeCategoryStyles,

    HomePageStyles: HomePageStyles,

    CustomerProfileStyles: CustomerProfileStyles,

    ProductCardStyles: ProductCardStyles,
  });

  return styles;
};

export default CommonStyles;
