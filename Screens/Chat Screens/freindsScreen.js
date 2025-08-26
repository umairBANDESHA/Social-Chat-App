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
  sendRequest,
  fetchFriends,
  fetchSentRequests,
  fetchFreindRequests
} from '../Auth/database';
import { UserContext } from "../Auth/UserContext";

export default function AddFriendsScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]); 
  const { userId } = useContext(UserContext);
  // const userId = 4;
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState([]);

  useEffect(() => {
    const loadUsersAndFriends = async () => {
      try {
        const userList = await ussers(userId); // Fetch users
        setData(userList);
        setUsers(userList);

        const friendList = await fetchSentRequests(userId); // Fetch existing friends or requests
        const pendingIds = friendList.map((friend) => friend.receiver_id); // Extract friend/request IDs
        setBtnText(pendingIds);
        
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
// handleSearch();
    loadUsersAndFriends();
  }, [userId]);

  const sendFriendRequest = async (senderId , receiverId) => {
    setIsLoading(true);
    try {
      await sendRequest(senderId, receiverId); // Send friend request
      setBtnText((prev) => [...prev,receiverId]); // Update button state to "Pending"
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 2000); // Dismiss loading after 2 seconds
    }
  };

  const [searchQuery, setSearchQuery] = useState(users);
  // const [filteredUsers, setFilteredUsers] = useState(usersData); // All users initially

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

// Open the database
// const db = SQLite.openDatabaseSync('app.db');
  // const sendRequest = async (senderId, receiverId) => {
  //   try {
  //     const response = await db.runAsync(`
  //       INSERT INTO friend_requests (fromUser, toUser)
  //       VALUES (?, ?)
  //     `, [senderId, receiverId]);
  //     console.log("Friend request sent successfully");
  //     return response;
  //   } catch (error) {
  //     console.error("Error sending friend request:", error);
  //     return false;
  //   }
  // };
  

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxArea}>
        
        <Text style={styles.Text}>Add Friends</Text>
        
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.addFriend}>
            <View style={styles.half}>
              <Image
                source={
                  item.profile_picture
                    ? { uri: item.profile_picture }
                    : require('../../assets/img1.png') // Default image
                }
                style={styles.profilePic}
              />
              <Text style={styles.name}>{item.username}</Text>
            </View>
            <Pressable
              style={styles.addButton}
              onPress={() => sendFriendRequest(userId, item.id)}
              disabled={btnText.includes(item.id)} // Disable button if already pending
            >
              <Text style={styles.addButtonText}>
                {btnText.includes(item.id) ? 'Pending' : 'Add Friend'}
              </Text>
            </Pressable>
          </View>
        )}
      />

      {/* Loading Modal */}
      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        </View>
      </Modal>
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
  addFriend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#ECEBDE',
    borderRadius: 10,
  },
  half: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    width: 150,
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
