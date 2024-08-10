import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "../constants";

const SearchBar = ({placeholderText, extraStyling}) => {
  return (
    <View className="w-[320px] h-[40px] bg-gray-100 rounded-[8px] items-center flex-row bg-opacity-[25%] border-gray-200]">
      <Image
        source={icons.search}
        className="w-[16px] h-[16px] ml-[16px] "
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor="#939393"
        numberOfLines={1}
        className="ml-[12px] text-[12px] w-[260px] text-white-200 mt-1 font-plight "
        
      />
    </View>
  );
};

export default SearchBar;
