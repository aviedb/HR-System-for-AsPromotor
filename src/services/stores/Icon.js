import React from 'react';
import { action } from 'mobx';
import { AntDesign } from '@expo/vector-icons';

class Icon {
  @action
  getIcon = (name, Component, color, size) => {
    if (!Component) Component = AntDesign;
    if (!color) color = "#1A2138";
    if (!size) size = 24;

    return <Component 
      name={name}
      size={size}
      color={color}
    />
  }
}

export default new Icon();