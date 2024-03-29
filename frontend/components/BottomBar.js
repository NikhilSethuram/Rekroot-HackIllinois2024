import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function BottomBar({
  handleLikePress,
  handlePassPress,
  handleSuperLikePress,
}) {
  return (
    <View style={styles.container}>
      <View />
      <TouchableOpacity style={styles.button} onPress={handlePassPress}>
        <FontAwesome name="times" size={27} color="#FF0000"></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome
          name="star"
          size={27}
          color="#FFD700"
          onPress={handleLikePress}
        ></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome
          name="heart"
          size={27}
          color="#50C878"
          onPress={handleLikePress}
        ></FontAwesome>
      </TouchableOpacity>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.46,
    elevation: 9,
  },
});
