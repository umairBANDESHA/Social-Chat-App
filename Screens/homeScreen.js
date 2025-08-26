import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';

import { UserContext } from "../Screens/Auth/UserContext";
import { fetchAllPosts, fetchUserPosts, deletePostById, fetchUsers, fetchUser } from './Auth/database';
import formatTime from './Chat Screens/time';
// imort formatTime

const Tab = createMaterialTopTabNavigator();



export default function HomeScreen({ navigation }) {
  const { userId } = useContext(UserContext);


  // const { userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('Threads'); // State for active tab
  const [allPosts, setAllPosts] = useState([]); // Posts from all users
  const [myPosts, setMyPosts] = useState([]); // Posts by the current user
  const [user, setUser] = useState([]); // Current user details

  useEffect(() => {
    const loadThreads = async () => {
      try {
        if (userId) {
          const userPosts = await fetchAllPosts();
          const allUsers = await fetchUsers();

          const postsWithUserData = userPosts.map((post) => {
            const user = allUsers.find((u) => u.id === post.userId);
            return {
              ...post,
              username: user?.username || "App User",
              userImage: user?.profile_picture || "../assets/user-image.png",
              //F:\AAA\app\assets\user-image.png   assets\user-image.png
            };
          });
          // console.log(userId);
          setAllPosts(postsWithUserData); // Set the updated posts
        }
      } catch (error) {
        console.error("Error fetching All Posts:", error);
      }
    };
 
    const loadMyPosts = async () => {
      try {
        if (userId) {
          const userPosts = await fetchUserPosts(userId);
          const userDetails = await fetchUser(userId);
          const user = userDetails[0];
          
          const postsWithUserData = userPosts.map((post) => ({
            ...post,
            username: user?.username,
            userImage: user?.profile_picture || "../../assets/ipp.png",
          }));
          setMyPosts(postsWithUserData); // Set the updated posts
          setUser(user);
        }else{
          console.log('No user ID found');
        }
      } catch (error) {
        console.error("Error fetching my posts:", error + " " + userId);
      }
    };

    loadThreads();
    loadMyPosts();

    
  }, [userId]); 


  return (
    
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {user.username || "User"}</Text>
      </View>

      {/* Tabs */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          style={activeTab === 'Threads' ? styles.tabActive : styles.tabInactiveRight}
          onPress={() => setActiveTab('Threads')}
        >
          <Text style={styles.tabText}>Threads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'My Posts' ? styles.tabActive : styles.tabInactive}
          onPress={() => setActiveTab('My Posts')}
        >
          <Text style={styles.tabText}>My Posts</Text>
        </TouchableOpacity>
      </View> */}


      {/* Top Tab Navigation */}
      <Tab.Navigator
        initialRouteName="Threads"
        // style={activeTab === 'Threads' ? styles.tabActive : styles.tabInactiveRight}
       
      >
        <Tab.Screen name="Threads">
          {() => <ThreadsTab allPosts={allPosts} />}
        </Tab.Screen>
        <Tab.Screen name="My Posts">
          {() => <MyPostsTab myPosts={myPosts}/>}
        </Tab.Screen>
      </Tab.Navigator>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Post')}
      >
        <Icon name="add" size={30} color="black" />
      </TouchableOpacity>
      {/* TOO SEE DB */}
      {/* <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('Show DB')}
      >
        <Icon name="visibility" size={30} color="black" />
      </TouchableOpacity> */}
    </View>
  );
}


const ThreadsTab = ({ allPosts }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <Post
            key={post.id}
            userName={post.username}
            userImage={post.userImage}
            timestamp={formatTime(post.timestamp)}
            contentImage={post.image}
            textContent={post.content}
            description={post.description}
            likes={post.likes || 0}
            comments={post.comments || 0}
          />
        ))
      ) : (
        <Text style={styles.noPostsText}>No threads to display.</Text>
      )}
    </ScrollView>
  );
};

const MyPostsTab = ({ myPosts }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {myPosts.length > 0 ? (
        myPosts.map((post) => (
          <Post
            key={post.id}
            userName={post.username}
            userImage={post.userImage}
            timestamp={formatTime(post.timestamp)}
            contentImage={post.image}
            textContent={post.content}
            description={post.description}
            likes={post.likes || 0}
            comments={post.comments || 0}
          />
        ))
      ) : (
        <Text style={styles.noPostsText}>You have not uploaded any posts yet.</Text>
      )}
    </ScrollView>
  );
};


const Post = ({ userName, userImage, timestamp, contentImage, description, textContent, likes, comments, isDeletable, onDelete }) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Image style={styles.userImage} source={{ uri: userImage }} />
      <View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.postTime}>{timestamp}</Text>
      </View>
      {isDeletable && (
        <TouchableOpacity style={{ postion: 'absolute', right: '-65%' }} onPress={onDelete}>
          <Icon name="delete" size={28} color="red" />
        </TouchableOpacity>
      )}
    </View>
    <View>
    {contentImage ? (
      <Image style={styles.contentImage} source={{ uri: contentImage }} />
    ) : textContent ? (
      <Text style={styles.postContent}>{textContent}</Text>
    ) : (
      <Text style={styles.postContent}>No content available</Text>
    )}
    {description && <Text style={styles.postDescription}>{description}</Text>}
    </View>
    <View style={styles.actionRow}>
      <View style={styles.likeButton}>
        <TouchableOpacity>
          <Icon name="favorite" size={24} color="red" />
        </TouchableOpacity>
        <Text>{likes || 0}</Text>
        <TouchableOpacity>
          <Icon name="chat-bubble-outline" size={24} color="gray" />
        </TouchableOpacity>
        <Text>{comments || 0}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'yellow',
    paddingTop: 35,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 2,
    borderColor: 'orange',
  },
  tabInactive: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'yellow',
    borderBottomStartRadius: 25,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabInactiveRight: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'yellow',
    borderBottomEndRadius: 25,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontWeight: 'bold',
  },
  noPostsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'yellow',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: 'yellow',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postTime: {
    color: 'gray',
  },
  contentImage: {
    width: '100%',
    height: 200,
  },
  postDescription: {
    padding: 10,
    fontSize: 18,
  },
  postContent:{
    color:'black',
    padding: 10,
    fontSize: 18,
    marginVertical:10,
    backgroundColor:'#F5F5F7'
  },
  likeButton:{
    flexDirection:'row',
    justifyContent:'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
});
