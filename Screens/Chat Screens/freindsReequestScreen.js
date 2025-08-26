import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

import { useNavigation } from "@react-navigation/native";

import {
  addFriend,
  fetchFreindRequests, // Fixed function name
  acceptRequest,
  declineRequest,
} from '../Auth/database';
import { UserContext } from "../Auth/UserContext";

export default function FriendsRequestScreen() {
  const navigation = useNavigation();
  const { userId } = useContext(UserContext); // Get userId from context
  // const userId = 4; 
  const [friendRequests, setFriendRequests] = useState([]); // Store friend requests

  useEffect(() => {
    // Load friend requests for the current user
    const loadFriendRequests = async () => {
      try {
        const response = await fetchFreindRequests(userId); 
        const resp = JSON.stringify(response);
        console.log("Friend Requests:", resp.sender_username); // Debugging
        setFriendRequests(response);
      } catch (error) {
        console.error("Error loading friend requests:", error);
      }
    };

    loadFriendRequests();
  }, [userId]);

  // Handle accepting a friend request
  const handleAccept = async (requestedId,  friend_id) => {
    try {
      const success = await acceptRequest(requestedId, userId); // Call SQL query to accept request     
      if (success) {
        // UPDATE FRIENDs LIST
        addFriend(userId, friend_id);
        setFriendRequests((prev) =>
          prev.filter((request) => request.id !== requestedId)
        ); // Remove request from list
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Handle declining a friend request
  const handleDecline = async (requestId) => {
    try {
      const success = await declineRequest(requestId ,userId ); // Call SQL query to decline request
      if (success) {
        setFriendRequests((prev) =>
          prev.filter((request) => request.id !== requestId)
        ); // Remove request from list
      }
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxArea}>
        <Icon
          name="chevron-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate('Contact')}
        />
        <Text style={styles.Text}> Friends Requests</Text>
      </View>

      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.firstHalf}>
              <Image
                source={
                  item.sender_picture
                    ? { uri: item.sender_picture }
                    : require('../../assets/img1.png') // Fallback image
                }
                style={styles.profilePic}
              />
              <View>
              <Text style={styles.name}>{item.sender_username}</Text>
              <Text style={styles.date}>{moment(item.created_at).fromNow()}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.acceptButton}
                onPress={() => handleAccept(item.id , item.sender_id)}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </Pressable>
              <Pressable
                style={styles.declineButton}
                onPress={() => handleDecline(item.id)}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingTop: 50,
    padding: 5,
  },
  Text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  friendItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#ECEBDE',
    borderRadius: 10,
  },
  firstHalf: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  acceptButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  declineButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 8,
  },
  declineButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
