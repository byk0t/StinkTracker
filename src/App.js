/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,  
  PermissionsAndroid,
} from 'react-native';


import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import { StContainer } from './components/container';
import { StRow, StCircle, StSlider, StButton, StPicker, StHelpButton, StHelpModal } from './components';
import I18n from "./utils/i18n";
import { createNewStink } from './utils/aws';
import { updateLastRequestTime, getLastRequestTime } from './utils/storage';

export default class App extends React.Component {
  
  state = {
    value: 0,
    position: null,
    smellType: 0,
    isHelpVisible: false,
    lastRequestTime: null,
  };

  smellTypes = [
    { label: I18n.t("unclear"), value: "unclear" },
    { label: I18n.t("sewage"), value: "sewage" },
    { label: I18n.t("manure"), value: "manure" },
    { label: I18n.t("burningRubber"), value: "burningRubber" },
    { label: I18n.t("hydrogenSulfide"), value: "hydrogenSulfide" },
    { label: I18n.t("treatmentFacilities"), value: "treatmentFacilities" },
    { label: I18n.t("tannery"), value: "treatmentFacilities" },
  ];

  componentDidMount() {    
  }

  render() {
    return (           
      <StContainer>
        <StRow flex={4}>
          <StCircle value={this.state.value} onPress={ () => this._updateValue() }/>
        </StRow>
        <StRow flex={1}>
          <StSlider onValueChange={value => this.setState({value: value})} value={this.state.value}/>
        </StRow>
        <StRow flex={1}>
            <StPicker onValueChange={(itemValue, itemIndex) => this.setState({smellType: itemValue})}
                smellType={this.state.smellType} smellTypes={this.smellTypes}/>
        </StRow>
        <StRow flex={1}>
          <StButton onPress={() => this._submit()} text={I18n.t("send")}/>          
        </StRow>
        <StRow flex={1} style={{width:'100%'}}>
          <StHelpButton onPress={() => this._toggleHelp()}/>
        </StRow>
        <StHelpModal visible={this.state.isHelpVisible} onClose={() => this._toggleHelp()}/>        
      </StContainer>
    );
  }

  _toggleHelp() {
    this.setState({isHelpVisible: !this.state.isHelpVisible})
  }
   _updateValue() {
    let v = this.state.value;
    if (v > 9)
      v = 0
    else
      v++;    
    this.setState({value: v})
  }

  async _submit() {    
    if(this.state.value == 0) {
      Alert.alert(I18n.t("noSmell"), I18n.t("noSmellExplanation"));
    } else {
      const now = (new Date()).getTime();
      const before = await getLastRequestTime();
      const diff = (now - before) / 1000; // seconds
      if(diff > 60) {
        this._enableGPS();
        await this._getPosition((position) => {
          this.setState({position:position});
          const stink = {
            value:this.state.value,
            lat:position.coords.latitude,
            lng:position.coords.longitude,
            smell:this.state.smellType,
          };
          const isOk = createNewStink(stink);
          if(isOk) {
            // @todo we can't use await here because this callback function hasn't got async keyword
            updateLastRequestTime();
          }
          if(__DEV__) {
            console.log("New Stink Request has benn sent");
            console.log(stink);
          }
        });
      } else {
        Alert.alert(I18n.t("wait"), I18n.t("oneRequestPerMinute"));
      }
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
          title: I18n.t("positionPermission"),
          message: I18n.t("positionPermissionText"),
          buttonNeutral: I18n.t("later"),
          buttonNegative: I18n.t("close"),
          buttonPositive: I18n.t("ok"),
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