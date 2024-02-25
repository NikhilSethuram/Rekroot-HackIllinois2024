import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import jobInterestsData from '/Users/ishan/AwesomeProject/data/job_interests.json'

const JobInterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestPress = (interest) => {
    if (selectedInterests.includes(interest.id)) {
      setSelectedInterests(selectedInterests.filter((id) => id !== interest.id));
    } else {
      setSelectedInterests([...selectedInterests, interest.id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Job Interests</Text>
      <ScrollView contentContainerStyle={styles.interestsContainer}>
        {jobInterestsData.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest.id) && styles.interestButtonSelected,
            ]}
            onPress={() => handleInterestPress(interest)}
          >
            <Text style={styles.interestText}>{interest.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('LocationSelect')} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Bet, Start Applying</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  backButtonText: {
    fontSize: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  interestButton: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    padding: 10,
  },
  interestButtonSelected: {
    borderColor: 'orange',
  },
  interestText: {
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: 'lightgrey',
    padding: 20,
    position: 'absolute',
    bottom: 20,
    borderRadius: 25,
  },
  applyButtonText: {
    fontSize: 20,
  },
});

export default JobInterestsScreen;
