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
        <Text style={{color: theme["color-primary-500"]}} category="h6">PDF</Text>
      </View>
      <View style={styles.content}>
        <Text category="s1">{props.item.title}</Text>
        <Text category="s2" style={{color: theme["text-disabled-color"]}}>
          {props.item.createdAt}
        </Text>
      </View>
      <Touchable onPress={() => props.navigation.navigate('PdfViewer', {
        item: props.item
      })}>
        <View style={styles.viewButton}>
          <Text style={{color: theme["text-alternate-color"]}}>View PDF</Text>
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