import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Styles } from "../config/theme";

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
        value={props.value}
      />
    </View>
	);
}

const styles = StyleSheet.create({
  ellipse: {
    backgroundColor: Styles.backgroundColor,
    opacity: Styles.opacity,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Styles.borderColor,
  },
  slider: {
    width: 200, 
    height: 40,
  }
});
