import React, { Component } from 'react';
import { 
  StatusBar, 
  Platform, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Image
} from 'react-native';
import {
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ActionSheet from 'react-native-actionsheet';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';
import Fab from '../../components/FloatingActionButton';

import styles from './styles';

backIcon = () => {
  const name = Platform.OS === 'ios'? 'ios-arrow-back':'md-arrow-back';
  return icon.getIcon(name, Ionicons);
}

@observer
class AddReport extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable image = null;

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async (index) => {
    if (index === 2) return;
    await this.getPermissionAsync();

    const pickerType = index === 0? 'launchCameraAsync':'launchImageLibraryAsync';

    let result = await ImagePicker[pickerType]({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2]
    });

    if (!result.cancelled) {
      this.image = result.uri
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="#eee"
          barStyle="dark-content" />
        <TopNavigation
          title="Add Report"
          alignment={Platform.OS==='android'? "start": "center"}
          leftControl={<TopNavigationAction
            icon={backIcon}
            onPress={() => this.props.navigation.goBack()}
          />}
          style={styles.header}
          titleStyle={styles.headerTitle}
        />
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={{position: 'absolute'}}>Image</Text>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: this.image}}
            />
          </View>
          <Fab
            style={styles.upload}
            underlayColor="rgba(50, 103, 255, .7)"
            onPress={() => this.ActionSheet.show()}
          >
            {icon.getIcon('upload', null, '#fff', 20)}
          </Fab>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={['Open Camera', 'Select from Photos', 'Cancel']}
            cancelButtonIndex={2}
            onPress={this.pickImage}
          />
        </ScrollView>
        <View style={styles.divider}/>
      </SafeAreaView>
    );
  }
}

export default AddReport;