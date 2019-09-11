import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export const StHelpButton = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={styles.helpButton} >
      <Text style={styles.questionMark}>?</Text>
    </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  helpButton:{ 
    position: 'absolute',    
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:'#00BCD4',
    opacity: 0.8,
  },
  questionMark: {
    color:'#fff', 
    fontWeight:'bold',    
  }

});
