import { View, Text, StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabOne from "../tabOne";
import TabTwo from "../tabTwo";
import { SafeAreaView } from "react-native";

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: "#26282A"},
        tabBarActiveTintColor: "#76B7F2",
        tabBarInactiveTintColor: "#CECECE",
        tabBarLabelStyle: {fontWeight: 'bold', textTransform: "capitalize"},
        tabBarIndicatorStyle: {backgroundColor: "#76B7F2", height: 3},
        lazy: true, // Enable lazy loading
        detachInactiveScreens: true, // Enable detaching inactive screens
      }}
      style={{ marginTop: StatusBar.currentHeight }}
    >
      <Tab.Screen
        name="Tab 1"
        component={TabOne}  
        options={{
          tabBarLabel: "Discover",
        }}
      />
      <Tab.Screen
        name="Tab 2"
        component={TabTwo}
        options={{
          tabBarLabel: "Campaigns",
        }}
      />
    </Tab.Navigator>
    <StatusBar style="light" backgroundColor="#26282A" />
    </>
  );
};

export default Home;
