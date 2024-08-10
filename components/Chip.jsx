import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Chip = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20,
          marginRight: 10,
          backgroundColor: isActive ? "#76B7F2" : "#CECECE",
        },
      ]}
    >
      <Text style={{ color: isActive ? "#FFF" : "#000", fontWeight: "bold" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Chip;
