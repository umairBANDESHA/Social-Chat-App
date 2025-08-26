import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Pressable, Text, Image, ScrollView, View, TextInput, FlatList } from 'react-native';
import {initializeDatabase, login } from '../Auth/database';
import * as SQLite from 'expo-sqlite';
import Colors from '../../components/Colors';
import { UserContext } from '../Auth/UserContext';


export default function LoginScreen({navigation}) { 
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useContext(UserContext); 


  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      
      if (result) {
        
        setUserId(result.id);
        // console.log(result.id);
        navigation.navigate('HomeTabs', { userId: result.id });
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Optionally show an alert or error message to the user
    }
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
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.dataEntry}>
          <TextInput 
          style={styles.input}
          placeholder="User Name"  
          value={username}
          onChangeText={setUsername}
          />
          <TextInput 
          style={styles.input} 
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
           />
          <Text style={styles.forgot}>Forgot Password?</Text>
          
          {/* Navigate to SignUp when button is pressed */}
          <Pressable
            style={styles.pressAble}
            android_ripple={{ color: Colors.acent500 }}
            onPress={handleLogin} 
          >
            <Text style={styles.text}>Login</Text>
          </Pressable>
          
          <Text 
            style={styles.sign} 
            onPress={() => navigation.navigate('SignUp')} 
          >
            Don't have an account? Sign up
          </Text>
        </View>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 18,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  img: {
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    margin: 4,
    marginVertical: 8,
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
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
    width: '100%',
  },
  forgot: {
    textAlign: 'right',
    color: 'blue',
    marginBottom: 10,
  },
  pressAble: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.primary500,
    borderRadius: 15,
    marginVertical: 10,
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
