import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { UserContext  } from "../Auth/UserContext";
import { fetchChatFriends } from "../Auth/database";
import formatTime from './time';


export default function ContactScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { userId, setUserId } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  const menuItems = [
    { id: "1", name: "Add Friends", screen: "Add Friends" },
    { id: "2", name: "Friend Requests", screen: "Friends Request" },
    { id: "3", name: "Log Out" },
  ];

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const userList = await fetchChatFriends(userId); // Fetch users
        // console.log(JSON.stringify(userList));
        setFriends(userList);
      } catch (error) {
        console.error(error);
      }
    }
    
    loadFriends();
    
  });

  const toggleBtn = () => setModalVisible(!modalVisible);

  const handleMenuItemClick = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.name === "Log Out") {
      Alert.alert("Log Out", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => logOut()  },
      ]);
    }
    setModalVisible(false);
  };

  const logOut =() =>{
    setUserId(null);
    navigation.navigate("Login");
    console.log(userId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.searchBoxArea}>
        <Text style={styles.Text} > Chats</Text>
        <Icon name="more-vert" size={30} color="black" onPress={toggleBtn} />
      </View>
      <View style={styles.searchBoxArea}>
        <TextInput style={styles.searchBox} placeholder="Search for friends" />
       
      </View>

      {/* Menu Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleBtn}
      >
        <TouchableWithoutFeedback onPress={toggleBtn}>
          <View style={styles.modalOverlay}>
            <View style={styles.menu}>
              <FlatList
                data={menuItems}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleMenuItemClick(item)}>
                    <View style={styles.menuItem}>
                      <Text>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Chat List */}
      <FlatList
        data={friends}
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
              <Pressable onPress={() => navigation.navigate("Chat", { friend: item.user_id })}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item?.last_msg || 'Last message ...'}</Text>
              </Pressable>
            </View>
            <Text style={styles.time}>{formatTime(item.msgTime)}</Text>
          </View>
        )}
      />
        <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('Friends Screen')}
      >
        <Icon name="chat" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "yellow",
    padding: 10,
  },
  Text: {
    fontSize: 28,
    fontWeight: 'bold',
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
    bottom: 10,
    right: 20,
    backgroundColor: 'yellow',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 55,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
