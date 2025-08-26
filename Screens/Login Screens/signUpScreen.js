import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, Image, ScrollView, View, TextInput, Alert } from 'react-native';
import Colors from '../../components/Colors';
import { signup } from '../Auth/database'; // Import the signup function from db.js

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle sign up logic
  const handleSignup = async () => {
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Call the signup function from db.js to insert into the database
    const success = await signup(username, password, email, phoneNumber);
    
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
            source={require('../../assets/loginn.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.loginBox}>
          <Text style={styles.loginText}>Sign Up</Text>
        </View>
        <View style={styles.dataEntry}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter Name" 
            value={username}
            onChangeText={setUsername} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Enter Email" 
            value={email}
            onChangeText={setEmail} 
            // email
          />
          <TextInput 
            style={styles.input} 
            placeholder="Phone Number" 
            value={phoneNumber}
            onChangeText={setPhoneNumber} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Confirm Password" 
            secureTextEntry 
            value={confirmPassword}
            onChangeText={setConfirmPassword} 
          />

          <View style={styles.button}>
            <Pressable
              style={styles.pressAble}
              android_ripple={{ color: Colors.acent500 }}
              onPress={handleSignup} 
            >
              <Text style={styles.text}>Sign Up</Text>
            </Pressable>
          </View>

          <Text
            style={styles.sign}
            onPress={() => navigation.navigate('Login')} 
          >
            Already have an account? Sign in
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 6,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  img: {
    borderColor: 'black',
  },
  logo: {
    width: 330,
    height: 330,
    resizeMode: 'contain',
    margin: 2,
    // marginVertical: 4,
  },
  loginBox: {
    marginVertical: 18,
  },
  loginText: {
    color: 'red',
    fontSize: 44,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dataEntry: {
    flex: 1,
    width: '100%',
    padding: 8,
  },
  input: {
    fontSize: 18,
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
  },
  button: {
    marginVertical: 10,
  },
  pressAble: {
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.primary500,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    color: Colors.acent500,
    fontWeight: 'bold',
  },
  sign: {
    marginVertical: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
