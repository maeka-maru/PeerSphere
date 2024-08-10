import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "../constants";
import { useNavigation } from "@react-navigation/native";

const ChatGroups = ({ groupID, groupName, day, time, groupImageUrl }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("group_chat", { groupID, groupName, groupImageUrl });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        className="w-full bg-secondary-200 rounded-lg flex-row border-t-0 border-r-[0px] border-l-[0px] border-b-[0.5px] border-gray-400 mb-[8px] pt-[8px] pb-[8px]"
      >
        <Image
          source={{ uri: groupImageUrl }}
          className="w-[52px] h-[52px] rounded-[50px] mr-[12px] ml-[8px]"
        />
        <View className="flex-col">
          <Text className="text-[16px] text-white-100 font-pmedium">
            {groupName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatGroups;
