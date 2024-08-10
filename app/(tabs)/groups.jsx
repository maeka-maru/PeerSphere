import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import LikedCards from "../../components/LikedCards";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirestoreData from "../../constants/groupsContent";
import { StatusBar } from "expo-status-bar";
import { getUser } from "../../hooks/useFile";

const Groups = () => {
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
        <LikedCards
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
    <SafeAreaView className="h-full px-5 bg-secondary-100 pt-[20px]">
      {loading ? (
        <ActivityIndicator size="large" color="#76B7F2"/>
      ) : (
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <StatusBar style="light" backgroundColor="#26282A" />
    </SafeAreaView>
  );
};

export default Groups;
