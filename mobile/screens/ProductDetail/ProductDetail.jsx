import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ProductDetail.styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import COLORS from "../../utils/COLORS";
import RenderHtml from "react-native-render-html";
import CustomButton from "../../components/shared/CustomButton";
import { addToCart } from "../../redux/slices/cart";

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();

  const renderProductDetail = () => (
    <View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          style={styles.iconBack}
          name="chevron-back-outline"
          size={24}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <View>
        <Image
          style={styles.productImg}
          source={{ uri: product?.images?.[0].url }}
        />
      </View>
      <View style={styles.productInfos}>
        <View>
          <View style={styles.productDetailTop}>
            <Text style={styles.productName}>{product.name}</Text>
          </View>
          <View style={styles.productDescription}>
            <RenderHtml
              contentWidth={width}
              source={{ html: product.description }}
              tagsStyles={styles.description}
            />
          </View>
          <View style={styles.productPrice}>
            <Text style={styles.price}>{product.price}€</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[product]}
        renderItem={renderProductDetail}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <CustomButton
        title="Ajouter au panier"
        style={styles.button}
        action={() => dispatch(addToCart(product))}
        styleTitle={styles.buttonTitle}
      />
    </View>
  );
}
