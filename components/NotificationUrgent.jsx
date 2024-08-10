import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";

const NotificationUrgent = ({ title, content, time, handlePress }) => {
  return (
    <View className=" w-[320px] bg-secondary-200 rounded-lg mt-[6px] mb-[6px]  border-l-[3px] pl-[11px] pr-[8px] pt-[16px] pb-[16px] border-red-100">
        
      <Text className="text-white-200 font-psemibold text-[12px] ">
        {title}
      </Text>
      <TouchableOpacity onPress={handlePress} className="absolute -right-[-8px] -top-[-8px]">
        <Image
          source={icons.cancel}
          className="w-[24px] h-[24px] "
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text numberOfLines={2} className="text-white-200 font-pextralight text-[10px] mt-[4px]">
        {content}
      </Text>
      <View className="flex-row-reverse">
        <Text
          numberOfLines={2}
          className="text-white-200 font-pextralight text-[10px]"
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export default NotificationUrgent;
