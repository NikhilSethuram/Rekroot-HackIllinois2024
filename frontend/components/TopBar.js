// import React, { useState } from "react";
// import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import ApplicationTracker from "./Tracker"; // Make sure to import the ApplicationTracker component

// export default function TopBar() {
//   const [isTrackerVisible, setIsTrackerVisible] = useState(false);

//   const toggleTracker = () => {
//     setIsTrackerVisible(!isTrackerVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleTracker}>
//         <FontAwesome name="user" size={27} color="#5c5c5c" />
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={isTrackerVisible}
//         onRequestClose={toggleTracker}
//       >
//         <ApplicationTracker />
//         <TouchableOpacity onPress={toggleTracker} style={styles.closeButton}>
//           <FontAwesome name="times" size={27} color="#5c5c5c" />
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 60,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     padding: 15,
//     backgroundColor: "white",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 5.46,
//     elevation: 9,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 30,
//     right: 30,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TopBar = ({ toggleTracker }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTracker} style={styles.iconContainer}>
        <FontAwesome name="user" size={27} color="#5c5c5c" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    // Style for the icon container
  },
  icon: {
    fontSize: 24,
  },
});

export default TopBar;
