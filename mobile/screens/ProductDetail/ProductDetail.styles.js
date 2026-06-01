import { Dimensions, Platform, StyleSheet } from "react-native";
import COLORS from "../../utils/COLORS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 10 : 50,
    left: Platform.OS === "android" ? 10 : 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
    zIndex: 999,
  },
  productImg: {
    // aspectRatio: 1,
    // resizeMode: "cover",
    height: 300,
    width: "100%",
  },
  productInfos: {
    width: Dimensions.get("window").width,
    backgroundColor: COLORS.white,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  productDetailTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },

  productName: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 20,
  },
  productDescription: {
    top: 20,
    marginBottom: 20,
    padding: 20,
  },

  desciption: {
    fontSize: 12,
  },
  productPrice: {
    alignSelf: "flex-end",
    top: 4,
    padding: 20,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    margin: 10,
    bottom: Platform.OS === "android" ? 50 : 70,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  buttonTitle: {
    fontSize: 15,
  },
});

export default styles;
