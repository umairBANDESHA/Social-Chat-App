import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // If you are using Expo
import { fetchUserPosts, savePost } from '../Auth/database';
import { UserContext } from "../Auth/UserContext";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CreatePostScreen({ navigation }) {
  // const { userId } = route.params; // Get userId from route parameters
  
  const { userId, setUserId } = useContext(UserContext);

  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save the image URI
      setContent(''); // Clear the text content if an image is picked
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!content && !image) {
      alert('Please provide either an image or text.');
      return;
    }

    const timestamp = new Date().toISOString(); // Generate timestamp
    const post = {
      userId,
      content: image ? null : content, // Text content if no image
      image: image || null, // Image URI if present
      description,
      timestamp,
    };

    try {
      await savePost(post); // Save post to the database
      alert('Post created successfully!');
      console.log( fetchUserPosts(userId));
      // navigation.navigate('HomeTabs'); // Navigate to the home screen
      setContent('');
      setDescription('');
      setImage(null);
      navigation.navigate('HomeTabs');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Icon  name="close" size={38} color="#000" style={styles.icon} onPress={()=> navigation.navigate('HomeTabs')} />

      <Text style={styles.header}>Create a New Post</Text>

      {/* Text Input for Post Content */}
      <TextInput
        style={styles.textInput}
        placeholder="Write your post here"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={(text) => {
          setContent(text);
          setImage(null); // Clear image if text is added
        }}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Pick an Image'}
        </Text>
      </TouchableOpacity>

      {/* Show the selected image */}
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      {/* Text Input for Description */}
      <TextInput
        style={styles.textInput}
        placeholder="Add a description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  icon:{
    position: 'absolute',
    top: 10,
    right: 10,

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#333',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  submitButton: {
     padding: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
});
