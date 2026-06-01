import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../../utils/COLORS";

export default function CategoryFilteredItem({
  category,
  selectedCategory,
  setSelectedCategory,
  setFilters,
}) {
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setFilters({ categories: category._id === 0 ? [] : [category._id] });
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor:
          category._id === selectedCategory?._id ? COLORS.primaryDark : null,
      }}
      onPress={() => filterByCategory(category)}
    >
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    color: COLORS.white,
    padding: 8,
    fontWeight: "400",
  },
});
