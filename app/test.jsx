import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
/*import DATA from "../../constants/groupsContent";*/
import { StatusBar } from "expo-status-bar";
import useFirestoreData from "../constants/firebasetest";
import Card from "../components/Card";
import { useState } from "react";

const Test = () => {
  const data = useFirestoreData();
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
    <SafeAreaView className=" h-full px-5 bg-secondary-100 pt-[20px]">
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="light" backgroundColor="#26282A" />
    </SafeAreaView>
  );
};

export default Test;
