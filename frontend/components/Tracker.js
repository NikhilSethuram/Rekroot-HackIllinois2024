import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const ApplicationTracker = () => {
  const [companyName, setCompanyName] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [applications, setApplications] = useState([]);

  const handleAddApplication = () => {
    if (companyName && dateApplied) {
      setApplications([...applications, { companyName, dateApplied }]);
      setCompanyName("");
      setDateApplied("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
        placeholder="Company Name"
      />
      <TextInput
        style={styles.input}
        value={dateApplied}
        onChangeText={setDateApplied}
        placeholder="Date Applied (YYYY-MM-DD)"
        keyboardType="numeric"
      />
      <Button title="Add Application" onPress={handleAddApplication} />
      <ScrollView>
        {applications.map((application, index) => (
          <View key={index} style={styles.applicationItem}>
            <Text style={styles.applicationText}>
              {application.companyName}
            </Text>
            <Text style={styles.applicationText}>
              {application.dateApplied}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  applicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  applicationText: {
    fontSize: 16,
  },
});

export default ApplicationTracker;
