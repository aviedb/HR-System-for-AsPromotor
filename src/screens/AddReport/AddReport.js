import React, { Component } from 'react';
import { 
  StatusBar, 
  Platform, 
  View, 
  SafeAreaView,
  ImageBackground,
  ActionSheetIOS,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import { Input, Text, TopNavigation, TopNavigationAction, List, ListItem } from 'react-native-ui-kitten';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MaterialIcons } from '@expo/vector-icons';

import { icon, permission } from '../../services/stores';
import { db, storage } from '../../services/firebase';
import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';
import BottomSheet from '../../components/BottomSheet';
import Divider from '../../components/Divider';
import Touchable from '../../components/Touchable';
import ImageBrowser from '../../components/ImageBrowser';
import Fab from '../../components/FloatingActionButton';

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
  @observable soldNumbers = [];
  @observable soldNumbersId = [];
  @observable stok = 'Stok Toko';
  @observable comment = '';
  @observable bottomSheetVisible = false;
  @observable msisdnBottomSheetVisible = false;
  @observable imageBrowserVisible = false;
  @observable removeBottomSheetVisible = false;
  @observable removeImageIndex = null;
  @observable isUploading = false;
  @observable disableAdd = true;

  @observable msisdn = [];
  @observable isFetching = false;
  @observable search = '';

  componentDidMount() {
    this.fetchMsisdn();
  }

  fetchMsisdn = () => {
    this.isFetching = true;

    db.getMSISDN(res => {
      let data = res.docs.map(doc => {
        let id = doc.id;
        doc = doc.data();
        doc.id = id;
        doc.shipOutDate = moment(doc.shipOutDate.toDate()).format("D MMMM YYYY");
        return doc;
      }).filter(e => !e.sold);

      this.msisdn = data;
      this.isFetching = false;
    });
  }

  pickImage = async (index) => {
    if (index === 0) return;
    if (index === 3) return this.images = [];

    await this.closeBottomSheet();
    await permission.camaraRoll();

    if (index === 2) return this.imageBrowserVisible = true;

    ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    }).then(res => {
      if (!res.cancelled) this.images = [...this.images, res];
    }).catch(err => {
      console.warn(err);
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
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', 'Remove picture'],
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
      this.images = [...this.images, ...images];
    }).catch(err => {
      console.warn(e);
    });
  }

  addSoldNumber = () => {
    if (this.sold.length < 1) return;
    if (this.soldNumbers.includes(this.sold)) return this.sold = '';

    this.soldNumbers = [...this.soldNumbers, this.sold];
    this.sold = '';
  }

  removeSoldNumber = (index) => () => {
    this.soldNumbers = this.soldNumbers.filter((n, i) => i !== index);
  }

  uploadImages = (callback) => {
    this.isUploading = true;
    if (this.images.length === 0) return callback([]);

    console.log('Uploading images');
    let imagesUrl = [];

    for (let i = 0; i < this.images.length; i++) {
      let filename = `${this.images[i].filename}-${new Date().toISOString()}`;

      storage.doUploadImage(this.images[i], filename)
        .then(() => {
          return storage.getDownloadUrl(filename);
        }).then(res => {
          imagesUrl.push(res);

          if (imagesUrl.length === this.images.length) {
            callback(imagesUrl);
          }
        }).catch(err => {
          console.warn(err);
        });
    }
  }

  handleAddReport = () => {
    this.uploadImages(images => {
      console.log('Adding report');

      if (this.soldNumbers.length === 0 && this.sold.length > 0) {
        this.soldNumbers = [this.sold];
      }

      let size = this.soldNumbers.length;
      let data = {
        title:  `${size} number${size>1? 's':''} sold (${this.stok})`,
        stok: this.stok,
        soldNumbers: this.soldNumbers,
        note: this.comment,
        images: images
      }

      db.addAsProReport(data).then(() => {
        this.updateMsisdnSold(() => {
          this.isUploading = false;
          this.props.navigation.navigate('HomeTabNavigator');
        });
      }).catch(err => {
        console.warn(err);
      });
    });
  }

  updateMsisdnSold = (callback) => {
    if (this.stok === 'Stok Toko') return callback();
    
    let counter = 0;
    this.soldNumbersId.map(id => {
      db.updateMsisdn(id).then(() => {
        counter++;

        if (counter === this.soldNumbersId.length) {
          callback();
        }
      }).catch(err => {
        console.warn(err);
      });
    });
  }

  openMsisdnBottomSheet = () => {
    if (this.stok !== 'Stok Telin') return;

    this.msisdnBottomSheetVisible = true;
  }

  toggleTelinMsisdn = (msisdn) => () => {
    let id = this.msisdn.find(e => e.msisdn === msisdn).id;

    if (this.soldNumbers.includes(msisdn)) {
      this.soldNumbers = this.soldNumbers.filter((e) => e !== msisdn);
      this.soldNumbersId = this.soldNumbersId.filter((e) => e !== id);
    } else {
      this.soldNumbers.push(msisdn);
      this.soldNumbersId.push(id);
    }
  }

  handleChange = (key) => (value) => {
    this[key] = value;
  }

  renderMsisdnBottomSheet = () => {
    const data = this.msisdn.filter(e => 
      e.msisdn.toLowerCase().includes(this.search.toLowerCase()) ||
      e.subAgent.toLowerCase().includes(this.search.toLowerCase())
    );

    return (
      <BottomSheet
        isVisible={this.msisdnBottomSheetVisible}
        full
        closeBottomSheet={() => this.msisdnBottomSheetVisible = false}
        title={`${this.soldNumbers.length} Selected`}
      >
        <View style={styles.search}>
          <Input 
            placeholder="Search by MSISDN or sub agent"
            value={this.search}
            onChangeText={this.handleChange('search')}
            size="small"
            style={styles.input}
            labelStyle={styles.labelStyle}
            icon={(style) => {
              let color = style.tintColor;
              delete style.tintColor;
              return icon.getIcon({ name: 'search1', color });
            }}
          />
        </View>
        <List 
          data={data}
          keyExtractor={(item, index) => String(index)}
          style={styles.msisdnContainer}
          renderItem={({ item }) => (
            <ListItem
              title={item.msisdn}
              description={`${item.subAgent}\n${item.shipOutDate}`}
              style={{
                ...styles.msisdnItem,
                backgroundColor: this.soldNumbers.includes(item.msisdn)?'#eee':'#fff'
              }}
              titleStyle={styles.msisdnItemTitle}
              descriptionStyle={styles.msisdnItemSubtitle}
              onPress={this.toggleTelinMsisdn(item.msisdn)}
            />
          )}
        />
      </BottomSheet>
    );
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
            {icon.getIcon({
              name: 'camera-alt',
              Component: MaterialIcons,
              color: theme["text-disabled-color"]
            })}
            <Text style={styles.bottomSheetItemTitle}>Take photo</Text>
          </View>
        </Touchable>
        <Touchable onPress={() => this.pickImage(2)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon({
              name: 'image',
              Component: MaterialIcons,
              color: theme["text-disabled-color"]
            })}
            <Text style={styles.bottomSheetItemTitle}>Choose image</Text>
          </View>
        </Touchable>
        {this.images.length > 0 &&
          <Touchable onPress={() => this.pickImage(3)}>
            <View style={styles.bottomSheetItem}>
              {icon.getIcon({
                name: 'clear',
                Component: MaterialIcons,
                color: theme["text-danger-disabled-color"]
              })}
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
            {icon.getIcon({
              name: 'clear',
              Component: MaterialIcons,
              color: theme["text-danger-disabled-color"]
            })}
            <Text style={styles.bottomSheetItemTitleDanger}>Remove picture</Text>
          </View>
        </Touchable>
      </BottomSheet>
    );
  }

  renderImages() {
    if (this.images.length < 1) return (
      <View style={styles.uploadButton}>
        <Button onPress={this.openActionSheet}>Upload Foto</Button>
      </View>
    );

    return (
      <FlatList 
        data={this.images}
        horizontal
        keyExtractor={(item, index) => String(index)}
        ListFooterComponent={() => <View style={{width: 28}}/>}
        ListHeaderComponent={() => (
          <View style={{paddingLeft: 32, paddingRight: 8, alignItems: 'center', justifyContent: 'center'}}>
            <Fab 
              underlayColor={theme["color-primary-active"]}
              onPress={this.openActionSheet}
              style={styles.fab}
            >
              {icon.getIcon({ name: 'plus', color: '#fff', size: 20 })}
            </Fab>
          </View>
        )}
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

  renderSoldNumbers() {
    if (this.soldNumbers.length < 1) return <View />;

    return (
      <View style={styles.soldNumberWrapper}>
        {this.soldNumbers.map((number, i) => (
          <View key={i}>
            <View style={styles.soldNumberItem}>
              <Text>{number}</Text>
              {icon.getIcon({
                name: 'close',
                color: theme["text-danger-disabled-color"],
                size: 20,
                onPress: this.removeSoldNumber(i)
              })}
            </View>
            {i !== this.soldNumbers.length-1 && 
              <Divider color={theme["border-basic-color-5"]} />
            }
          </View>
        ))}
      </View>
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

    let disableAdd = !(this.soldNumbers.length>0 || this.sold.length>0);
    
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
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.formContainer}>
            <Text category="h5">Report Detail</Text>
            <Divider color={theme["border-basic-color-4"]} marginBottom={20}/>
            <SelectInput 
              label="Pilih stok"
              value={this.stok}
              onValueChange={value => {
                this.stok = value;
                this.soldNumbers = [];
              }}
              options={["Stok Toko", "Stok Telin"]}
              style={styles.select}
            />
            <TouchableOpacity onPress={this.openMsisdnBottomSheet} activeOpacity={1}>
              <Input 
                label="Nomor yang dijual"
                value={this.sold}
                onChangeText={value => this.sold = value}
                keyboardType="phone-pad"
                style={styles.input}
                labelStyle={styles.labelStyle}
                onEndEditing={this.addSoldNumber}
                disabled={this.stok === 'Stok Telin'}
                maxLength={20}
                pointerEvents={this.stok === 'Stok Telin'? 'none':null}
                icon={(style) => {
                  let color = style.tintColor;
                  delete style.tintColor;
                  return icon.getIcon({
                    name: 'plus', 
                    color: this.stok === 'Stok Telin'? '#CBD5E0':color, 
                    size: 20, 
                    onPress: this.addSoldNumber
                  });
                }}
              />
            </TouchableOpacity>
            {this.renderSoldNumbers()}
            <Input 
              label="Catatan"
              multiline={true}
              numberOfLines={3}
              value={this.comment}
              onChangeText={value => this.comment = value}
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
          </View>
          {this.renderImages()}
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          {this.isUploading
            ? <ActivityIndicator size="large" color={theme["text-primary-color"]}/>
            : <Button onPress={this.handleAddReport} disabled={disableAdd}>Done</Button>
          }
        </View>
        {this.renderBottomSheet()}
        {this.renderMsisdnBottomSheet()}
        {this.renderRemoveBottomSheet()}
      </SafeAreaView>
    );
  }
}

export default AddReport;