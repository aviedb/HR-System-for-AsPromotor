import React, { Component } from 'react';
import { Text } from 'react-native';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import {  
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { setCustomText } from 'react-native-global-props';
import * as Font from 'expo-font';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import MSISDN from './src/screens/MSISDN';
import KnowledgeBase from './src/screens/KnowledgeBase';
import ASproReport from './src/screens/ASproReport';
import PayrollSlip from './src/screens/PayrollSlip';
import Schedule from './src/screens/Schedule';
import PdfViewer from './src/screens/PdfViewer';
import AgendaDetail from './src/screens/AgendaDetail';
import AddReport from './src/screens/AddReport';
import AuthLoading from './src/screens/Auth/AuthLoading';

import { icon } from './src/services/stores';
import theme from './src/styles/theme';

// disable font scaling
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const HomeTabNavigator = createBottomTabNavigator({
  MSISDN,
  KnowledgeBase,
  ASproReport,
  PayrollSlip,
  Schedule
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName = '';

      if (routeName === 'MSISDN') iconName = 'home';
      else if (routeName === 'KnowledgeBase') iconName = 'iconfontdesktop';
      else if (routeName === 'ASproReport') iconName = 'pluscircle';
      else if (routeName === 'PayrollSlip') iconName = 'mail';
      else if (routeName === 'Schedule') iconName = 'calendar';

      return icon.getIcon({
        name: iconName,
        color: tintColor
      });
    },
  }),
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    showLabel: false,
    keyboardHidesTabBar: true,
    activeTintColor: theme["icon-active-color"],
    inactiveTintColor: theme["icon-control-color"],
    style: {
      borderTopColor: theme["border-basic-color-3"]
    }
  }
});

const AppStack = createStackNavigator({
  HomeTabNavigator, // initial app stack is Tab Navigator
  PdfViewer,
  AgendaDetail,
  AddReport
});

const AuthStack = createStackNavigator({
  Login,
  Signup,
});

const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading,
  AppStack,
  AuthStack
}, {
  initialRouteName: 'AuthLoading'
}));

@observer
class App extends Component {

  @observable fontLoaded = false;

  async componentDidMount() {
    await Font.loadAsync({
      'helvetica_neue': require('./src/assets/fonts/helvetica_neue.ttf'),
      'helvetica_neue_lt': require('./src/assets/fonts/helvetica_neue_lt.ttf'),
      'helvetica_neue_it': require('./src/assets/fonts/helvetica_neue_it.ttf'),
      'helvetica_neue_md': require('./src/assets/fonts/helvetica_neue_md.ttf'),
      'helvetica_neue_bd': require('./src/assets/fonts/helvetica_neue_bd.ttf'),
      'helvetica_neue_hv': require('./src/assets/fonts/helvetica_neue_hv.ttf'),
      'product_sans_thin': require('./src/assets/fonts/product_sans_thin.ttf'),
      'product_sans_light': require('./src/assets/fonts/product_sans_light.ttf'),
      'product_sans_regular': require('./src/assets/fonts/product_sans_regular.ttf'),
      'product_sans_medium': require('./src/assets/fonts/product_sans_medium.ttf'),
      'product_sans_bold': require('./src/assets/fonts/product_sans_bold.ttf')
    });

    this.fontLoaded = true;
    this.defaultFonts();
  }

  defaultFonts(){
    const customTextProps = {
      style: {
        fontFamily: 'helvetica_neue_md',
      }
    }
    setCustomText(customTextProps);
  }

  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}
      >
        {this.fontLoaded &&
          <AppContainer />
        }
      </ApplicationProvider>
    );
  }
}

export default App;