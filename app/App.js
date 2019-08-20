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
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';


import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import { StContainer } from './components/container';
import { StCircle, StSlider, StButton } from './components';

export default class App extends React.Component {
  
  state = {
    value: 0,
    position: null,
  }

  componentDidMount() {    
  }

  render() {
    return (           
      <StContainer>
        <View style={styles.circleWrapper}>
          <StCircle value={this.state.value} onPress={ () => this._updateValue() }/>
        </View>
        <View style={styles.sliderWrapper}>
          <StSlider onValueChange={value => this.setState({value: value})} value={this.state.value}/>
        </View>
        <View style={styles.buttonWrapper}>
          <StButton onPress={() => this._sendData()} text="Отправить"/>          
        </View>
      </StContainer>
    );
  }

  _updateValue() {
    let v = this.state.value;
    if (v > 9)
      v = 0
    else
      v++;    
    this.setState({value: v})
  }

  async _sendData() {
    if(this.state.value == 0) {
      Alert.alert(
        "Нету запаха ?",
        "Оценка должна быть больше ноля. Мы не записываем чистый воздух."
      )
    } else {
      this._enableGPS();
      await this._getPosition((position) => {
        this.setState({position:position});        
        console.log(position.coords);
        console.log(this.state.value);
      });
    }
  }

  async _getPosition(callback) {
    const hasLocationPermission = await this._requestPositionPermission();
    if(hasLocationPermission) {
      console.log(hasLocationPermission);
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
      console.log(err);
    }
    return result;
  }


  _enableGPS() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
        console.log(data);
      }).catch(err => {        
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
        // codes : 
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        console.log(err);
      });
  }

};

const styles = StyleSheet.create({    
  circleWrapper: {
    flex:4,
    justifyContent: 'center',
  }, 
  buttonWrapper: {    
    flex:1,
    justifyContent: 'center',
  },  
  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

