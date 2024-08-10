import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../firebaseConfig";
import { icons } from "../constants";
import { getUser } from "../hooks/useFile";


const CurrentUserMessage = ({ message, formattedTime }) => (
  <View
    className="w-[220px] mb-[20px] bg-secondary-200 border-primary border-t-0 border-r-[1.5px] border-l-[1.5px] border-b-[1.5px] rounded-lg"
    style={{ alignSelf: 'flex-end' }}
  >
    <View className="flex-row justify-between items-center">
      <Text className="ml-[8px] mt-[4px] text-primary mb-[4px] text-[10px] font-pregular"></Text>
      <Text className="ml-[8px] absolute -right-[-8px] mt-[4px] text-primary mb-[4px] text-[10px] font-pregular">
        {formattedTime}
      </Text>
    </View>
    <Text className="ml-[8px] mr-[8px] mt-[4px] mb-[16px] text-[12px] font-plight text-white-200">
      {message.messageText}
    </Text>
    
  </View>
);

const OtherUserMessage = ({ message, studentName, formattedTime }) => (
  <View
    className="w-[220px] mb-[20px] bg-secondary-200 border-gray-400 border-t-0 border-r-[0.5px] border-l-[0.5px] border-b-[0.5px] rounded-lg"
    style={{ alignSelf: 'flex-start' }}
  >
    <View className="flex-row justify-between items-center">
      <Text className="ml-[8px] mt-[4px] text-primary mb-[4px] text-[10px] font-pregular">
        {studentName || "Unknown"}
      </Text>
      <Text className="ml-[8px] mt-[4px] absolute -right-[-8px] text-primary mb-[4px] text-[10px] font-pregular">
        {formattedTime}
      </Text>
    </View>
    <Text className="ml-[8px] mr-[8px] mt-[4px] mb-[16px] text-[12px] font-plight text-white-200">
      {message.messageText}
    </Text>
  </View>
);

const GroupChat = () => {
  const route = useRoute();
  const { groupID, groupName, groupImageURL } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const firestore = firebase.firestore();
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

  useEffect(() => {
    const unsubscribe = firestore
      .collection("Messages")
      .where("groupID", "==", groupID)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const messagesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesList);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [groupID]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const documentSnapshot = await firestore
          .collection("Students")
          .doc("ugsWrSTWzWXlkEPKF8z8")
          .get();

        if (documentSnapshot.exists) {
          const studentData = documentSnapshot.data();
          setStudents(studentData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await firestore.collection("Messages").add({
        groupID,
        senderID: stuId,
        messageText: newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewMessage(" ");
    }
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderID === stuId;
    const timestamp = item.timestamp ? item.timestamp.toDate() : new Date();
    const formattedTime = `${timestamp.getHours()}:${timestamp.getMinutes() < 10 ? '0' : ''}${timestamp.getMinutes()}`;

    return isCurrentUser ? (
      <CurrentUserMessage message={item} formattedTime={formattedTime} />
    ) : (
      <OtherUserMessage
        message={item}
        studentName={students[item.senderID]?.userName}
        formattedTime={formattedTime}
      />
    );
  };

  return (
    <SafeAreaView className="pl-[20px] pr-[20px] pt-[20px] bg-secondary-100 h-full">
      <TouchableOpacity  onPress={() => navigation.goBack()}>
      <View className="flex-row w-full items-center mb-[20px]">
      <Image
            source={icons.leftArrow}
            className="w-[18px] h-[18px] rotate-180 mr-[8px]"
            resizeMode="contain"
            tintColor="#F9F9F9"
          />
      <Text className="text-[20px] text-white-100 font-psemibold">
        {groupName}
      </Text>
      </View>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#76B7F2" />
      ) : (
        <>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ref={flatListRef}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        <View className="flex-row items-center pb-[16px]">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          className="flex-1 bg-white-100 p-[12px] rounded-lg"
        />
        <TouchableOpacity onPress={handleSend} className="ml-[8px]">
          <Text className="text-white-200">Send</Text>
        </TouchableOpacity>
      </View>
        </>
        
      )}
      
    </SafeAreaView>
  );
};

export default GroupChat;
