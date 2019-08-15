import React, { Component, Fragment } from 'react';
import { StatusBar, Platform, View, SafeAreaView, Dimensions, ScrollView } from 'react-native';
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
  @observable stok = '';
  @observable note = '';
  @observable activeSlide = 0;

  componentDidMount() {
    const item = this.props.navigation.getParam('item', {});
    this.title = item.title || 'Empty';
    this.soldNumbers = item.soldNumbers || [];
    this.stok = item.stok || '';
    this.note = item.note || '';
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
      <Fragment>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth*80/100}
          data={this.images}
          hasParallaxImages={true}
          onSnapToItem={(i) => this.activeSlide = i}
          renderItem={({item}, parallaxProps) => (
            <View style={styles.parallaxView}>
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
        {this.renderPagination()}
      </Fragment>
    );
  }

  renderContent = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          {this.images.length === 0
            ? <Text style={styles.noPhoto}>Image not available</Text>
            : this.renderImages()
          }
        </View>
        <View style={styles.content}>
          <Text style={styles.textStok} category="h5">{this.stok}</Text>
          <Text style={styles.textNote}>{this.note}</Text>
          <View>
            {this.soldNumbers.map((number, i) => (
              <Text key={i} style={styles.textNumber}>{number}</Text>
            ))}
          </View>
        </View>
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