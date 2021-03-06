import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Styles } from "../config/theme";

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
    // right: 10,
    // bottom: 10,
    borderWidth: 1,
    borderColor: Styles.borderColor,
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:Styles.backgroundColor,
    opacity: Styles.opacity,
  },
  questionMark: {
    color:'#fff', 
    fontWeight:'bold',    
  }

});
