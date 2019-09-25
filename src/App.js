/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {Alert, ActivityIndicator, PermissionsAndroid, View, Dimensions, StyleSheet} from 'react-native';


import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import { StContainer } from './components/container';
import { StRow, StCircle, StSlider, StButton, StPicker, StHelpButton, StHelpModal } from './components';
import I18n from "./utils/i18n";
import { createNewStink } from './utils/aws';
import { updateLastRequestTime, getLastRequestTime } from './utils/storage';
import { getTranslatedSmellTypes } from './utils/smell-types';
import { log } from "./utils/logger";
import {Styles} from "./config/theme";

export default class App extends React.Component {
  
  state = {
    value: 0,
    position: null,
    smellType: 0,
    isHelpVisible: false,
    lastRequestTime: null,
    isLoading: false,
    orientation: '',
  };

  smellTypes = [];

  constructor(props) {
    super(props);
    this._loadSmellTypes();
    // this._detectOrientation();
  }

  componentDidMount() {
    this._detectOrientation();
    Dimensions.addEventListener('change', () => {
      this._detectOrientation();
    });
  }

  componentWillUnMount() {
    Dimensions.removeEventListener('change');
  }

  _detectOrientation() {
    const h = Dimensions.get('window').height; 
    const w = Dimensions.get('window').width;
    if(h >= w) {
      this.setState({orientation:'portrait'});
    } else {
      this.setState({orientation:'landscape'});
    }
  }

  render() {
    let containerFlexDirection = 'column';
    if(this.state.orientation == 'landscape') {
      containerFlexDirection = 'row';
    }
    return (           
      <StContainer style={{flexDirection: containerFlexDirection}}>
        { this.state.isLoading &&  <ActivityIndicator size="large" color="#fff" animating={true}/> }
        { !this.state.isLoading && <>
            <StRow flex={4} style={styles.circleContainer}>
              <StCircle value={this.state.value} onPress={ () => this._updateValue() }/>
            </StRow>
            <StRow flex={4} style={styles.buttonsContainer}>
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
            </StRow>
            <StRow flex={1} style={styles.helpButtonContainer}>
              <StHelpButton onPress={() => this._toggleHelp()}/>
            </StRow>
            <StHelpModal visible={this.state.isHelpVisible} onClose={() => this._toggleHelp()}/>
          </> }
      </StContainer>
    );
  }

  _loadSmellTypes() {
    this.smellTypes = getTranslatedSmellTypes();
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
        await this._getPosition(async (position) => {
          this.setState({position:position});
          const stink = {
            value:this.state.value,
            lat:position.coords.latitude,
            lng:position.coords.longitude,
            smell:this.state.smellType,
            locale: I18n.locale,
          };
          this.setState({isLoading: true});
          const isOk = await createNewStink(stink);
          this.setState({isLoading: false});
          if(isOk) {
            await updateLastRequestTime();
            log("New Stink Request has been sent");
            Alert.alert(I18n.t("thanks"), I18n.t("thanksForSendingData"));
          } else {
            Alert.alert(I18n.t("error"), I18n.t("errorWhileSendingData"));
            log("New Stink Request has not been sent");
          }
          log(stink);
        });
      } else {
        Alert.alert(I18n.t("wait"), I18n.t("oneRequestPerMinute"));
      }
    }
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
            log(error.code, error.message);
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
        log('You can use the location');
        result = true;
      } else {
        log('Location permission denied');
      }
    } catch (err) {
      log(err);
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
        log(data);
      }).catch(err => {        
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
        // codes : 
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        log(err);
      });
  }

};

const styles = StyleSheet.create({
  circleContainer: {
    height:'100%',
    alignItems:'center'
  },
  buttonsContainer: {
    height:'100%',
    flexDirection:'column',
    alignItems:'center'
  },
  helpButtonContainer: {
    width:'100%',
    alignItems:'flex-end',
    marginRight:10
  }
});
