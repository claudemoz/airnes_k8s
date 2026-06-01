import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./Home.styles";
import Layout from "../../layout/Layout";
import COLORS from "../../utils/COLORS";

import { fetchCategories } from "../../redux/slices/categories";
import { fetchProducts } from "../../redux/slices/products";

import Carousel from "./components/Carousel";
import CategoryFilteredItem from "./components/CategoryFilteredItem";
import CategoryItem from "./components/CategoryItem";
import CardProduct from "../../components/shared/CardProduct";

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  const initFilters = { categories: [] };
  const [filters, setFilters] = useState(initFilters);
  const [selectedCategory, setSelectedCategory] = useState({
    _id: 0,
    name: "Toutes",
  });

  const categoriesFilteredList = useMemo(
    () => [
      { _id: 0, name: "Toutes" },
      ...[...categories].sort((a, b) => a.name.localeCompare(b.name)),
    ],
    [categories]
  );

  const categoriesList = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (route.previousScreen === "ProductList") {
      dispatch(fetchProducts(filters));
    } else {
      dispatch(fetchProducts(filters));
    }
  }, [filters, route]);

  const renderCategoryFilteredItem = ({ item }) => (
    <CategoryFilteredItem
      category={item}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      setFilters={setFilters}
    />
  );

  const renderCategoryItem = ({ item }) => <CategoryItem category={item} />;

  const renderProductItem = ({ item }) => <CardProduct product={item} />;

  return (
    <Layout>
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>ÀIRNEIS</Text>
        <Ionicons
          onPress={() => navigation.navigate("Contact")}
          name="mail-outline"
          size={24}
          color="black"
        />
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <FlatList
              data={categoriesFilteredList}
              renderItem={renderCategoryFilteredItem}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.containerFlatRow}
            />
            <Carousel />
            <View style={styles.titleRowInfo}>
              <Text style={styles.titleInfo}>
                VENANT DES HAUTES TERRES D'ECOSSE NOS MEUBLES SONT IMMORTELES
              </Text>
            </View>
            <FlatList
              data={categoriesList}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item._id}
              numColumns={5}
              showsHorizontalScrollIndicator={false}
              style={styles.containerFlatCol}
            />
          </>
        )}
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        style={{
          margin: 0,
          ...styles.containerFlatColProduct,
          margin: 0,
        }}
      />
    </Layout>
  );
}
