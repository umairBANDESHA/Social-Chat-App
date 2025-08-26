import React, { useEffect, useState, useContext } from 'react';
import * as SQLite from 'expo-sqlite';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  ussers,
  fetchFriends
} from '../Auth/database';
import { UserContext } from "../Auth/UserContext";

export default function FriendsScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(users);
    const { userId } = useContext(UserContext);
    // const userId = 4;

  useEffect(() => {
    const loadUsersAndFriends = async () => {
      try {
        const userList = await fetchFriends(userId); // Fetch users
        // console.log(userList);
        setUsers(userList);

        // const friendList = await fetchUsers(userId); // Fetch existing friends or requests
        // const pendingIds = friendList.map((friend) => friend.receiver_id); // Extract friend/request IDs
        // setBtnText(pendingIds);
        } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadUsersAndFriends();
  }, [userId]);
  

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '' || query === null || query === undefined) {
      setUsers(data); // If no search term, show all users
    } else {
      // Filter users by username or other criteria (case-insensitive)
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filtered);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBoxArea}>
        
        <Text style={styles.Text}>Friends</Text>
        
        {/* <Icon style={styles.srchIco} name="search" size={30} color="black"  /> */}
      </View>
      <View style={styles.searchBoxArea}>
      <TextInput 
        style={styles.searchBox} 
        placeholder="Search for people" 
        value={searchQuery} 
        onChangeText={handleSearch} 
      />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
           <Image
                source={
                  item.profile_pic
                    ? { uri: item.profile_pic }
                    : require('../../assets/img1.png') // Fallback image
                }
                style={styles.profilePic}
              />
            <View style={styles.chatDetails}>
              <Pressable onPress={() => navigation.navigate('Chat' , {friend: item.user_id })}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item?.last_message || 'Bio'}</Text>
              </Pressable>
            </View>
            <Text style={styles.time}>{item.message_time}</Text>
          </View>
        )}
        />

      {/* Loading Modal
      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, searchBoxArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "yellow",
    padding: 10,
  },
  Text: {
    fontSize: 28,
    fontWeight: 'bold',
    left:15
  },
  srchIco:{
    left:0,
  },
  
  searchBox: {
    flex: 1,
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#ECEBDE",
    borderRadius: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    color: "#666",
  },
  time: {
    color: "#999",
  },
});
