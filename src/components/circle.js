import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback,Alert } from 'react-native';
import { Styles } from "../config/theme";

export const StCircle = (props) => {
	return (		
    <View style={styles.circle} >
      <TouchableWithoutFeedback onPress={ props.onPress }>
        <Text style={styles.value}>{props.value}</Text>
      </TouchableWithoutFeedback>
    </View>
	);
}

const styles = StyleSheet.create({
  value: {
    fontWeight: 'bold',
    fontSize:100,
    color: '#fff',
    textAlign:'center',    
  },
  circle: {
    borderRadius: 200/2,
    backgroundColor: Styles.backgroundColor,
    width:200,
    height:200,
    opacity: Styles.opacity,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Styles.borderColor,
  },
});
