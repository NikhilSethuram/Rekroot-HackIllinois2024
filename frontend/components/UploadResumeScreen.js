// screens/UploadResumeScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const UploadResumeScreen = ({ navigation }) => {
  const handleUploadPress = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.type === "success") {
        Alert.alert("File Uploaded!");
        navigation.navigate("JobInterests");
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
        <Text style={styles.headerText}>Upload Your Resume</Text>
        <Text style={styles.descriptionText}>
          We’ll use it to find jobs that match your interests/skills.
        </Text>
        <TouchableOpacity
          onPress={handleUploadPress}
          style={styles.uploadButton}
        >
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

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   SafeAreaView,
//   StyleSheet,
// } from "react-native";
// import DocumentPicker from "react-native-document-picker";

// const UploadResumeScreen = ({ navigation }) => {
//   const [selectedResume, setSelectedResume] = useState(null);

//   const handleUploadPress = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });

//       // Assuming you still want to enforce the 5 MB size limit
//       // Expo's DocumentPicker doesn't provide the file size, so you might need to use
//       // react-native-fs or another method to check the file size if required.

//       setSelectedResume(result);
//       Alert.alert(
//         "File Selected!",
//         `File ${result.name} has been selected successfully.`
//       );
//     } catch (error) {
//       if (DocumentPicker.isCancel(error)) {
//         // User cancelled the picker
//       } else {
//         console.error(error);
//         Alert.alert("Error", "An error occurred while picking the document.");
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backButton}
//       >
//         <Text style={styles.backButtonText}>{"<"}</Text>
//       </TouchableOpacity>
//       <View style={styles.content}>
//         <Text style={styles.headerText}>Upload Your Resume</Text>
//         <Text style={styles.descriptionText}>
//           We’ll use it to find jobs that match your interests/skills. Make sure
//           it’s readable by ATS.
//         </Text>
//         <TouchableOpacity
//           onPress={handleUploadPress}
//           style={styles.uploadButton}
//         >
//           <Text style={styles.uploadButtonText}>Upload Here</Text>
//         </TouchableOpacity>
//         {selectedResume && <Text>Selected Resume: {selectedResume.name}</Text>}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // Define your styles here
// });

// export default UploadResumeScreen;
