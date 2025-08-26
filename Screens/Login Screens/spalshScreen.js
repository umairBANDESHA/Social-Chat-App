import React from 'react';
import { StyleSheet, Text, Image, View, StatusBar } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="yellow" />
      <Image 
        source={require('../../assets/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.hello}>Hello, Hi!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hello: {
    color: 'red',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
