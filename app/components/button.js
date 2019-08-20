import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

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
