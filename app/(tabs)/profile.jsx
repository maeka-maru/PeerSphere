import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeadCard from "../../components/ProfileHeadCard";
import { StatusBar } from "expo-status-bar";
import useLogIn from '../../hooks/useLogIn';

const Profile = () => {
  const { signOut } = useLogIn();
  return (
    <SafeAreaView className="pl-[20px] pr-[20px] pt-[20px] bg-secondary-100 h-full">
      <Text className="text-[24px] text-white-100 mb-[12px] font-psemibold">
        Profile
      </Text>
      <ProfileHeadCard />
      <TouchableOpacity
        onPress={signOut}
        className="bg-white-100 w-full items-center h-[44px] justify-center rounded-[12px] mt-[40px]"
      >
        <Text className="text-red-100 font-psemibold text-[14px]">Log out</Text>
      </TouchableOpacity>

      <StatusBar style="light" backgroundColor="#26282A" />
    </SafeAreaView>
  );
};

export default Profile;
