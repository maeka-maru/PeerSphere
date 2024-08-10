import { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig'
import { useNavigation } from 'expo-router';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
      if (user) {
        navigation.navigate('(tabs)', { screen: 'home' });
      } else {
        navigation.navigate('index');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return { user, initializing };
};

export default useAuth;