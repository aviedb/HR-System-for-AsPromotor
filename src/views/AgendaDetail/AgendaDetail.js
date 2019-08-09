import React, { Component, Fragment } from 'react';
import { StatusBar, Platform, View, SafeAreaView, Dimensions, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';
import Divider from '../../components/Divider';
import ImageBrowser from '../../components/ImageBrowser';

import styles from './styles';
import theme from '../../styles/theme';

const { width: screenWidth } = Dimensions.get('window');

@observer
class AgendaDetail extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable title = '';
  @observable images = [];
  @observable activeSlide = 0;

  componentDidMount() {
    const title = this.props.navigation.getParam('title', 'Title');
    this.title = title;

    setTimeout(() => {
      this.images = [
        'assets-library://asset/asset.HEIC?id=CC95F08C-88C3-4012-9D6D-64A413D254B3&ext=HEIC',
        'assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG',
        'assets-library://asset/asset.JPG?id=99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7&ext=JPG',
        'assets-library://asset/asset.JPG?id=9F983DBA-EC35-42B8-8773-B597CF782EDD&ext=JPG',
        'assets-library://asset/asset.JPG?id=B84E8479-475C-4727-A4A4-B77AA9980897&ext=JPG',
        'assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG',
      ]
    }, 1);
  }

  renderPagination() {
    return (
      <Pagination
        dotsLength={this.images.length}
        activeDotIndex={this.activeSlide}
        containerStyle={{ backgroundColor: 'transparent' }}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }

  _renderImageCarousel({item, index}, parallaxProps) {
    return (
      <View style={{width: screenWidth*80/100, height: screenWidth*60/100, marginTop: 20}}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={{flex: 1,
            marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
            backgroundColor: 'white',
            borderRadius: 8}}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: screenWidth*80/100, height: screenWidth*60/100,
            resizeMode: 'cover'}}
          parallaxFactor={0.4}
          {...parallaxProps}
      />
      </View>
    );
  }

  renderImages = () => {
    return (
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth*80/100}
        data={this.images}
        renderItem={this._renderImageCarousel}
        hasParallaxImages={true}
        onSnapToItem={(i) => this.activeSlide = i}
      />
    );
  }

  renderContent = () => {
    return (
      <ScrollView style={styles.container}>
        {this.renderImages()}
        {this.renderPagination()}
        <Text>Some text</Text>
      </ScrollView>
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
      <Fragment>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            backgroundColor={theme["status-bar-android"]}
            barStyle="dark-content" />
          <TopNavigation
            title={this.title}
            alignment={Platform.OS==='android'? "start": "center"}
            leftControl={<TopNavigationAction
              icon={icon.backIcon}
              onPress={() => this.props.navigation.goBack()}
            />}
            style={styles.header}
            titleStyle={styles.headerTitle} />
          {this.renderContent()}
          <Divider />
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default AgendaDetail;