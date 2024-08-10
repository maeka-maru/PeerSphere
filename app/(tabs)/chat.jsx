import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ChatGroups from "../../components/ChatGroups";
import { firebase } from "../../firebaseConfig";
import { getUser } from "../../hooks/useFile";

const Chat = () => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stuId, setStuId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user information to get stuId
        const userData = await getUser();
        if (!userData || !userData.studentNumber) {
          throw new Error("User data or stuId is missing");
        }
        const currentStuId = userData.studentNumber;
        setStuId(currentStuId);

        // Real-time listener for student document
        const firestore = firebase.firestore();
        const studentRef = firestore
          .collection("Students")
          .doc("ugsWrSTWzWXlkEPKF8z8");

        const unsubscribe = studentRef.onSnapshot(async (snapshot) => {
          if (!snapshot.exists) {
            throw new Error("Student document does not exist!");
          }

          const studentData = snapshot.data();
          const studentField = studentData[currentStuId];

          if (!studentField) {
            throw new Error("Student data not found in document!");
          }

          const { legitGroups } = studentField; // Get legitGroups only

          if (!legitGroups || legitGroups.length === 0) {
            setChatData([]);
            return;
          }

          // Fetch group data based on the IDs
          const groupPromises = legitGroups.map((id) =>
            firestore.collection("ChatGroups").doc(id).get()
          );
          const groupDocs = await Promise.all(groupPromises);
          const groups = groupDocs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setChatData(groups);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching chat data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <ChatGroups
      groupID={item.id}
      groupName={item.groupName}
      day={item.day}
      time={item.time}
      groupImageUrl={item.groupImageUrl}
    />
  );

  return (
    <SafeAreaView className="pl-[20px] pr-[20px] pt-[20px] bg-secondary-100 h-full">
      <Text className="text-[24px] text-white-100 mb-[16px] font-psemibold">
        Chat
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#76B7F2" />
      ) : (
        <FlatList
          data={chatData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <StatusBar style="light" backgroundColor="#26282A" />
    </SafeAreaView>
  );
};

export default Chat;
