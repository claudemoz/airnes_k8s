import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../utils/COLORS";

const CustomButton = ({ title, action, style, styleTitle }) => {
  return (
    <TouchableOpacity style={{ ...styles.button, ...style }} onPress={action}>
      <Text style={{ ...styles.btnTitle, ...styleTitle }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  btnTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});
