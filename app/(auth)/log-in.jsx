import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import useLogIn from "../../hooks/useLogIn";
import { Link, useNavigation } from "expo-router";
import { firebase } from "../../firebaseConfig";
import { saveUser } from "../../hooks/useFile";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { logIn, loading } = useLogIn();
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogIn = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setEmail("");
      setPassword("");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password should have 8 or more characters.");
      setPassword("");
      return;
    }

    const result = await logIn(email, password);
    if (result.success) {
      try {
        const userDoc = await firebase
          .firestore()
          .collection("Users")
          .where("email", "==", email)
          .get();
        const userData = userDoc.docs[0]?.data();

        if (userData) {
          const { studentNumber, username } = userData;
          const userToSave = { email, studentNumber, username };
          console.log(userToSave);

          await saveUser(userToSave);
          navigation.navigate("(tabs)", { screen: "home" });
        } else {
          setErrorMessage("User data not found.");
        }
      } catch (error) {
        setErrorMessage("Failed to retrieve user data.");
        console.error("Error saving user data: ", error);
      }
    } else {
      setErrorMessage(result.error);
      setEmail("");
      setPassword("");
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

  const isButtonDisabled = !email || !password || loading;

  return (
    <SafeAreaView className="bg-secondary-100 h-full pl-[20px] pr-[20px] pt-[10px]">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View className="flex-row items-center mb-[40px]">
          <Image
            source={icons.leftArrow}
            className="h-[18px] w-[10px] rotate-180 mr-[20px]"
            resizeMode="contain"
          />
          <Text className="text-white-100 font-pmedium text-[20px]">
            Access your account
          </Text>
        </View>
      </TouchableOpacity>

      {errorMessage ? (
        <View className="mb-[10px]">
          <Text className="font-pregular text-red-500 text-[14px] mb-[8px]">
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

      <View className="mb-[40px] mt-[10px]">
        <Text className="font-pregular text-white-100 text-[14px] mb-[8px]">
          Password
        </Text>
        <View className="w-full border-[1px] rounded-[8px] border-white-100">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            textContentType="password"
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
        onPress={handleLogIn}
        disabled={isButtonDisabled}
      >
        <Text className="text-white-100 font-psemibold text-[14px]">
          {loading ? "Logging In..." : "Continue"}
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
      </TouchableOpacity> */}
      <View className="flex-row ml-[90px] mt-[76px]">
        <Text className="text-white-200 text-[10px] font-pregular mr-[4px]">
          Don't have an account?
        </Text>
        <Link
          href="/sign-up"
          className="text-primary text-[10px] font-pmedium ml-[4px]"
        >
          Sign Up
        </Link>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default LogIn;
