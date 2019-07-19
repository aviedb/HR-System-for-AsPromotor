import React, { Component } from 'react';
import { 
  StatusBar, 
  Platform, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Image,
  ActionSheetIOS
} from 'react-native';
import {
  Button,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import ActionSheet from 'react-native-actionsheet';
import RBSheet from "react-native-raw-bottom-sheet";
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MaterialIcons } from '@expo/vector-icons';

import { icon } from '../../services/stores';
import Fab from '../../components/FloatingActionButton';
import Divider from '../../components/Divider';
import Touchable from '../../components/Touchable';

import styles from './styles';
import theme from '../../styles/theme';

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
  @observable sold = '';

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async (index) => {
    if (Platform.OS === 'android') {
      this.RBSheet.close();
    }

    if (index === 3) return;
    if (index === 2) return this.image = null;

    await this.getPermissionAsync();

    const pickerType = index === 0? 'launchCameraAsync':'launchImageLibraryAsync';

    ImagePicker[pickerType]({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2]
    }).then(res => {
      if (!res.cancelled) {
        this.image = res.uri
      }
    }).catch(err => {
      console.log(err);
    });
  }

  openActionSheet = () => {
    if (Platform.OS === 'android') {
      this.RBSheet.open();
    } else if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Take photo', 'Choose image', 'Remove picture', 'Cancel'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
        title: 'Complete action using:'
      }, this.pickImage);
    }
  }

  renderBottomSheet = () => {
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={220}
        duration={250}
        customStyles={{
          container: styles.bottomSheetContainer
        }}
      >
        <Text style={styles.bottomSheetTitle}>
          Complete Action Using:
        </Text>
        <Divider marginTop={12} marginBottom={12} color={theme["border-basic-color-4"]} />
        <Touchable onPress={() => this.pickImage(0)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('camera-alt', MaterialIcons, theme["text-disabled-color"])}
            <Text style={styles.bottomSheetItemTitle}>Take photo</Text>
          </View>
        </Touchable>
        <Touchable onPress={() => this.pickImage(1)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('image', MaterialIcons, theme["text-disabled-color"])}
            <Text style={styles.bottomSheetItemTitle}>Choose image</Text>
          </View>
        </Touchable>
        <Touchable onPress={() => this.pickImage(2)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('clear', MaterialIcons, theme["text-danger-color"])}
            <Text style={styles.bottomSheetItemTitleDanger}>Remove picture</Text>
          </View>
        </Touchable>
      </RBSheet>
    );
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
            <Text style={{position: 'absolute'}}>Foto Event</Text>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: this.image}}
            />
          </View>
          <View style={styles.formContainer}>
            <Text category="h5">Report Detail</Text>
            <Divider color="#D3DDE9" marginBottom={20}/>
            <Input 
              label="Field 1"
              value={this.sold}
              onChangeText={value => this.sold = value}
              keyboardType="numeric"
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <Input 
              label="Field 2"
              value={this.sold}
              onChangeText={value => this.sold = value}
              keyboardType="numeric"
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
          </View>
          <Fab
            style={styles.upload}
            underlayColor={theme["text-primary-active-color"]}
            onPress={this.openActionSheet}
          >
            {icon.getIcon(this.image?'edit':'upload', null, '#fff', 20)}
          </Fab>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button>Next</Button>
        </View>
        {this.renderBottomSheet()}
      </SafeAreaView>
    );
  }
}

export default AddReport;