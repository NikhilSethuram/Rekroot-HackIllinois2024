// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
// export default function TopBar() {
//   return (
//     <View style={styles.container}>
//       {/* <FontAwesome5 name="fire" size={27} color="#F06795" />
//       <FontAwesome name="comments" size={27} color="#5c5c5c" /> */}
//       <FontAwesome name="user" size={27} color="#5c5c5c" />
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
// });

import React, { useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ApplicationTracker from "./Tracker"; // Make sure to import the ApplicationTracker component

export default function TopBar() {
  const [isTrackerVisible, setIsTrackerVisible] = useState(false);

  const toggleTracker = () => {
    setIsTrackerVisible(!isTrackerVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTracker}>
        <FontAwesome name="user" size={27} color="#5c5c5c" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isTrackerVisible}
        onRequestClose={toggleTracker}
      >
        <ApplicationTracker />
        <TouchableOpacity onPress={toggleTracker} style={styles.closeButton}>
          <FontAwesome name="times" size={27} color="#5c5c5c" />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 30,
  },
});
