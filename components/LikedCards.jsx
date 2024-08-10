import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { firebase } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../hooks/useFile";
import { useState, useEffect } from "react";

const LikedCards = ({
  title,
  content,
  location,
  numberOfPeople,
  handlePress,
}) => {
  const [stuId, setStuId] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      if (userData) {
        setStuId(userData.studentNumber);
      }
    };

    fetchUserData();
  }, []);

  const handleView = async () => {
    const firestore = firebase.firestore();
    const groupRef = firestore.collection("Groups").doc("oU79ie60uZHbZ2fGRSif");

    try {
      const groupDoc = await groupRef.get();
      if (groupDoc.exists) {
        const groupData = groupDoc.data();
        const groupInfo = groupData[title];
        navigation.navigate("group_view", {
          groupId: groupInfo.groupId,
          numberOfPeople,
          content,
        });
      } else {
        console.error("Group does not exist!");
      }
    } catch (error) {
      console.error("Error fetching group data: ", error);
    }
  };
  return (
    <View className=" w-full bg-secondary-200 rounded-lg mt-[6px] mb-[6px] border-t-0 border-r-[0.5px] border-l-[0.5px] border-b-[0.5px] border-gray-400">
      <View className="mr-4 ml-4 mt-[16px] mb-[16px]">
        <Text className="text-[16px] text-white-100 font-pregular">
          {title}
        </Text>
        <View className="w-full h-[0.5px] bg-white-200 mt-[4px]" />
        <Text
          numberOfLines={1}
          className="text-[12px] text-white-200 mt-1 font-pextralight"
        >
          {content}
        </Text>
        <View className="w-full h-[0.5px] bg-white-200 mt-[4px] " />
        <View className="mt-[12px] flex-row">
          <View className="flex-row ">
            <Image
              source={icons.profile}
              className="w-[16px] h-[16px] text-white-200"
              resizeMode="contain"
              tintColor={"#ebebeb"}
            />
            <Text className="ml-[6px] text-[10px] text-white-200 font-plight">
              {numberOfPeople}
            </Text>
          </View>

          <View className="flex-row absolute  -right-0">
            <Image
              source={icons.location}
              className="w-[16px] h-[16px]"
              resizeMode="contain"
              tintColor={"#ebebeb"}
            />
            <Text className="ml-[6px] text-[10px] text-white-200 font-plight">
              {location}
            </Text>
          </View>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            onPress={handleView}
            className="w-full h-[32px] bg-gray-100 items-center justify-center flex-row rounded-lg mt-[16px]"
          >
            <Text className="text-white-100">View</Text>
            <Image
              source={icons.leftArrow}
              className="w-[8px] h-[8px] ml-[4px]"
              resizeMode="contain"
              tintColor={"#ebebeb"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LikedCards;
