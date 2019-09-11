import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';

export const StContainer = (props) => {
	return (
		<ImageBackground 
	        source={require('./background.jpeg')}      
	        style={styles.background}>
	        <View style={styles.container}>
	          {props.children}
	        </View>
      	</ImageBackground>
	);
}

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    height: '100%',    
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
