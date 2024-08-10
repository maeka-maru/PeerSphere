import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import { Link } from "expo-router";
import useSignUp from "../../hooks/useSignUp";
import { useNavigation } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, loading } = useSignUp();
  const navigation = useNavigation();

  const handleOnboard = async () => {
    if (password.length < 8) {
      setErrorMessage("Password should have 8 or more characters.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    const result = await signUp(email, password);
    if (result.success) {
      navigation.navigate("onboarding", { email });
    } else {
      setErrorMessage("This Email is already registered!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const isButtonDisabled = !email || !password || !confirmPassword || loading;

  return (
    <SafeAreaView className="bg-secondary-100 h-full pl-[20px] pr-[20px] pt-[10px]">
      <View className="flex-row items-center mb-[40px]">
        <Image
          source={icons.leftArrow}
          className="h-[18px] w-[10px] rotate-180 mr-[20px]"
          resizeMode="contain"
        />
        <Text className="text-white-100 font-pmedium text-[20px]">
          Create an account
        </Text>
      </View>
      {errorMessage ? (
        <View className="mb-[10px]">
          <Text className="font-pregular text-red-500 text-[14px] mt-[8px] mb-[4px]">
            {errorMessage}
          </Text>
        </View>
      ) : null}
      <View className="mb-[10px]">
        <Text className="font-pregular text-white-100 text-[14px] mb-[8px]">
          Email Address
        </Text>
        <View className="w-full border-[1px] rounded-[8px] border-white-100">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="What's your email address?"
            textContentType="emailAddress"
            placeholderTextColor="#a8a8a8"
            numberOfLines={1}
            className="ml-[12px] text-[12px] w-[260px] text-white-200 mt-[16px] mb-[16px] font-plight"
          />
        </View>
      </View>

      <View className="mb-[10px] mt-[10px]">
        <Text className="font-pregular text-white-100 text-[14px] mb-[8px]">
          Password
        </Text>
        <View className="w-full border-[1px] rounded-[8px] border-white-100">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Set a password"
            textContentType="password"
            secureTextEntry
            placeholderTextColor="#a8a8a8"
            numberOfLines={1}
            className="ml-[12px] text-[12px] w-[260px] text-white-200 mt-[16px] mb-[16px] font-plight"
          />
        </View>
      </View>

      <View className="mb-[40px] mt-[10px]">
        <Text className="font-pregular text-white-100 text-[14px] mb-[8px]">
          Confirm Password
        </Text>
        <View className="w-full border-[1px] rounded-[8px] border-white-100">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Please repeat the password"
            secureTextEntry
            placeholderTextColor="#a8a8a8"
            numberOfLines={1}
            className="ml-[12px] text-[12px] w-[260px] text-white-200 mt-[16px] mb-[16px] font-plight"
          />
        </View>
      </View>
      <TouchableOpacity
        className={`w-full items-center h-[44px] justify-center rounded-[12px] mb-[10px] ${
          isButtonDisabled ? "bg-gray-400" : "bg-primary"
        }`}
        onPress={handleOnboard}
        disabled={isButtonDisabled}
      >
        <Text className="text-white-100 font-psemibold text-[14px]">
          {loading ? "Signing Up..." : "Continue"}
        </Text>
      </TouchableOpacity>
      {/*

        <View className="flex-row justify-center items-center">
          <View className="w-[138px] bg-white-200 h-[1px]" />
          <Text className="mr-[16px] ml-[16px] font-pregular text-white-200 mt-[10px] mb-[10px]">
            or
          </Text>
          <View className="w-[138px] bg-white-200 h-[1px]" />
        </View>
        <TouchableOpacity className="bg-white-100 w-full items-center h-[44px] justify-center rounded-[12px] mt-[10px]">
          <View className="flex-row">
            <Image
              source={icons.Google}
              className="w-[18px] h-[18px] mr-[8px]"
              resizeMode="contain"
            />
            <Text className="text-gray-200 font-psemibold text-[14px]">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
      
      */}
      <View className="flex-row ml-[90px] mt-[76px]">
        <Text className="text-white-200 text-[10px] font-pregular mr-[4px]">
          Already have an account?
        </Text>
        <Link
          href="/log-in"
          className="text-primary text-[10px] font-pmedium ml-[4px]"
        >
          Log in
        </Link>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default SignUp;
