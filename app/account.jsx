import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useLogIn from "../hooks/useLogIn";
import useAuth from "../hooks/useAuth";
import { icons } from "../constants";

const Account = () => {
  const { signOut } = useLogIn();
  const { user } = useAuth(); // Retrieve user from useAuth
  const navigation = useNavigation();

  return (
    <SafeAreaView className="pl-[20px] pr-[20px] pt-[20px] bg-secondary-100 h-full">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View className="flex-row w-full items-center mb-[20px]">
          <Image
            source={icons.leftArrow}
            className="w-[16px] h-[16px] rotate-180 mr-[8px]"
            resizeMode="contain"
            tintColor="#F9F9F9"
          />
          <Text className="text-[20px] text-white-100 font-psemibold">
            Account
          </Text>
        </View>
      </TouchableOpacity>

      {/* Conditionally render based on user */}
      {user ? (
        <>
          <View className="mb-[20px]">
            <Text className="text-[16px] text-primary font-psemibold">
              Username: {user.username}
            </Text>
            <Text className="text-[14px] text-white-200">
              Email: {user.email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={signOut}
            className="w-full bg-secondary-200 rounded-lg flex-row border-t-0 border-r-[0.5px] border-l-[0.5px] border-b-[0.5px] border-gray-400 mb-[8px] pt-[8px] pb-[8px]"
          >
            <View className="flex-col w-full">
              <Text className="text-[16px] text-primary font-psemibold">
                Log Out
              </Text>
              <Text className="text-[12px] text-white-200 font-pregular absolute -bottom-0">
                Would you like to log out of your account?
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-full bg-secondary-200 rounded-lg flex-row border-t-0 border-r-[0.5px] border-l-[0.5px] border-b-[0.5px] border-gray-400 mb-[8px] pt-[8px] pb-[8px]">
            <View className="flex-col w-full">
              <Text className="text-[16px] text-red-100 font-psemibold">
                Delete Account
              </Text>
              <Text className="text-[12px] text-white-200 font-pregular absolute -bottom-0">
                Would you like to delete your account?
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-[16px] text-white-200">
          No user is signed in.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Account;
