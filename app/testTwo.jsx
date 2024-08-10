// UpdateGroup.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { firebase } from '../firebaseConfig';

const UpdateGroup = ({ route, navigation }) => {
  const { control, handleSubmit, reset } = useForm();
  const firestore = firebase.firestore();

  const onSubmit = async (data) => {
    try {
      await nfirestore.collection('Groups').doc('oU79ie60uZHbZ2fGRSif').update(data);
      console.log('Document successfully updated!');
      reset();  // Reset form after successful submission
      navigation.goBack();  // Navigate back to the previous screen
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Group</Text>

      <Text>Group Name</Text>
      <Controller
        control={control}
        name="Name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Location</Text>
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Number of People</Text>
      <Controller
        control={control}
        name="numberOfPeople"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
      />

      <Button title="Update" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
    paddingLeft: 8,
  },
});

export default UpdateGroup;
