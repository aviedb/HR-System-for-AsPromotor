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
  @observable soldNumbers = [];
  @observable activeSlide = 0;

  componentDidMount() {
    const item = this.props.navigation.getParam('item', { title: 'Empty' });
    this.title = item.title;
    this.soldNumbers = item.soldNumbers;
    setTimeout(() => {
      this.images = item.images || [];
    }, .1);
  }

  renderPagination() {
    return (
      <Pagination
        dotsLength={this.images.length}
        activeDotIndex={this.activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  renderImages = () => {
    return (
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth*80/100}
        data={this.images}
        hasParallaxImages={true}
        onSnapToItem={(i) => this.activeSlide = i}
        renderItem={({item, index}, parallaxProps) => (
          <View style={styles.carouselContainer}>
            <ParallaxImage
              source={{ uri: item }}
              containerStyle={styles.parallaxContainer}
              style={styles.parallaxStyle}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
          </View>
        )}
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
            titleStyle={styles.headerTitle}
          />
          {this.renderContent()}
          <Divider />
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default AgendaDetail;