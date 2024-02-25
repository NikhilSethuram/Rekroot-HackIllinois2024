import * as React from "react";
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

// SignInScreen Component
const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF0000", "#FF5F05"]}
        style={styles.gradient}
        start={{ x: 0.05, y: 0 }}
        end={{ x: -0.2, y: 0.1 }}
      >
        <Text style={styles.welcomeText}>Rekroot</Text>
        <Text style={{ color: "white" }}>Jobs now a swipe away!</Text>

        <View style={styles.signInFooter}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setTimeout(() => {
                navigation.navigate("UploadResume");
              }, 2000);
            }}
          >
            <Text style={styles.buttonText}>Authorize with LinkedIn</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By signing in, you agree to our Terms and Conditions.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

// UploadResumeScreen Component
const UploadResumeScreen = ({ navigation }) => {
  const handleUploadPress = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if ((result.type = "success")) {
        const fileName = result.name ?? "Unknown"; // Fallback to 'Unknown' if result.name is undefined
        const fileSize = result.size ?? "Unknown"; // Fallback to 'Unknown' if result.size is undefined
        Alert.alert("File Picked", `Name: ${fileName}\nSize: ${fileSize}`);
        navigation.navigate("JobInterests"); // Navigate to JobInterestsScreen after successful upload
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while picking the document.");
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
          We’ll use it to find jobs that match your interests/skills.
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
    navigation.navigate("NewBlankScreen");
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
        <Stack.Screen name="NewBlankScreen" component={NewBlankScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles (add new styles for JobInterestsScreen and adjust existing styles as needed)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  termsText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
    marginHorizontal: 40,
  },
  button: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
    alignItems: "center",
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
