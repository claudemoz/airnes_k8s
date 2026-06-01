import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "./utils/COLORS";
import { Provider } from "react-redux";
import store from "./redux/store";
import BottomTabNavigation from "./navigation/BottomTabNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
});
