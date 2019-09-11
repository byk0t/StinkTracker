import React from 'react';
import { View, StyleSheet } from 'react-native';

export const StRow = (props) => {
	const { flex, style } = props;
	return (
		<View style={[{flex:flex}, styles.row, style]}>{props.children}</View>
	);
}

const styles = StyleSheet.create({
	row: {
		justifyContent: 'center',
	},
});