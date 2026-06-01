import { Dimensions, Platform, StyleSheet } from "react-native";
import COLORS from "../../utils/COLORS";
const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  statusBar: {
    paddingTop: 64,
    backgroundColor: COLORS.primary,
  },
  appBar: {
    padding: Platform.OS === "android" ? 5 : 10,
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  containerTitleInfo: {
    display: "flex",
    alignItems: "center",
  },
  titleInfo: {
    fontWeight: "bold",
    fontSize: 10,
  },
  containerFlatRow: {
    backgroundColor: COLORS.primaryLigth,
    paddingVertical: 2,
  },
  titleRowInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.gray,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    width: WIDTH,
    // backgroundColor: COLORS.gray,
    paddingHorizontal: 2,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  containerFlatCol: {
    padding: 2,
  },
  containerFlatColProduct: {
    // backgroundColor: COLORS.white,
    padding: 2,
    // borderRadius: 10,
    // margin: 2,
  },
  containerFlatColScroll: {
    // marginHorizontal: 3,
    backgroundColor: COLORS.white,
  },
  productsContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
