import { useState, useEffect } from "react";
import { firebase } from "../firebaseConfig";

const useFirestoreData = (stuId, setLoading) => {
  const [data, setData] = useState([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    const docRef = firestore.collection("Groups").doc("oU79ie60uZHbZ2fGRSif");

    const obtainData = docRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          const groupData = doc.data();

          const cards = Object.entries(groupData)
            .map(([key, value]) => {
              const checkExistence =
                Array.isArray(value.members) && value.members.includes(stuId);
              const checkLegitimacy = value.verified;

              if (!checkExistence && checkLegitimacy) {
                return {
                  title: key,
                  content: value.content,
                  numberOfPeople: value.numberOfPeople,
                  location: value.location,
                };
              }
              return null; 
            })
            .filter((card) => card !== null); 

          const formattedData = [{ id: doc.id, cards }];
          setData(formattedData);
          setLoading(false);
        } else {
          console.log("No such document!");
          setData([]); 
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    );

    return () => obtainData();
  }, [firestore, stuId]);

  return data;
};

export default useFirestoreData;
