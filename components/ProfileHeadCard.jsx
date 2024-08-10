import { View, Text, TouchableOpacity,ActivityIndicator, Image } from "react-native";
import React from "react";
import { icons } from "../constants"
import { getUser } from "../hooks/useFile";
import { useState, useEffect } from "react";

const ProfileHeadCard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser(); // Replace with actual function to get user data
        if (data) {
          setUserData(data);
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#76B7F2" />;
  }

  if (!userData) {
    return <Text>No user data available</Text>;
  }
  return (
    <View className="flex-row items-center" >
      <TouchableOpacity className="w-full bg-secondary-200 rounded-lg  flex-row border-t-0 border-r-[0.5px] border-l-[0.5px] border-b-[0.5px]  border-gray-400 mb-[8px] pt-[8px] pb-[8px]">
        <View className="ml-[12px] flex-col w-full">
        <Text className="text-[12px] text-primary font-plight ">
            User information
          </Text>          
          <Text className="text-[16px] text-white-100 font-pmedium mb-[20px] mt-[4px]">
            Username : {userData.username}
          </Text>
          <Text className="text-[14px] text-white-200 font-plight italic absolute -bottom-0 ">
            {userData.email}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeadCard;
