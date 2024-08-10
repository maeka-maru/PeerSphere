{/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import OnBoarding from '../app/onboarding'; // Adjust the path as necessary
import useAuth from './hooks/useAuth';

const Stack = createStackNavigator();

function HomeScreen() {
  const [courseType, setCourseType] = useState('');
  const [courseName, setCourseName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    const stuNumber = `stu${studentNumber}`;
    navigation.navigate('OnBoarding', {
      courseType,
      courseName,
      studentNumber: stuNumber,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Course Type:</Text>
      <Picker
        selectedValue={courseType}
        onValueChange={(itemValue) => setCourseType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Course Type" value="" />
        <Picker.Item label="Bachelor" value="Bachelor" />
        <Picker.Item label="Diploma" value="Diploma" />
        <Picker.Item label="Certificate" value="Certificate" />
      </Picker>

      <Text style={styles.label}>Select Course Name:</Text>
      <Picker
        selectedValue={courseName}
        onValueChange={(itemValue) => setCourseName(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Course Name" value="" />
        <Picker.Item label="Nursing" value="Nursing" />
        <Picker.Item label="Computer Science" value="Computer Science" />
        <Picker.Item label="IT" value="IT" />
        <Picker.Item label="Education" value="Education" />
      </Picker>

      <Text style={styles.label}>Enter Student Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="example: 47000"
        value={studentNumber}
        onChangeText={setStudentNumber}
        keyboardType="numeric"
      />

      <Button
        title="Next"
        onPress={handleNext}
        disabled={!courseType || !courseName || !studentNumber}
      />
    </View>
  );
}

function App() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'OnBoarding'}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;*/}
