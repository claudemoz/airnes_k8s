import { Dimensions, Platform, StyleSheet } from "react-native";
import COLORS from "../../utils/COLORS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 5 : 50,
    left: Platform.OS === "android" ? 10 : 20,
    // backgroundColor: "rgba(255, 255, 255, 0.8)",
    // borderRadius: 20,
    // padding: 5,
    zIndex: 999,
  },

  categoryImg: {
    height: 150,
    width: "100%",
  },
  categoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    marginBottom: 20,
  },
  categoryTitle: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
  },

  containerFlatColProduct: {
    padding: 2,
  },
});

export default styles;
