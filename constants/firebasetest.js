import { useState, useEffect } from "react";
import { firebase } from "../firebaseConfig";

const useFirestoreData = () => {
  const [data, setData] = useState([]); 
  const firestore = firebase.firestore();

  useEffect(() => {
    const docRef = firestore.collection('Groups').doc('oU79ie60uZHbZ2fGRSif');

    const unsubscribe = docRef.onSnapshot(doc => {
      if (doc.exists) {
        const groupData = doc.data();
        const cards = Object.entries(groupData).map(([key, value]) => ({
          title: key,
          content: value.content,
          numberOfPeople: value.numberOfPeople,
          location: value.location,
        }));
        const formattedData = [{ id: doc.id, cards }];
        setData(formattedData);
      } else {
        console.log('No such document!');
      }
    }, error => {
      console.error('Error fetching data: ', error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firestore]);

  return data;
};

export default useFirestoreData;
