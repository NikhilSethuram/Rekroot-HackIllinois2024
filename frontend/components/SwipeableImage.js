import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SwipeableImage({ job, willLike, willPass }) {
  return (
    <LinearGradient colors={["#13294B", "#2185C5"]} style={styles.card}>
      {willLike && (
        <View style={styles.likeBox}>
          <Text style={{ ...styles.textPrimary, color: "#64EDCC" }}>LIKE</Text>
        </View>
      )}
      {willPass && (
        <View style={styles.passBox}>
          <Text style={{ ...styles.textPrimary, color: "#F06795" }}>NOPE</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.textPrimary, styles.textShadow]}>
          {job.company_name}
        </Text>
        <Text style={[styles.textSecondary, styles.textShadow, styles.email]}>
          {job.email}
        </Text>
        <Text style={[styles.textSecondary, styles.textShadow]}>
          {job.long_description}
        </Text>
        <Text style={[styles.textSecondary, styles.textShadow]}>
          Location: {job.location}
        </Text>
      </View>
    </LinearGradient>
  );
}

const boxStyle = {
  position: "absolute",
  top: "50%",
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderWidth: 3,
  borderRadius: 10,
};

const styles = StyleSheet.create({
  card: {
    color: "white",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  likeBox: {
    ...boxStyle,
    left: 40,
    borderColor: "#64EDCC",
  },
  passBox: {
    ...boxStyle,
    right: 40,
    borderColor: "#F06795",
  },
  textContainer: {
    color: "white",
    alignItems: "center",
  },
  textPrimary: {
    color: "white",
    //color: "black",
    fontSize: 30, // Adjust size as needed
    fontWeight: "bold",
    //alignSelf: "flex-start", // Align self to the start of the flex container
    marginBottom: 100, // Add space below the company name
  },
  textSecondary: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center", // Center-align the text
    marginTop: 30,
  },
  email: {
    textDecorationLine: "underline",
  },
});
