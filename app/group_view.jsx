import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { firebase } from "../firebaseConfig";
import { icons } from "../constants";
import DATA from "../constants/projectContent";
import ProjectCard from "../components/ProjectCard";

const GroupView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [groupData, setGroupData] = useState({});
  const { groupId, numberOfPeople, content } = route.params;
  const firestore = firebase.firestore(); 

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const documentSnapshot = await firestore
          .collection('GroupData')
          .doc('x5M7AFGJnowVRFjSXl6c') 
          .get();

          console.log(groupId)

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          const groupInfo = data[groupId];
          setGroupData(groupInfo);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching group data: ", error);
      }
    };
    

    fetchGroupData();
  }, [groupId]);
  

  

  const Item = ({ item }) => (
    <View className="flex-row">
      {item.cards.map((card, index) => (
        <ProjectCard key={index} name={card.name} date={card.date} />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="bg-secondary-100 w-full h-full pl-[20px] pt-[20px] pr-[20px]">
      <TouchableOpacity  onPress={() => navigation.goBack()}>
        <View className="flex-row w-full items-center mb-[20px]">
          <Image
            source={icons.leftArrow}
            className="w-[16px] h-[16px] rotate-180 mr-[8px]"
            resizeMode="contain"
            tintColor="#F9F9F9"
          />
          <Text className="text-[20px] text-white-100 font-psemibold">
            {groupData ? groupData.name : 'Loading...'}
          </Text>
        </View>
      </TouchableOpacity>
      <View className="flex-row items-center">
        <Image
          source={{ uri: groupData.groupProfile }}
          className="w-[100px] h-[100px] rounded-[50px] mr-[16px]"
        />
        <View className="flex-col ">
          <Text
            className="text-[14px] text-white-200  font-plight flex"
            numberOfLines={1}
          >
            {content}
          </Text>
          <View className="flex-row  mt-[12px]">
            <Image
              source={icons.profile}
              className="w-[16px] h-[16px] text-white-200"
              resizeMode="contain"
              tintColor="#CECECE"
            />
            <Text className="ml-[6px] text-[12px] text-white-200 font-plight">
              {numberOfPeople}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-[32px]">
        <Text className="text-[20px] text-white-100 font-pregular ">
          Project History
        </Text>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default GroupView;
