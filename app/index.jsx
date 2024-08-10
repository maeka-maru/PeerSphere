import { View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar";
import { router } from 'expo-router';
import useAuth from '../hooks/useAuth';
export default function () {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <SafeAreaView className="bg-secondary-100 h-full pl-[20px] pr-[20px] justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-secondary-100 h-full pl-[20px] pr-[20px] justify-center items-center">
      <Text className="text-white-100 text-[40px] font-psemibold mb-[60px]">PeerSphere</Text>
      {!user ? (
        <>
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/sign-up')}
            className="bg-primary w-full items-center h-[44px] justify-center rounded-[12px] mb-[10px]">
            <Text className="text-white-100 font-psemibold text-[14px]">
              Sign up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center items-center">
            <View className="w-[138px] bg-white-200 h-[1px]" />
            <Text className="mr-[16px] ml-[16px] font-pregular text-white-200 mt-[10px] mb-[10px]">or</Text>
            <View className="w-[138px] bg-white-200 h-[1px]" />
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/log-in')}
            className="bg-white-100 w-full items-center h-[44px] justify-center rounded-[12px] mt-[10px]">
            <Text className="text-gray-200 font-psemibold text-[14px]">
              Log in
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-white-100">Welcome, {user.email}</Text>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  )
}
