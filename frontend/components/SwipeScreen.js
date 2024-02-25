// // SwipesScreen.js
// import React, { useState, useEffect, useRef } from "react";
// import { StyleSheet, View, Alert } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Constants from "expo-constants";
// import TopBar from "./TopBar";
// import axios from "axios";
// import BottomBar from "./BottomBar";
// import Swipes from "./Swipes";
// import jobsData from "../output.json";
// import ApplicationTracker from "./Tracker";

// const SwipesScreen = () => {
//   const [jobs, setJobs] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const swipesRef = useRef(null);
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     setJobs(jobsData); // Load the jobs data
//   }, []);

//   function handlePass() {
//     console.log("pass");
//     nextJob();
//   }

//   function nextJob() {
//     const nextIndex = jobs.length - 2 === currentIndex ? 0 : currentIndex + 1;
//     setCurrentIndex(nextIndex);
//   }

//   function handleLikePress() {
//     swipesRef.current.openLeft();
//   }

//   function handlePassPress() {
//     swipesRef.current.openRight();
//   }

//   const handleLike = (jobLiked) => {
//     console.log("like");
//     const newApplication = {
//       companyName: jobLiked.company_name,
//       dateApplied: new Date().toISOString().split("T")[0], // Assuming you want to use the current date
//     };
//     setApplications([...applications, newApplication]);
//     nextJob();
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <TopBar />
//       <View style={styles.swipes}>
//         {jobs.length > 1 &&
//           jobs.map(
//             (u, i) =>
//               currentIndex === i && (
//                 <Swipes
//                   key={i}
//                   ref={swipesRef}
//                   currentIndex={currentIndex}
//                   jobs={jobs}
//                   handleLike={handleLike}
//                   handlePass={handlePass}
//                 />
//               )
//           )}
//       </View>
//       <BottomBar
//         handleLikePress={handleLikePress}
//         handlePassPress={handlePassPress}
//       />
//       <ApplicationTracker
//         applications={applications}
//         setApplications={setApplications}
//       />
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   swipes: {
//     flex: 1,
//     padding: 10,
//     paddingTop: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,
//     elevation: 7,
//   },
// });

// export default SwipesScreen;

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Swipes from "./Swipes";
import jobsData from "../output.json";
import ApplicationTracker from "./Tracker";

const SwipesScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipesRef = useRef(null);
  const [applications, setApplications] = useState([]);
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    setJobs(jobsData); // Load the jobs data
  }, []);

  const handlePass = () => {
    console.log("pass");
    nextJob();
  };

  const nextJob = () => {
    const nextIndex = jobs.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handleLikePress = () => {
    swipesRef.current.openLeft();
  };

  const handlePassPress = () => {
    swipesRef.current.openRight();
  };

  const handleLike = (jobLiked) => {
    console.log("like");
    const newApplication = {
      companyName: jobLiked.company_name,
      dateApplied: new Date().toISOString().split("T")[0], // Assuming you want to use the current date
      email: jobLiked.email,
      description: jobLiked.long_description,
    };
    setApplications([...applications, newApplication]);
    nextJob();
  };

  const toggleTracker = () => {
    setShowTracker(!showTracker);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopBar toggleTracker={toggleTracker} />
      <View style={styles.swipes}>
        {jobs.length > 1 &&
          jobs.map(
            (u, i) =>
              currentIndex === i && (
                <Swipes
                  key={i}
                  ref={swipesRef}
                  currentIndex={currentIndex}
                  jobs={jobs}
                  handleLike={handleLike}
                  handlePass={handlePass}
                />
              )
          )}
      </View>
      <BottomBar
        handleLikePress={handleLikePress}
        handlePassPress={handlePassPress}
      />
      {showTracker && (
        <ApplicationTracker
          applications={applications}
          setApplications={setApplications}
        />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default SwipesScreen;
