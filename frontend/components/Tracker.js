import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity, // Import TouchableOpacity
  Linking, // Import Linking
  Alert,
} from "react-native";

const ApplicationTracker = ({ applications, setApplications }) => {
  const [companyName, setCompanyName] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  //const [applications, setApplications] = useState([]);

  const handleAddApplication = () => {
    if (companyName && dateApplied) {
      setApplications([...applications, { companyName, dateApplied }]);
      setCompanyName("");
      setDateApplied("");
    }
  };

  const openLink = (application) => {
    const email = application.email; // Use your target email address here
    const subject = encodeURIComponent(
      "Application for the Software Engineer Position at Warp - Nikhil Sethuram, Computer Science Undergraduate."
    );
    const body = encodeURIComponent(`Dear Recruiter,

    I am writing to express my deep interest in the Software Engineer position at Warp. As a recent graduate from the University of Wisconsin, Madison, with a B.S. in Computer Science and Data Science, I am excited about the opportunity to apply my skills and experiences to contribute to Warp's mission.
    What immediately drew me to Warp is your commitment to providing a seamless online supermarket experience for South Asians living in the US. As a South Asian myself, I understand the importance of this service and am eager to contribute to a company that values diversity and inclusivity.
    Throughout my academic journey and professional internships, I have honed my skills in various programming languages, web development, and machine learning frameworks. For instance, at The Level Company, I created large language models using GPT-4 and Python to generate effective and personalized messages, significantly increasing response rates. I also automated email outreach campaigns, leading to a 50% increase in re-engagement rates. I believe these experiences have equipped me with the technical expertise and innovative mindset required for this role.
    I am particularly interested in leveraging my skills to enhance the user experience and efficiency of your platform. Given my experience with automating processes and creating personalized experiences, I am confident that I can contribute to improving Warp's online supermarket platform.
    I would appreciate the opportunity to further discuss how my background and skills align with your needs. I am eager to learn more about the role and how I can contribute to Jaldi's mission.
    Thank you for considering my application. I look forward to the possibility of contributing to Warp's mission.
    
    Best Regards,
    Nikhil`);
    const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailto)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + mailto);
        } else {
          return Linking.openURL(mailto);
        }
      })
      .catch((err) => console.error("An error occurred", err));

    Alert.alert("Email Link", mailto);
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
          <TouchableOpacity
            key={index}
            onPress={() => openLink(application)}
            style={styles.applicationItem}
          >
            <Text style={styles.applicationText}>
              {application.companyName}
            </Text>
            <Text style={styles.applicationText}>
              {application.dateApplied}
            </Text>
          </TouchableOpacity>
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
