import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import COLORS from "../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

export default function CardProduct({ product }) {
  const navigation = useNavigation();
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("ProductDetail", { product })}
    >
      <View style={styles.container}>
        <Image
          style={styles.productImg}
          source={{
            uri: product?.images?.[0].url,
          }}
        />
        <View style={{ padding: 4 }}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name.length > 25
              ? `${product.name.substring(0, 25)}...`
              : product.name}
          </Text>
          <Text style={styles.productPrice}>{product.price}€</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    // padding: 4,
    margin: 4,
    width: (WIDTH - 24) / 2,
  },
  productImg: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productName: {
    fontSize: 13,
  },
  productPrice: {
    fontWeight: "bold",
  },
});
