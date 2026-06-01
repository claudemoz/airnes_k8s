import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CategoryListItem({ category }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("ProductList", { category })}
      style={styles.container}
    >
      <Image
        style={styles.categoryImg}
        source={{
          uri: category.image.url,
        }}
      />
      <Text style={styles.categoryName} numberOfLines={1}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    flex: 1,
    maxWidth: `${100 / 5}%`,
  },
  categoryImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  categoryName: {
    fontSize: 10,
  },
});
