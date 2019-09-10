import React from 'react';
import { View, } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import { Entypo } from '@expo/vector-icons';

import Touchable from '../Touchable';

import styles from './styles';
import theme from '../../styles/theme';

import { icon } from '../../services/stores';

const Card = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.preview}>
        <Text style={styles.previewText}>{props.preview}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleText}>{props.item.title}</Text>
        <Text style={styles.subtitleText}>{props.item.createdAt}</Text>
      </View>
      <Touchable onPress={props.onPress}>
        <View style={styles.viewButton}>
          <Text style={styles.buttonText}>{props.buttonText}</Text>
          {icon.getIcon({
            name: 'chevron-small-right',
            color: theme["text-alternate-color"],
            Component: Entypo
          })}
        </View>
      </Touchable>
    </View>
  );
}

export default Card;