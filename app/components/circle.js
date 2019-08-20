import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const StCircle = (props) => {
	return (
		<View style={styles.circle}>
      <Text style={styles.value}>{props.value}</Text>
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
    backgroundColor: '#00BCD4',
    width:200,
    height:200,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
