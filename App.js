import React, { Component } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './src/views/Login';
import Signup from './src/views/Signup';
import Home from './src/views/Home';

const AppNavigator = createStackNavigator({
  Login,
  Signup,
  Home,
});
const AppContainer = createAppContainer(AppNavigator);

class App extends Component {

  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <AppContainer />
      </ApplicationProvider>
    );
  }
}

export default App;