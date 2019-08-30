import React, { Component, Fragment } from 'react';
import { StatusBar, Platform, View, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import {
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
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
  @observable date = '';
  @observable email = '';
  @observable activeSlide = 0;

  componentDidMount() {
    const item = this.props.navigation.getParam('item', {});
    this.title = item.title || 'Empty';
    this.soldNumbers = item.soldNumbers || [];
    this.stok = item.stok || '';
    this.note = item.note || '';
    this.date = moment(item.date.toDate()).fromNow() || 'a few seconds ago';
    this.email = item.email || '';
    setTimeout(() => {
      this.images = item.images || [];
    }, 1);
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
                parallaxFactor={0}
                {...parallaxProps}
              />
            </View>
          )}
        />
        {this.renderPagination()}
      </Fragment>
    );
  }

  renderSoldNumbers() {
    if (this.soldNumbers.length < 1) return <View />;

    return (
      <View style={styles.soldNumberWrapper}>
        <View style={styles.soldNumberItem}>
          <Text style={styles.soldNumberTitle}>
            {`Sold Number${this.soldNumbers.length>1?'s':''}:`}
          </Text>
        </View>
        {this.soldNumbers.map((number, i) => (
          <View key={i}>
            <Divider color={theme["border-basic-color-4"]} />
            <View style={styles.soldNumberItem}>
              <Text style={styles.soldNumberText}>{number}</Text>
            </View>
          </View>
        ))}
      </View>
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
          <View style={styles.dateWrapper}>
            <Text style={styles.textEmail}>{`${this.email} • `}</Text>
            <Text style={styles.textDate}>{this.date}</Text>
          </View>
          <Text style={styles.textNote}>{this.note || "-"}</Text>
          {this.renderSoldNumbers()}
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