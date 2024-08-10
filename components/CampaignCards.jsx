import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { firebase } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getUser } from "../hooks/useFile";
const CampaignCards = ({
  title,
  content,
  location,
  numberOfPeople,
  
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
  
  const handleJoin = async () => {
    const firestore = firebase.firestore();
    const groupRef = firestore.collection("Groups").doc("oU79ie60uZHbZ2fGRSif");
    const studentRef = firestore
      .collection("Students")
      .doc("ugsWrSTWzWXlkEPKF8z8");

    try {
      
      await firestore.runTransaction(async (transaction) => {
        const groupDoc = await transaction.get(groupRef);
        if (!groupDoc.exists) {
          throw new Error("Group does not exist!");
        }

        const groupData = groupDoc.data();
        if (!Array.isArray(groupData[title].members)) {
          throw new Error("Group members field is missing or invalid");
        }

        if (!groupData[title].members.includes(stuId)) {
          groupData[title].members.push(stuId);
          groupData[title].numberOfPeople = groupData[title].members.length;
          groupData[title].verified = groupData[title].members.length >= 5;

          transaction.update(groupRef, { [title]: groupData[title] });
        }
      });

     
      await firestore.runTransaction(async (transaction) => {
        const studentDoc = await transaction.get(studentRef);
        if (!studentDoc.exists) {
          throw new Error("Student does not exist!");
        }

        const studentData = studentDoc.data();
        const groupData = (await transaction.get(groupRef)).data();
        const groupField = groupData[title].verified
          ? "legitGroups"
          : "campaignGroups";

        const groupId = groupData[title].groupId;

        if (!studentData[stuId]) {
          studentData[stuId] = { legitGroups: [], campaignGroups: [] };
        }

        if (!studentData[stuId][groupField].includes(groupId)) {
          studentData[stuId][groupField].push(groupId);
          transaction.update(studentRef, { [stuId]: studentData[stuId] });
        }
      });

      console.log("Successfully joined the group");
    } catch (error) {
      console.error("Error joining the group: ", error);
    }
  };
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
        <View className="w-full h-[0.5px]  bg-white-200 mt-[4px]" />
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
            />
            <Text className="ml-[6px] text-[10px] text-white-200 font-plight">
              {numberOfPeople} / 5
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
            onPress={handleJoin}
            className="w-[80px] h-[32px] bg-primary items-center justify-center flex-row rounded-lg mt-[16px]"
          >
            <Text className="text-white-100">Join</Text>
            <Image
              source={icons.add}
              className="w-[8px] h-[8px] ml-[4px]"
              resizeMode="contain"
              tintColor={"#ebebeb"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleView}
            className=" absolute -right-0 w-[80px] h-[32px] bg-gray-100 items-center justify-center flex-row rounded-lg mt-[16px]"
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

export default CampaignCards;
