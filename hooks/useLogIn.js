import { Alert } from 'react-native';
import { useState } from 'react';
import { firebase } from '../firebaseConfig';

const useLogIn = () => {
  const [loading, setLoading] = useState(false);

  const logIn = async (email, password) => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return { success: true };
    } catch (error) {
      let userFriendlyError;
      switch (error.code) {
        case 'auth/wrong-password':
          userFriendlyError = 'Incorrect password.';
          break;
        case 'auth/user-not-found':
          userFriendlyError = 'No user found with this email.';
          break;
        case 'auth/invalid-email':
          userFriendlyError = 'Invalid email format.';
          break;
        default:
          userFriendlyError = 'Incorrent password or The email has not been used yet. Please review your entries.';
      }
      return { success: false, error: userFriendlyError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      Alert.alert('Log Out Successful!');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return { logIn, loading, signOut };
};

export default useLogIn;
