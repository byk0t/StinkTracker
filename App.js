/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button
} from 'react-native';

const App = () => {
  return (           
    <ImageBackground 
      source={require('./app/background.jpeg')}      
      style={styles.background}>
      <View style={styles.container}>
        <Button              
          title="Отправить"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </ImageBackground>      
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    height: '100%',     
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
