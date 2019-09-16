import React from 'react';
import { View, StyleSheet, Text, Modal, TouchableHighlight } from 'react-native';
import I18n from "../utils/i18n";

export const StHelpModal = (props) => {
	return (
		<Modal          
      animationType="slide"
      transparent={true}
      visible={props.visible}
      >
      <View style={styles.outerView}>
        <View style={styles.innerView}>
          <Text style={styles.appTitle}>Stink Tracker</Text>
          <Text style={styles.mainText}>{I18n.t("helpText")}</Text>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={props.onClose}>
            <Text>{I18n.t("close")}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
	);
}

const styles = StyleSheet.create({
  outerView:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  innerView:{
    backgroundColor: '#fff',
    padding: 20
  },
  appTitle: {
    fontWeight:'bold',
    textAlign:'center'
  },
  mainText: {
    marginTop:10,
  },
  closeButton: {
    borderWidth:1,
    marginTop:20,
    alignItems:'center'
  }
});
