import Layout from "../../layout/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { addToCart, removeToCart, removeQtity } from "../../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../utils/COLORS";
import CustomButton from "../../components/shared/CustomButton";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPriceToCart);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.images?.[0].url }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Prix: {item.price}€</Text>
        <Text style={styles.productQuantity}>Quantité: {item.quantity}</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            onPress={() => dispatch(addToCart(item))}
            name="add-outline"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Ionicons
            onPress={() => dispatch(removeQtity(item))}
            name="remove-outline"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Ionicons
            onPress={() => dispatch(removeToCart(item))}
            name="trash-bin-outline"
            size={20}
            color="black"
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={styles.bannerRow}>
            <Text style={styles.bannerText}>Total</Text>
            <Text style={styles.bannerText}>Articles</Text>
          </View>
          <View style={styles.bannerRow}>
            <Text style={styles.bannerValue}>{totalPrice}€</Text>
            <Text style={styles.bannerValue}>{cart.length}</Text>
          </View>
        </View>
        {cart?.length > 0 ? (
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.cartEmpty}>
            <Text>Votre panier est vide</Text>
          </View>
        )}
        {cart?.length > 0 && (
          <CustomButton
            title="Passer la commander"
            style={styles.button}
            // action={() => dispatch(addToCart(product))}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  bannerValue: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  listContainer: {
    paddingTop: 70,
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 16,
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 70,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: COLORS.success,
    margin: 10,
    bottom: Platform.OS === "android" ? 40 : 60,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  cartEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
