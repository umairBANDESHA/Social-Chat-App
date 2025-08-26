import React, { useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Button, Pressable, SafeAreaView } from 'react-native';
import { UserContext } from "../Screens/Auth/UserContext";
import WifiManager from 'react-native-wifi-reborn';
import moment from 'moment'; // Install this using `npm install moment`

import { sendMessage,
  fetchUser,
  deletePostById, 
  fetchAllPosts, 
  fetchChatMessages, 
  login, 
  signup, 
  fetchFriends, 
  addFriend, 
  fetchUsers, 
  fetchUserPosts, 
  savePost,
  sendRequest,
  acceptRequest,
  declineRequest,
  fetchFreindRequests,  
  fetchSentRequests,
  fetchChatFriends,
  ussers,
  updateProfile
 } from '../Screens/Auth/database';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('app.db'); // Open the SQLite database

export default function ShowDB() {
    const { userId } = useContext(UserContext);
  const [tables, setTables] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [users, setUsers] = useState([]);

  // Function to fetch tables and columns
  const showTablesAndColumns = async () => {
    try {
      // Query to get all the tables in the database
      const tablesResult = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table';");
      let tableDetails = [];

      // Loop through all the tables and get columns for each table
      for (const table of tablesResult) {
        const tableName = table.name;
        
        // Query to get the columns of the current table
        const columnsResult = await db.getAllAsync(`PRAGMA table_info(${tableName});`);
        
        // Extract column names
        const columns = columnsResult.map(col => col.name);

        // Add the table and its columns to the list
        tableDetails.push({ name: tableName, columns });
      }

      // Update the state with the fetched table details
      setTables(tableDetails);
    } catch (error) {
      console.error('Error fetching tables and columns:', error);
    }
  };
  const loadUser = async () => {
    try {
      if (userId) {
        const userArray = await  fetchFreindRequests(userId);  // userArray is an array
        
          // const user = userArray[0];  // Get the first user
          setUsers(userArray);  // Now users is an object, not an array
        //   console.log(user.timestamp);
  }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  const loadFriendRequests = async () => {
    try {
      const requests = await fetchSentRequests(userId);
      // console.log("Fetched Friend Requests:", requests); // Log for debugging
      setFriendRequests(requests); // Update state with fetched requests
    } catch (error) {
      console.error("Error loading friend requests:", error);
    }
  };
  const loadFriends = async () => {
    try {
      const requests = await db.getAllAsync(`select * from friends ;`);
      // console.log(JSON.stringify(requests));
      setUsers(requests); 
    } catch (error) {
      console.error("Error loading friend requests:", error);
    }
  };

  useEffect(() => {
      
    if (userId) {
      showTablesAndColumns();
      loadFriendRequests();
      loadFriends();
      }

    }, [userId]);
    
    const Btn1= async ()=>{
      await db.runAsync(`
        CREATE TABLE IF NOT EXISTS friends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (friend_id) REFERENCES users(id)
        );
      `);
    return true;
    };
    const Btn = async () => {
      let abc = await WifiManager.disconnectFromSSID('VoidSoft');
      if(abc){
        console.log('wifi disconnected');
      }
  
    };
    const Btn2 = () => {
      // console.log(" this is " +JSON.stringify( fetchSentRequests(3)))
      acceptRequest(1,4);
      // addFriend(1, 3);
    }
   
  return (
    <SafeAreaView style={styles.container}>
    
        <Text style={styles.header}>USER ID:  {userId} </Text>
      
      <FlatList
        data={loadUser}
        keyExtractor={(item) => item.user_id}       
        style={styles.flatList}
        renderItem={({ item }) => (
          <View style={styles.tableContainer}>
             {/* <Text style={styles.tableHeader}>Sender ID : {item.sender_id}</Text> */}
             {/* <Text style={styles.tableHeader}>Receiver ID : {item.receiver_id}</Text> */}
            {/* <Text style={styles.tableHeader}>User Status: {item.status}</Text> */}
            {/* <Text style={styles.tableHeader}>ID: {item.id}</Text> */}
             {/* <Text style={styles.tableHeader}>Receiver ID : {item.user_id}</Text> */}
            {/* <Text style={styles.tableHeader}>Sender ID: {item.friend_id}</Text> */}
            {/* <Text style={styles.tableHeader}>User Name: {item.sender_username}</Text> */}
            {/* <Text style={styles.tableHeader}>User Pic: {item.sender_picture}</Text> */}
            {/* <Text style={styles.tableHeader}>User Time: {moment(item.created_at).fromNow()}</Text> */}
            {/* <Text style={styles.tableName}> {item.name}</Text>
            <Text style={styles.columns}> {item.columns}, </Text>  */}
           
            {/* {item.content !== null ? ( <Text  style={styles.tableName} >{item.content}</Text>) : (<Text  style={styles.tableName}>An image here</Text>)}
            {/* <Text style={styles.tableName}> {item.content =='' ? 'image'}</Text> */}
            <Text style={styles.columns}>{item.username}</Text> 
          </View>
        )}
      />
      {/* SOME THING */} 
      <Text style={styles.header}>Friends</Text>
      <FlatList
        data={users}
        style={styles.flatList}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <View style={styles.tableContainer}>
             <Text style={styles.tableHeader}>User ID : {item.user_id}</Text>
             <Text style={styles.tableHeader}>Friend ID : {item.friend_id}</Text>
          </View>
        )}
      />
      {/* TABLES */}
      <Text style={styles.header}>Tables</Text>
      <FlatList
        data={tables}
        style={styles.flatList }
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <View style={styles.tableContainer}>
               <Text style={styles.tableName}> {item.name}</Text>
            <Text style={styles.columns}> {item.columns} </Text> 
          </View>
        )}
      />

      

      <Pressable style={styles.btn} onPress={()=>Btn()}>
        <Text style={styles.btnText}>Button</Text>
      </Pressable>
       
    
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginVertical:20,
      backgroundColor: 'skyblue',
    },
    line: {
      width: '100%',
      height: 5, 
      backgroundColor: 'brown', 
      marginBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 20,
      marginBottom: 20,
      textAlign: 'center',
      backgroundColor:'yellow',
      color:'black'
    },
    flatList:{
      margin:5,
      paddingVertical:5,
      marginVertical: 20,
      backgroundColor:'#E8F9FF'
    },
    tableContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    tableName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    columns: {
      fontSize: 16,
      color: '#555',
    },
    text:{
        fontSize: 16,
        color: '#555',
    },
    btn:{
      backgroundColor: '#4caf50',
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    },
    btnText:{
      color :'white',
      textAlign:'center',
      fontSize:30
    }
    


  });
  
  
  