import React, { Component } from 'react';
import { 
  StatusBar, 
  Platform, 
  View, 
  SafeAreaView, 
  ScrollView, 
  ImageBackground,
  ActionSheetIOS,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Input,
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MaterialIcons } from '@expo/vector-icons';

import { icon } from '../../services/stores';
import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';
import BottomSheet from '../../components/BottomSheet';
import Divider from '../../components/Divider';
import Touchable from '../../components/Touchable';
import ImageBrowser from '../../components/ImageBrowser';

import styles from './styles';
import theme from '../../styles/theme';

@observer
class AddReport extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable images = [];
  @observable title = '';
  @observable sold = '';
  @observable stok = 'Stok Toko';
  @observable comment = '';
  @observable bottomSheetVisible = false;
  @observable imageBrowserVisible = false;
  @observable removeBottomSheetVisible = false;
  @observable removeImageIndex = null;

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
      await this.closeBottomSheet();
    }

    if (index === 0) return;
    if (index === 3) return this.images = [];

    await this.getPermissionAsync();

    if (index === 2) return this.imageBrowserVisible = true;

    ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    }).then(res => {
      if (!res.cancelled) {
        this.images = [
          ...this.images,
          res
        ];
      }
    }).catch(err => {
      console.log(err);
    });
  }

  openActionSheet = () => {
    if (Platform.OS === 'android') {
      this.bottomSheetVisible = true;
    } else if (Platform.OS === 'ios') {
      let options = ['Cancel', 'Take photo', 'Choose image'];
      if (this.images.length > 0) options.push('Remove pictures');

      ActionSheetIOS.showActionSheetWithOptions({
        options,
        destructiveButtonIndex: this.images.length > 0? 3:null,
        cancelButtonIndex: 0
      }, this.pickImage);
    }
  }

  openRemoveActionSheet = (imageIndex) => () => {
    if (Platform.OS === 'android') {
      this.removeBottomSheetVisible = true;
      this.removeImageIndex = imageIndex;
    } else if (Platform.OS === 'ios') {
      let options = ['Cancel', 'Remove picture'];

      ActionSheetIOS.showActionSheetWithOptions({
        options,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      }, (index) => {
        if (index === 1) {
          this.images = this.images.filter((e, i) => i !== imageIndex);
        }
      });
    }
  }

  closeBottomSheet = () => {
    this.bottomSheetVisible = false;
    this.removeBottomSheetVisible = false;
  }

  imageBrowserCallback = (callback) => {
    callback.then(images => {
      this.imageBrowserVisible = false;
      this.images = [
        ...this.images,
        ...images
      ];
    }).catch((e) => console.log(e));
  }

  renderBottomSheet = () => {
    return (
      <BottomSheet
        isVisible={this.bottomSheetVisible}
        closeBottomSheet={this.closeBottomSheet}
        title="Foto Event"
      >
        <Touchable onPress={() => this.pickImage(1)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('camera-alt', MaterialIcons, theme["text-disabled-color"])}
            <Text style={styles.bottomSheetItemTitle}>Take photo</Text>
          </View>
        </Touchable>
        <Touchable onPress={() => this.pickImage(2)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('image', MaterialIcons, theme["text-disabled-color"])}
            <Text style={styles.bottomSheetItemTitle}>Choose image</Text>
          </View>
        </Touchable>
        {this.images.length > 0 &&
          <Touchable onPress={() => this.pickImage(3)}>
            <View style={styles.bottomSheetItem}>
              {icon.getIcon('clear', MaterialIcons, theme["text-danger-disabled-color"])}
              <Text style={styles.bottomSheetItemTitleDanger}>Remove pictures</Text>
            </View>
          </Touchable>
        }
      </BottomSheet>
    );
  }

  renderRemoveBottomSheet = () => {
    return (
      <BottomSheet
        isVisible={this.removeBottomSheetVisible}
        closeBottomSheet={this.closeBottomSheet}
        title="Remove picture?"
      >
        <Touchable onPress={() => { 
          this.images = this.images.filter((e, i) => i !== this.removeImageIndex);
          this.removeImageIndex = null;
          this.closeBottomSheet();
        }}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('clear', MaterialIcons, theme["text-danger-disabled-color"])}
            <Text style={styles.bottomSheetItemTitleDanger}>Remove picture</Text>
          </View>
        </Touchable>
      </BottomSheet>
    );
  }

  renderImages() {
    return (
      <FlatList 
        data={this.images}
        horizontal
        keyExtractor={(item, index) => String(index)}
        ListHeaderComponent={<View style={{width: 28}}/>}
        ListFooterComponent={<View style={{width: 28}}/>}
        renderItem={({item, index}) => (
          <TouchableOpacity onLongPress={this.openRemoveActionSheet(index)} activeOpacity={.8}>
            <ImageBackground
              source={{uri: item.uri}}
              resizeMode="cover"
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            />
          </TouchableOpacity>
        )}
      />
    );
  }

  render() {
    if (this.imageBrowserVisible) {
      return (
        <ImageBrowser
          emptyText={'No photos'}
          callback={this.imageBrowserCallback}
        />
      );
    }
    
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="#eee"
          barStyle="dark-content" />
        <TopNavigation
          title="Add Report"
          alignment={Platform.OS==='android'? "start": "center"}
          leftControl={<TopNavigationAction
            icon={icon.backIcon}
            onPress={() => this.props.navigation.goBack()}
          />}
          style={styles.header}
          titleStyle={styles.headerTitle}
        />
        <ScrollView style={styles.container}>
          <View style={styles.formContainer}>
            <Text category="h5">Report Detail</Text>
            <Divider color="#D3DDE9" marginBottom={20}/>
            <SelectInput 
              label="Pilih stok"
              value={this.stok}
              onValueChange={value => this.stok = value}
              options={["Stok Toko", "Stok Telin"]}
              style={styles.select}
            />
            <Input 
              label="Nomor yang dijual"
              value={this.sold}
              onChangeText={value => this.sold = value}
              keyboardType="numeric"
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <Input 
              label="Komentar"
              multiline={true}
              numberOfLines={3}
              value={this.comment}
              onChangeText={value => this.comment = value}
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <Button onPress={this.openActionSheet}>Upload Foto</Button>
          </View>
          {this.renderImages()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleAddReport}>Done</Button>
        </View>
        {this.renderBottomSheet()}
        {this.renderRemoveBottomSheet()}
      </SafeAreaView>
    );
  }
}

export default AddReport;