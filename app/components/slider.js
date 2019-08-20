import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export const StSlider = (props) => {
	return (
		<View style={styles.ellipse}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#fff"                
        thumbTintColor="#fff"
        onValueChange={props.onValueChange}
      />
    </View>
	);
}

const styles = StyleSheet.create({
  ellipse: {
    backgroundColor: '#00BCD4',
    opacity: 0.8,     
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',    
  },
  slider: {
    width: 200, 
    height: 40,
  }
});
