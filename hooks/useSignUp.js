import { useState } from 'react';
import { firebase } from '../firebaseConfig';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    setLoading(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};

export default useSignUp;