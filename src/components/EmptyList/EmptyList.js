import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Lottie from 'lottie-react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import styles from './styles';

@observer
class EmptyList extends Component {

  @observable finished = false;
  @observable firstTimeFinished = false;

  componentWillReceiveProps(nextProps) {
    if (nextProps.playAnimation) {
      this.emptyAnimation.play(10, 144);
    } else {
      this.emptyAnimation.reset();
      this.emptyAnimation.play(10, 100);
    }
  }

  render() {
    const message = this.props.message || 'Empty List';
    
    return (
      <View style={styles.container}>
        <Lottie 
          ref={animation => {
            this.emptyAnimation = animation;
          }}
          style={styles.lottie}
          loop={this.props.playAnimation}
          source={require(`../../assets/animations/empty.json`)}
        />
        <Text style={styles.title}>
          {message}
        </Text>
      </View>
    );
  }
}

export default EmptyList