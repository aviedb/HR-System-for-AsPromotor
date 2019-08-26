import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
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
      <SafeAreaView style={props.full? styles.safeArea : null}>
        <View style={styles.bottomSheetContainer}>
          <StatusBar backgroundColor="#474747"/>
          <View style={styles.bottomSheetHandle}/>
          {props.title &&
            <View>
              <Text style={styles.bottomSheetTitle}>
                {props.title}
              </Text>
              <Divider marginTop={16} marginBottom={16} color={theme["border-basic-color-4"]} />
            </View>
          }
          {props.children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default BottomSheet;