import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import useFirestoreData from "../constants/discoverContent";
import { StatusBar } from "expo-status-bar";
import { getUser } from "../hooks/useFile";

const TabOne = () => {
  const [loading, setLoading] = useState(true);
  const [stuId, setStuId] = useState(" "); 
  const DATA = useFirestoreData(stuId, setLoading);

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
        <Card
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
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <StatusBar style="light" backgroundColor="#646464" />
    </View>
  );
};

export default TabOne;
