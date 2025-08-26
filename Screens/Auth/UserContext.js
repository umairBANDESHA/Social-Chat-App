import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";  

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially, user is not logged in
  const [userId, setUserId] = useState(null); // Initially, no userId is set

useEffect(()=>{
  
  const checkLoginStatus = async () => {
    try {
      const storedLoginStatus = await AsyncStorage.getItem("isLoggedIn");
      // const storedUserId = await AsyncStorage.getItem("userId");
      
      if (userId) {
        setIsLoggedIn(true);
        // setUserId(storedUserId);
      }
    } catch (error) {
      console.log("Error checking login status:", error);
    }
  }

  checkLoginStatus();
}, []);

  const setLoginStatus = async (status, userId = null) => {
    setIsLoggedIn(status);
    setUserId(userId);

    // Persist the login status and user ID in AsyncStorage
    await AsyncStorage.setItem("isLoggedIn", status ? "true" : "false");
    await AsyncStorage.setItem("userId", userId || "");
  };


  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
