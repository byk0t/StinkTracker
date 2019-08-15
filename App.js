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
          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <Text style={styles.value}>{this.state.value}</Text>
            </View>
          </View>
          <View style={styles.sliderWrapper}>
            <View style={styles.ellipse}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#fff"                
                thumbTintColor="#fff"
                onValueChange={value => this.setState({value: value})}
              />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity = { .5 }
              onPress={ () => this._sendData() }>
              <Text style={styles.buttonText}>Отправить</Text>
            </TouchableOpacity>
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
    fontSize:100,
    color: '#fff',
    textAlign:'center',    
  },
  circle: {
    borderRadius: 200/2,
    backgroundColor: '#00BCD4',
    width:200,
    height:200,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  circleWrapper: {
    flex:4,
    justifyContent: 'center',
  }, 
  buttonWrapper: {    
    flex:1,
    justifyContent: 'center',
  },
  ellipse: {
    backgroundColor: '#00BCD4',
    opacity: 0.8,     
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',    
  },
  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  slider: {
    width: 200, 
    height: 40,
  },
  submitButton: { 
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width:200,
    opacity: 0.8,
  }, 
  buttonText:{
    color:'#fff',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 20
  }

});

