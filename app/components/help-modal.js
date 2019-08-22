import React from 'react';
import { View, StyleSheet, Text, Modal, TouchableHighlight } from 'react-native';

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
          <Text style={styles.mainText}>
            Эта программа помогает автоматизировать сбор информации о состоянии воздуха
            и наличии неприятных запахов. {"\n\n"}
            1. Выберите интенсивность запаха по шкале от 1 до 10 {"\n"}
            2. Укажите ваши ощущения (чем пахло). {"\n"}
            3. Нажмите на кнопку "Отправить" {"\n\n"}
            Дополнительно приложение отправляет информацию о ваших GPS-координатах.
            По всем вопросам и предложениям обращаться к разработчикам.                
          </Text>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={props.onClose}>
            <Text>Закрыть</Text>
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
