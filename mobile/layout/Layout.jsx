import { Platform, StatusBar, View, StyleSheet } from "react-native";
import STYLES from "../utils/STYLES";
import COLORS from "../utils/COLORS";
import { useRoute } from "@react-navigation/native";

export default function Layout({ children }) {
  const route = useRoute();
  console.log("route ", route);
  const dynamicStatusBarStyle = {
    paddingTop:
      Platform.OS === "android"
        ? ["ProductList"].includes(route.name)
          ? 35
          : 0
        : ["ProductList"].includes(route.name)
        ? 90
        : 64,
  };
  return (
    <>
      {/* {Platform.OS === "android" ? (
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      ) : (
        <View style={STYLES.statusBar}></View>
      )} */}
      <View style={[styles.statusBar, dynamicStatusBarStyle]}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      </View>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: COLORS.primary,
  },
});
