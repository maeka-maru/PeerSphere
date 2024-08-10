import * as FileSystem from 'expo-file-system';

const FILE_PATH = `${FileSystem.documentDirectory}user.json`;

export const saveUser = async (user) => {
  try {
    await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const getUser = async () => {
  try {
    const userData = await FileSystem.readAsStringAsync(FILE_PATH);
    return JSON.parse(userData);
  } catch (error) {
    console.error('Failed to retrieve user data:', error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await FileSystem.deleteAsync(FILE_PATH);
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
};
