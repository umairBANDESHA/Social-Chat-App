import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { initializeDatabase } from "./Screens/Auth/database";

// Import Screens
import SplashScreen from "./Screens/Login Screens/spalshScreen";
import LoginScreen from "./Screens/Login Screens/loginScreen";
import SignUp from "./Screens/Login Screens/signUpScreen";
import ContactScreen from "./Screens/Chat Screens/contactScreen";
import FriendsRequestScreen from "./Screens/Chat Screens/freindsReequestScreen";
import HomeScreen from "./Screens/homeScreen";
import ProfileScreen from "./Screens/Login Screens/profileScreen";
import CreatePostScreen from './Screens/Chat Screens/CreatePostScreen'

import Home from './Screens/home'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Home, Contact, Add Friends, and Profile
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Contacts":
              iconName = "contacts";
              break;
            case "Add Friends":
              iconName = "person-add";
              break;
            case "Profile":
              iconName = "person";
              break;
            default:
              iconName = "help-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange ",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
          paddingVertical: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactScreen} />
      <Tab.Screen name="Create Post" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeDatabase();
    // Simulate loading for the splash screen
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Post" component={CreatePostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Friends Request" component={FriendsRequestScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
