import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';

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
    backgroundColor: '#00BCD4',
    opacity: 0.8,     
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    width: 200, 
    height: 40,
    color: '#fff',
  }
});
