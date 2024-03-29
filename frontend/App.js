import React, { useState } from "react"; // Correct import statement
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import jobInterestsData from "../frontend/data/job_interests.json";
import SwipesScreen from "./components/SwipeScreen";

// SignInScreen Component
const SignInScreen = ({ navigation }) => {
  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF0000", "#FF5F05"]}
        style={styles.gradient}
        start={{ x: 0.05, y: 0 }}
        end={{ x: -0.2, y: 0.1 }}
      >
        <Text style={styles.welcomeText}>welcome to rekroot</Text>
        <Text style={styles.welcomeSubtitle}>
          your next internship is now just a swipe away!
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.signInFooter}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setTimeout(() => {
                // Example action on pressing the sign-in button
                // You should replace this with actual sign-in logic
                console.log("Signing in with:", username, password);
                navigation.navigate("UploadResume");
              }, 500);
            }}
          >
            <Text style={styles.buttonText}>
              perfect, click here to get started
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

// UploadResumeScreen Component
const UploadResumeScreen = ({ navigation }) => {
  const handleUploadPress = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      Alert.alert("File Uploaded", result.assets[0].name);
      navigation.navigate("JobInterests");
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.headerText}>upload your resume</Text>
        <Text style={styles.descriptionText}>
          We’ll use it to find jobs that match your interests/skills. Make sure
          it’s readable by ATS.
        </Text>
        <View style={styles.signInFooter}>
          <TouchableOpacity
            onPress={handleUploadPress}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>Upload Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// JobInterestsScreen Component
const JobInterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = React.useState([]);

  const handleInterestPress = (interest) => {
    if (selectedInterests.includes(interest.id)) {
      setSelectedInterests(
        selectedInterests.filter((id) => id !== interest.id)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest.id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Job Interests</Text>
      <ScrollView contentContainerStyle={styles.interestsContainer}>
        {jobInterestsData.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest.id) &&
                styles.interestButtonSelected,
            ]}
            onPress={() => handleInterestPress(interest)}
          >
            <Text style={styles.interestText}>{interest.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("LocationSelect")}
        style={styles.applyButton}
      >
        <Text style={styles.applyButtonText}>Start Applying</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// LocationSelectScreen Component
const LocationSelectScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const navigateToNewScreen = () => {
    navigation.navigate("SwipesScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.headerText}>Where Do You Want to Work?</Text>
        <Picker
          selectedValue={selectedLocation}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLocation(itemValue)
          }
          mode="dropdown"
        >
          <Picker.Item label="Urbana" value="sea" />
          <Picker.Item label="Madison" value="sea" />
          <Picker.Item label="San Francisco" value="sf" />
          <Picker.Item label="Seattle" value="sea" />
          <Picker.Item label="Chicago" value="sea" />
          <Picker.Item label="Austin" value="sea" />
          <Picker.Item label="Anywhere" value="anywhere" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={navigateToNewScreen}
      >
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// NewBlankScreen Component
const NewBlankScreen = () => {
  // Just a placeholder for now, you can add content here
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>New Blank Screen</Text>
    </View>
  );
};

// Stack Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="UploadResume"
          component={UploadResumeScreen}
          options={{ title: "Upload Resume" }}
        />
        <Stack.Screen
          name="JobInterests"
          component={JobInterestsScreen}
          options={{ title: "Select Interests" }}
        />
        <Stack.Screen
          name="LocationSelect"
          component={LocationSelectScreen}
          options={{ title: "Select Location" }}
        />
        <Stack.Screen name="SwipesScreen" component={SwipesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles (add new styles for JobInterestsScreen and adjust existing styles as needed)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  welcomeSubtitle: {
    color: "white",
    paddingBottom: 30,
    fontWeight: "500",
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signInFooter: {
    marginTop: 20,
  },
  termsText: {
    color: "white",
    marginTop: 10,
  },
  confirmButtonText: {
    textAlign: "center",
    alignSelf: "center", // Ensure the text itself is centered in its container
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    margin: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Align text to center
    alignSelf: "center", // Ensure the text itself is centered in its container
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    marginHorizontal: 6,
  },
  uploadButton: {
    backgroundColor: "#FF5F05",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 20,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 60,
  },
  interestButton: {
    margin: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    padding: 10,
  },
  interestButtonSelected: {
    borderColor: "orange",
  },
  interestText: {
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "lightgrey",
    padding: 20,
    alignSelf: "center", // Center button horizontally
    borderRadius: 25,
    position: "absolute", // Position the button absolutely...
    bottom: 20, // ...at 20 units from the bottom of the screen
    left: 30,
    right: 30, // Stretch to full width - will work in conjunction with 'alignSelf' to center
  },
  applyButtonText: {
    fontSize: 20,
    textAlign: "center", // Align text to center inside the button
  },
  signInFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    padding: 20,
  },
  checkmarkButton: {
    position: "absolute",
    right: 10,
    top: 10, // Adjust top as per your header's height
    padding: 10,
  },
});

export default App;
