import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Menu, Button, Provider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firebase } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUser } from "../hooks/useFile";


const CustomPicker = ({ label, selectedValue, onValueChange, items }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View className="w-full mt-[24px]">
      <Text className="font-pmedium text-white-100 text-[18px]">{label}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            onPress={openMenu}
            className="w-full border-[1px] mt-[12px] rounded-[8px] border-white-100"
          >
            <Text
              className={`ml-[12px] text-[12px] mt-[16px] mb-[16px] font-plight ${
                selectedValue ? "text-white-100" : "text-[#646464]"
              }`}
            >
              {selectedValue ? selectedValue : `Select ${label}`}
            </Text>
          </TouchableOpacity>
        }
      >
        {items.map((item, index) => (
          <Menu.Item
            key={index}
            onPress={() => {
              onValueChange(item.value);
              closeMenu();
            }}
            title={item.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const OnBoarding = () => {
  const [courseType, setCourseType] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const isButtonDisabled = !courseType || !courseName || !studentNumber;
  const route = useRoute();

  const email = route.params?.email;
  const db = firebase.firestore();

  const handleNext = async () => {
    if (isButtonDisabled) return;

    setLoading(true);

    const prefixedStudentNumber = `stu${studentNumber}`;

    try {
      const userData = {
        email,
        courseType,
        courseName,
        studentNumber: prefixedStudentNumber,
        username
      }
      await db.collection("Users").add(userData);

      await saveUser(userData);

      navigation.navigate("(tabs)", { screen: "home" });
    } catch (error) {
      console.error("Error saving user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Provider>
      <SafeAreaView className="bg-secondary-100 h-full pl-[20px] pr-[20px] pt-[32px]">
        <CustomPicker
          label="What Program are you enrolled in?"
          selectedValue={courseType}
          onValueChange={(itemValue) => setCourseType(itemValue)}
          items={[
            { label: "Bachelor", value: "Bachelor" },
            { label: "Diploma", value: "Diploma" },
            { label: "Certificate", value: "Certificate" },
          ]}
        />
        <CustomPicker
          label="What course do you take?"
          selectedValue={courseName}
          onValueChange={(itemValue) => setCourseName(itemValue)}
          items={[
            { label: "Select Course Name", value: "" },
            { label: "Nursing", value: "Nursing" },
            { label: "Computer Science", value: "Computer Science" },
            { label: "IT", value: "IT" },
            { label: "Education", value: "Education" },
          ]}
        />
        <Text className="font-pmedium mt-[32px] text-white-100 text-[18px]">
          What is your student number?
        </Text>
        <View className="w-full border-[1px] mt-[12px] rounded-[8px] border-white-100">
          <TextInput
            placeholder="47000"
            placeholderTextColor="#646464"
            value={studentNumber}
            onChangeText={setStudentNumber}
            keyboardType="numeric"
            className="ml-[12px] text-[12px] w-[260px] text-white-100 mt-[16px] mb-[16px] font-plight"
          />
        </View>
        <Text className="font-pmedium mt-[32px] text-white-100 text-[18px]">
          Choose a username
        </Text>
        <View className="w-full border-[1px] mt-[12px] rounded-[8px] border-white-100">
          <TextInput
            placeholder="Username"
            placeholderTextColor="#646464"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            className="ml-[12px] text-[12px] w-[260px] text-white-100 mt-[16px] mb-[16px] font-plight"
          />
        </View>
        <TouchableOpacity
          className={`w-full items-center h-[44px] justify-center rounded-[12px] mt-[40px] ${
            isButtonDisabled ? "bg-gray-400" : "bg-primary"
          }`}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text className="text-white-100 font-psemibold text-[14px]">
            {loading ? "Setting Up Profile..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Provider>
  );
};

export default OnBoarding;
