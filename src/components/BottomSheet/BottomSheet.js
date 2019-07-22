import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Modal from "react-native-modal";

import Divider from '../Divider';

import styles from './styles';
import theme from '../../styles/theme';

const BottomSheet = (props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      swipeDirection="down"
      onBackButtonPress={props.closeBottomSheet}
      onBackdropPress={props.closeBottomSheet}
      onSwipeComplete={props.closeBottomSheet}
      style={styles.bottomSheetModal}
    >
      <View style={styles.bottomSheetContainer}>
        <StatusBar backgroundColor="#474747"/>
        <View style={styles.bottomSheetHandle}/>
        <Text style={styles.bottomSheetTitle}>
          {props.title}
        </Text>
        <Divider marginTop={16} marginBottom={16} color={theme["border-basic-color-4"]} />
        {props.children}
      </View>
    </Modal>
  );
}

export default BottomSheet;