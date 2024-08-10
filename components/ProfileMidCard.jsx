import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";
import { useRouter } from "expo-router";

const ProfileMidCard = () => {
  const router = useRouter();
  return (
    <View className="w-full bg-secondary-200 rounded-lg  border-t-0 border-r-[0.5px] border-l-[0.5px] border-b-[0.5px]  border-gray-400 mt-[32px] pt-[12px] pb-[12px] flex-col">
      <TouchableOpacity 
      onPress={() => router.push('/account')}
      className="w-full">
        <View className="flex-row ml-[16px] items-center">
          <Image
            source={icons.profileThin}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
          />
          <Text className="text-[14px] font-pregular text-white-100 ml-[16px]">
            Account
          </Text>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-[10px] h-[10px] absolute  -right-[-16px]"
          />
        </View>
      </TouchableOpacity>
      <View className="w-[252px] h-[0.5px] ml-[50px] bg-gray-400 mt-[12px]" />
      <TouchableOpacity className="w-full">
        <View className="flex-row mt-[12px] ml-[16px] items-center">
          <Image
            source={icons.security}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
          />
          <Text className="text-[14px] font-pregular text-white-100 ml-[16px]">
            Privacy
          </Text>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-[10px] h-[10px] absolute  -right-[-16px]"
          />
        </View>
      </TouchableOpacity>
      <View className="w-[252px] h-[0.5px] ml-[50px] bg-gray-400 mt-[12px]" />
      <TouchableOpacity className="w-full">
        <View className="flex-row mt-[12px] ml-[16px] items-center">
          <Image
            source={icons.information}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
          />
          <Text className="text-[14px] font-pregular text-white-100 ml-[16px]">
            Help and Support
          </Text>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-[10px] h-[10px] absolute  -right-[-16px]"
          />
        </View>
      </TouchableOpacity>
      <View className="w-[252px] h-[0.5px] ml-[50px] bg-gray-400 mt-[12px]" />
      <TouchableOpacity className="w-full">
        <View className="flex-row mt-[12px] ml-[16px] items-center">
          <Image
            source={icons.question}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
          />
          <Text className="text-[14px] font-pregular text-white-100 ml-[16px]">
            About
          </Text>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-[10px] h-[10px] absolute  -right-[-16px]"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMidCard;
