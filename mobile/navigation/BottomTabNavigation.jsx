import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Cart from "../screens/Cart/Cart";
import Search from "../screens/Search/Search";
import COLORS from "../utils/COLORS";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./AppNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const { totalProductToCart, totalPriceToCart, cart } = useSelector(
    (state) => state.cart
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: Platform.OS === "android" ? 50 : 70,
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? COLORS.white : COLORS.gray}
            />
          ),
        }}
        name="App navigation"
        component={AppNavigation}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={focused ? COLORS.white : COLORS.gray}
            />
          ),
        }}
        name="search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.cartIconContainer}>
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={focused ? COLORS.white : COLORS.gray}
              />
              {totalProductToCart > 0 && (
                <View style={styles.productToCart}>
                  <Text style={styles.totalProductToCart}>
                    {totalProductToCart}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
        name="cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? COLORS.white : COLORS.gray}
            />
          ),
        }}
        name="profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  cartIconContainer: {
    position: "relative",
  },
  productToCart: {
    position: "absolute",
    top: -5,
    left: 17,
    backgroundColor: COLORS.danger,
    color: COLORS.white,
    padding: 4,
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  totalProductToCart: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 12,
  },
});
