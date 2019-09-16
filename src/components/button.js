import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Styles } from "../config/theme";

export const StButton = (props) => {
	return (
		<TouchableOpacity
      style={styles.submitButton}
      activeOpacity = { .5 }
      onPress={ props.onPress }>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  submitButton: { 
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:Styles.backgroundColor,
    borderRadius:10,
    borderWidth: 1,
    borderColor: Styles.borderColor,
    width:200,
    opacity: Styles.opacity,
  }, 
  buttonText:{
    color:'#fff',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
