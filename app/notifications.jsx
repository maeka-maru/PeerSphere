import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import NotificationRegular from "../components/NotificationRegular";
import NotificationUrgent from "../components/NotificationUrgent";
import SearchBar from "../components/SearchBar";
import NOTIFICATIONDATA from "../constants/notificationData";
import { StatusBar } from "expo-status-bar";

const Notifications = () => {
  const Item = ({ item }) => (
    <View>
      {item.notificationsRegular.map((notification, index) => (
        <NotificationRegular
          key={index}
          title={notification.title}
          content={notification.content}
          time={notification.time}
        />
      ))}
      {item.notificationsUrgent.map((notification, index) => (
        <NotificationUrgent
          key={index}
          title={notification.title}
          content={notification.content}
          time={notification.time}
        />
      ))}
    </View>
  );
  return (
    <SafeAreaView className="pl-[20px] pr-[20px] pt-[20px] h-full bg-secondary-100">
      <TouchableOpacity className="flex-row items-center ">
        <Image
          source={icons.leftArrow}
          className="w-[16px] h-[16px] rotate-180 mr-[8px]"
          resizeMode="contain"
          tintColor="#F9F9F9"
        />

        <Text className="text-[20px] text-white-100 font-psemibold">
          Notifications
        </Text>
      </TouchableOpacity>
      <View className="mb-[32px] mt-[12px]">
        <SearchBar placeholderText="Search for notification by a group name" />
      </View>
      <Text className="text-[14px] mb-[20px] text-white-100 font-pmedium">
        Today
      </Text>
      <FlatList
        data={NOTIFICATIONDATA}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="light" backgroundColor="#26282A" />
      
    </SafeAreaView>
  );
};

export default Notifications;
