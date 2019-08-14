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
  Button,
  Alert,
  PermissionsAndroid
} from 'react-native';
import Slider from '@react-native-community/slider';
import Geolocation from 'react-native-geolocation-service';

export default class App extends React.Component {
  
  state = {
    value: 0,
    position: null,
  }


  componentDidMount() {    
  }

  render() {
    return (           
      <ImageBackground 
        source={require('./app/background.jpeg')}      
        style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.value}>{this.state.value}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#000000"
            onValueChange={value => this.setState({value: value})}
          />
          <View style={styles.buttonWrapper}>
            <Button
              style={styles.button}
              title="Отправить"            
              accessibilityLabel="Learn more about this purple button"
              onPress={ () => this._sendData() }
            />
          </View>
        </View>
      </ImageBackground>      
    );
  }

  async _sendData() {    
    await this._getPosition((position) => {
      this.setState({position:position});        
      console.warn(position.coords);
      console.warn(this.state.value);
    });    
  }

  async _getPosition(callback) {    
    const hasLocationPermission = await this._requestPositionPermission();
    if(hasLocationPermission) {
      Geolocation.getCurrentPosition(
          (position) => {             
              callback(position)
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }    
  }

  async _requestPositionPermission() {
    let result = false;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Разрешение геолокации',
          message: 'Для отправки данных, нам нужно знать ваши координаты',
          buttonNeutral: 'Позже',
          buttonNegative: 'Завершить',
          buttonPositive: 'Хорошо',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        result = true;
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    return result;
  }

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
  },
  value: {
    fontWeight: 'bold',
    fontSize:50,
    color: 'blue',
    backgroundColor: 'white',
    width:100,
    textAlign:'center',
    borderRadius: 25,
    opacity: 0.8
  },
  button: {
    color: '#841584',
    borderRadius: 25,
    marginTop:10
  },
  buttonWrapper: {
    marginTop:10,    
  },
  slider: {
    width: 200, 
    height: 40,
    backgroundColor: 'white',
    opacity: 0.8,
    marginTop:10
  }
});

