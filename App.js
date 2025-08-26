import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import TcpSocket from 'react-native-tcp-socket';
import { UserProvider, useUser } from "./Screens/Auth/UserContext";  // Correct import
import { initializeDatabase } from "./Screens/Auth/database";
// 

// Import Screens
import SplashScreen from "./Screens/Login Screens/spalshScreen";
import LoginScreen from "./Screens/Login Screens/loginScreen";
import SignUp from "./Screens/Login Screens/signUpScreen";
import ContactScreen from "./Screens/Chat Screens/contactScreen";
import FriendsRequestScreen from "./Screens/Chat Screens/freindsReequestScreen";
import AddFriendsScreen from "./Screens/Chat Screens/freindsScreen";
import HomeScreen from "./Screens/homeScreen";
import ProfileScreen from "./Screens/Login Screens/profileScreen";
import CreatePostScreen from './Screens/Chat Screens/CreatePostScreen';
import Chat from './Screens/Chat Screens/chatScreen';
import FriendsScreen from './Screens/Chat Screens/friends';
import ShowDB from './screen/seeDB';
import {  } from "./SERVER/1";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SWIPE = createMaterialTopTabNavigator();
// const socket = new TcpSocket();

// Bottom Tab Navigator for Home, Contact, Add Friends, and Profile

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { isLoggedIn } = useUser(); // Make sure to use context properly

  useEffect(() => {
    initializeDatabase();
    // console.log('heloo from server'+ JSON.stringify(TcpSocket));

  const checkLoginStatus = async () => {
      try {
        if (userId) {
          setIsLoggedIn(true); // Set isLoggedIn to true if userId exists
        } 
        // const storedLoginStatus = await getLoginStatus();  // Returns true/false

        setIsLoggedIn(storedLoginStatus);
      } catch (error) {
        console.log("Error checking login status:", error);
      }
  }
  checkLoginStatus();
  
  // startCommunication();

    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading for splash screen
  return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <UserProvider> {/* Make sure UserProvider wraps the whole app */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn? 'HomeTabs' : 'Login'}
        screenOptions={{ gestureEnabled: false }} 
        >
        
          
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Post" component={CreatePostScreen} options={{ headerShown: false }} screenOptions={{ gestureEnabled: false }} />
          <Stack.Screen name="Friends Request" component={FriendsRequestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Show DB" component={ShowDB} options={{ headerShown: false }} />
          <Stack.Screen name="Friends Screen" component={FriendsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} />
        
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} screenOptions={{ gestureEnabled: false }}  />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        
      </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const HomeTabs = () => {
  return (
    
    <Tab.Navigator
    shifting={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Contact":
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
        tabBarActiveTintColor: "orange",
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
      
      <Tab.Screen name="Home" component={HomeScreen}  options={{
    tabBarLabel: "Main",
  }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{
    tabBarBadge: 3, // Shows "3" as a badge
  }} />
      <Tab.Screen name="Add Friends" component={AddFriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
};


// SERVER

let serverSocket = null;
let clientSocket = null;

const startServer = () => {
  try {
    serverSocket = TcpSocket.createServer((socket) => {
      console.log('Server: Client connected');
      socket.write('Hello from server');

      socket.on('data', (data) => {
        console.log('Received from client:', data.toString());
      });

      socket.on('end', () => {
        console.log('Client disconnected');
      });
    }).on('error', (err) => {
      console.error('Error in server creation:', err);
    });

    // Logging and trying listen
    console.log('Server socket object:', serverSocket);
    serverSocket.listen(12345, '0.0.0.0', () => {
      console.log('Server listening on port 12345...');
    });
  } catch (error) {
    console.error('Server creation failed with error:', error);
  }
};


const startClient = (serverIp) => {
  clientSocket = TcpSocket.createConnection({
    port: 12345,
    host: serverIp,
  }, () => {
    console.log('Connected to server as client');
    clientSocket.write('Hello Server from Client!');
  });

  clientSocket.on('data', (data) => {
    console.log('Received from server:', data.toString());
  });

  clientSocket.on('error', (err) => {
    console.error('Client connection error:', err);
  });

  clientSocket.on('end', () => {
    console.log('Disconnected from server');
  });
};
const startCommunication = () => {
  startServer();
  startClient('192.168.0.211');  // Replace with actual IP
};

