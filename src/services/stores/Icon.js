import React from 'react';
import { action, computed } from 'mobx';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

class Icon {
  @action
  getIcon = (name, Component, color, size, onPress) => {
    if (!Component) Component = AntDesign;
    if (!color) color = "#1A2138";
    if (!size) size = 24;

    return (
      <Component
        name={name}
        size={size}
        color={color}
        onPress={onPress}
      />
    );
  }

  @computed
  get backIcon() {
    const name = Platform.OS === 'ios'? 'ios-arrow-back':'md-arrow-back';
    return () => this.getIcon(name, Ionicons);
  }
}

export default new Icon();