import { Platform, StyleSheet } from "react-native";
import COLORS from "./COLORS";


export default StyleSheet.create({
  statusBar: {
    paddingTop: Platform.OS === "android" ? 0 : 64,
    backgroundColor: COLORS.primary,
  },
  container: {
    padding: 5,
  },
  button: {},
  card: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
  textColor: "#444",
});
