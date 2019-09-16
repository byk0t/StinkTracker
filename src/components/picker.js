import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { Styles } from "../config/theme";

export const StPicker = (props) => {
	return (
		<View style={styles.ellipse}>
      <Picker
        selectedValue={props.smellType}
        style={styles.picker}
        onValueChange={props.onValueChange}>
        { 
          props.smellTypes.map( v=> <Picker.Item key='{v.value}' label={v.label} value={v.value} /> ) 
        }                
      </Picker>
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
    overflow: 'hidden',
  },
  picker: {
    width: 200, 
    height: 40,
    color: '#fff',
  }
});
