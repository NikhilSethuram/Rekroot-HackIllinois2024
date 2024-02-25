// screens/LocationSelectScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LocationSelectScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.headerText}>Where Do You Want to Work?</Text>
        <Picker
          selectedValue={selectedLocation}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="New York" value="ny" />
          <Picker.Item label="San Francisco" value="sf" />
          <Picker.Item label="Seattle" value="sea" />
        </Picker>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
  },
  backButtonText: {
    fontSize: 30,
    color: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    ...Platform.select({
      android: {
        color: '#000000',
      },
    }),
  },
  footer: {
    padding: 10,
    paddingBottom: 20, // Give some space from the bottom edge
  },
  buttonContainer: {
    borderRadius: 25, // Match the borderRadius of the LinearGradient
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 25, // Apply a border radius for rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LocationSelectScreen;
