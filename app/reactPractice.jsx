import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { firebase } from "../firebaseConfig";
import { doc } from "firebase/firestore";
import Chip  from "../components/Chip";

const Practice = () => {
  const [text, setText] = useState("");
  const [changeText, setChangeText] = useState([]);
  const [group, setGroup] = useState(null);
  const [activeChip, setActiveChip] = useState(null);
  const firestore = firebase.firestore();

  /*
  useEffect(() =>{
    try{
      const fetchGroup = async () => {
        const doc = await firestore.collection('Grops').doc()
    }
  })
*/
  const handleChipPress = (chip) => {
    setActiveChip(chip);
  };

  const chips = ["Chip 1", "chip 2", "chip 3"];

  const handleChange = (input) => {
    setText(input);
  };
  const changeTexts = () => {
    const newList = [...changeText, text];
    setChangeText(newList);
  };

  const todoRef = firebase.firestore().collection("todos");

  return (
    <View className="pl-[20px] pr-[20px]">
      <TextInput
        onChangeText={handleChange}
        placeholder="Create task"
        placeholderTextColor="#646464"
        numberOfLines={1}
        className="mt-[40px] ml-[12px] text-[20px] w-[260px] text-primary-100  font-plight"
      />

      <TouchableOpacity
        onPress={changeTexts}
        className="w-full h-[40px] bg-gray-100 items-center justify-center flex-row rounded-lg mt-[16px]"
      >
        <Text className="text-white-100">Add Task</Text>
      </TouchableOpacity>

      <View className="text-[24px]">
        {changeText.map((task) => {
          return <Text key={task.index}>{task}</Text>;
        })}
      </View>

      

      <View style={{ flexDirection: "row", padding: 20 }}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            isActive={activeChip === chip}
            onPress={() => handleChipPress(chip)}
          />
        ))}
      </View>
        

      
    </View>
  );
};

export default Practice;
