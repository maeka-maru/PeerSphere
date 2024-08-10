import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CampaignCards from "../components/CampaignCards";
import useFirestoreData from "../constants/campaignGroupData";
import { StatusBar } from "expo-status-bar";
import { getUser } from "../hooks/useFile";

const TabTwo = () => {
  const [loading, setLoading] = useState(true);
  const [stuId, setStuId] = useState(" "); 
  const CAMPAIGNDATA = useFirestoreData(stuId, setLoading);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      if (userData) {
        setStuId(userData.studentNumber);
      }
    };

    fetchUserData();
  }, []);

  const Item = ({ item }) => (
    <View>
      {item.cards.map((card, index) => (
        <CampaignCards
          key={index}
          title={card.title}
          content={card.content}
          numberOfPeople={card.numberOfPeople}
          location={card.location}
        />
      ))}
    </View>
  );

  return (
    <View className="pl-[20px] pr-[20px] pt-[14px] bg-secondary-100 w-full h-full">
      {loading ? (
        <ActivityIndicator size="large" color="#76B7F2" />
      ) : (
        <FlatList
          data={CAMPAIGNDATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <StatusBar style="light" backgroundColor="#646464" />
    </View>
  );
};

export default TabTwo;
