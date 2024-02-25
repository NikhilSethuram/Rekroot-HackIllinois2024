// screens/UploadResumeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadResumeScreen = ({ navigation }) => {
  const handleUploadPress = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.type === 'success') {
        Alert.alert('File Picked', `Name: ${result.name}\nSize: ${result.size}`);
        navigation.navigate('JobInterests');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while picking the document.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.headerText}>Upload Your Resume</Text>
        <Text style={styles.descriptionText}>
          We’ll use it to find jobs that match your interests/skills. Make sure it’s readable by ATS.
        </Text>
        <TouchableOpacity onPress={handleUploadPress} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
});

export default UploadResumeScreen;