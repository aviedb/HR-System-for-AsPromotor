import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Lottie from 'lottie-react-native';

import styles from './styles';

class EmptyList extends Component {
  componentDidMount() {
    this._playEmptyAnimation();
  }

  _playEmptyAnimation = () => {
    this.emptyAnimation.reset();
    this.emptyAnimation.play(10, 100);
  }

  _onRefresh = () => {
    this._playEmptyAnimation();
    this.props.onRefresh();
  }

  render() {
    return (
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl 
          refreshing={this.props.refreshing}
          onRefresh={this._onRefresh}
        />}
      >
        <Lottie 
          ref={animation => {
            this.emptyAnimation = animation;
          }}
          style={styles.lottie}
          loop={false}
          source={require(`../../assets/animations/empty.json`)}
        />
        <Text style={styles.title}>
          {this.props.refreshing? 'Loading...':this.props.title}
        </Text>
      </ScrollView>
    );
  }
}

export default EmptyList