import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // If you are using Expo
import { updateProfile, fetchUser } from '../Auth/database';
import { UserContext } from "../Auth/UserContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserContext);
  const [selectedGender, setSelectedGender] = useState(null);
  const [image, setImage] = useState(null);

  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri); // Save the image URI
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (userId) {
          const userArray = await fetchUser(userId);  // userArray is an array
          
            const user = userArray[0];  // Get the first user
            setUsers(user);  // Now users is an object, not an array
            // console.log(user);
    }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUser();
  }, [userId]);  // Dependency array ensures this effect runs when userId changes
  
  const updateUserData = async (userId) => {
    try {
      await updateProfile(
        userId,
        image, // If the user selected an image, pass it; otherwise, use the existing image from DB
        address,
        number,
        name
      );
      // Reset fields after updating
      setName('');
      setNumber('');
      setAddress('');
      // setSelectedGender(null);
      // setImage(null); // Reset image if needed
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const logOut =() =>{
    setUserId(null);
    navigation.navigate("Login");
    console.log(userId);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      
      {/* Upper Section */}
      <View style={styles.upperHalf}>
        <Icon style={styles.logout} name='logout'  color='white' size={34} onPress={() => logOut()}/>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: users.profile_picture || image || '../../assets/ipp.png' }}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{users.username}</Text>
        <Text style={styles.emailText}>{users.email}</Text>
      </View>

      {/* Decorative Triangle */}
      <View style={styles.triangleShape} />
      <View style={styles.triangleShadow} />

      {/* Lower Section */}
      <View style={styles.lowerHalf}>
        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          <Text style={styles.selectedText}>Gender:</Text>
          <View style={styles.btn}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedGender === 'Male' && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender('Male')}
            >
              <Text style={styles.buttonText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                selectedGender === 'Female' && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender('Female')}
            >
              <Text style={styles.buttonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <TextInput style={styles.input} placeholder={users.username} value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder={users.phone_number} keyboardType="phone-pad" value={number} onChangeText={setNumber} />
        <TextInput style={styles.input} placeholder={users.address} value={address} onChangeText={setAddress} />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={() => updateUserData(userId)}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upperHalf: {
    flex: 1,
    backgroundColor: "#FFD700",
    alignItems: "center",
    padding: 20,
    paddingVertical: 25,
  },
  profileContainer: {
    position: "relative",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 12,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 5,
    elevation: 2,
  },
  cameraIcon: {
    fontSize: 26,
    color: "#555",
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  emailText: {
    fontSize: 15,
    color: "#555",
  },
  triangleShape: {
    width: 0,
    height: 0,
    borderLeftWidth: 200,
    borderRightWidth: 200,
    borderTopWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFD700",
    alignSelf: "center",
    zIndex: 2,
  },
  triangleShadow: {
    width: 0,
    height: 0,
    borderLeftWidth: 210,
    borderRightWidth: 210,
    borderTopWidth: 41,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "gray",
    alignSelf: "center",
    position: 'relative',
    top: -40,
    zIndex: 1,
  },
  lowerHalf: {
    flex: 2,
    padding: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#ddd',
    width: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 10,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  logout:{
    position: 'absolute',
    top: 10,
    right:20,
  }

});
