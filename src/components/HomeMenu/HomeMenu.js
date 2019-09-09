import React, { Component } from 'react';
import { TopNavigationAction } from 'react-native-ui-kitten';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import styles from './styles';
import theme from '../../styles/theme';
import { icon } from '../../services/stores';
import { auth } from '../../services/firebase';

class HomeMenu extends Component {

  navigateToProfile = () => {
    this._menu.hide();
    this.props.navigation.navigate('Profile');
  }

  attemptLogout = async () => {
    this._menu.hide();
    console.log('Signing out');

    auth.doSignOut()
      .then(() => {
        console.log('Signed out');
        this.props.navigation.navigate('AuthStack');
      }).catch(err => {
        console.warn(err);
      });
  }

  render() {
    return (
      <TopNavigationAction
        icon={() => (
          <Menu
            ref={ref => this._menu = ref}
            button={icon.getIcon({ name: 'ellipsis1', onPress: () => this._menu.show() })}
          >
            <MenuItem
              onPress={this.navigateToProfile}
              textStyle={styles.menuItemText}
            >
              Profile
            </MenuItem>
            <MenuItem
              onPress={this.navigateToProfile}
              textStyle={styles.menuItemText}
            >
              Settings
            </MenuItem>
            <MenuDivider/>
            <MenuItem
              onPress={this.attemptLogout}
              textStyle={{ ...styles.menuItemText, color: theme["text-danger-color"] }}
              underlayColor={theme["color-danger-100"]}
            >
              Logout
            </MenuItem>
          </Menu>
        )}
      />
    );
  }
}

export default HomeMenu;