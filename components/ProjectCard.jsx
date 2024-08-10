import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "../constants";

const ProjectCard = ({ name, date }) => {
  return (
    <View className="mr-[20px]">
      <TouchableOpacity>
        <Image
          source={images.finance}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />
        <Text className=" ml-[4px] text-[12px] text-white-200 font-plight">
          {name}
        </Text>
        <Text className=" ml-[4px] text-[10px] text-white-200 font-plight">
          {date}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectCard;
