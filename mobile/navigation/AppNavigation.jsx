import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetail from "../screens/ProductDetail/ProductDetail";
import Home from "../screens/Home/Home";
import Contact from "../screens/Contact/Contact";
import ProductList from "../screens/ProductList/ProductList";
import CheckoutPage from "../screens/Checkout/Checkout"

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Checkout"
        component={CheckoutPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Contact"
        component={Contact}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductList"
        component={ProductList}
      />
    </Stack.Navigator>
  );
}
