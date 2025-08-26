import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { fetchUsers, deleteUser } from '../Screens/Auth/database';  // Assuming you have a function to fetch users from the database

export default function UsersListScreen({route }) {
  const [users, setUsers] = useState([]);
  // const { userId } = route.params;

  // Fetch the list of users when the screen loads
  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();  // Fetch the users from the database
      setUsers(fetchedUsers);  // Update the state with the users
    };

    loadUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.userDetails}>
        {/* <Text style={styles.userName}>{item.id}</Text> */}
        <Text style={styles.userName}>{item.id}. {item.username}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userEmail}>{item.password}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleUserPress = (user) => {
    // Handle user press (e.g., navigate to user details page)
    console.log('User pressed:', user);
    deleteUser(route);
    
    // loadUsers();

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        style={styles.userList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});
