import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout/Layout";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ProductList.styles";
import COLORS from "../../utils/COLORS";
import CardProduct from "../../components/shared/CardProduct";
import { fetchProductByCategory } from "../../redux/slices/products";

export default function ProductList({ navigation }) {
  const route = useRoute();
  const { category } = route.params;
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (category?._id) {
      dispatch(fetchProductByCategory(category?._id));
    }
  }, [category?._id]);

  return (
    <Layout>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() =>
          navigation.navigate("Home", { previousScreen: "ProductList" })
        }
      >
        <Ionicons
          style={styles.inconBack}
          name="chevron-back-outline"
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>
      <FlatList
        ListHeaderComponent={
          <>
            <Image
              style={styles.categoryImg}
              source={{ uri: category?.image?.url }}
            />
            <View style={styles.categoryTitleContainer}>
              <Ionicons name="chevron-forward" size={24} color="black" />
              <Text style={styles.categoryTitle}>{category.name}</Text>
            </View>
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => <CardProduct product={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </Layout>
  );
}
