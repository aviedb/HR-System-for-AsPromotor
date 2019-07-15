import React, { Component } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { setCustomText } from 'react-native-global-props'
import * as Font from 'expo-font';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Login from './src/views/Login';
import Signup from './src/views/Signup';
import Home from './src/views/Home';
import MSISDNDetail from './src/views/MSISDNDetail';
import PdfViewer from './src/views/PdfViewer';
import AgendaDetail from './src/views/AgendaDetail';
import AddReport from './src/views/AddReport';

const AppNavigator = createStackNavigator({
  Login,
  Signup,
  Home,
  MSISDNDetail,
  PdfViewer,
  AgendaDetail,
  AddReport
});
const AppContainer = createAppContainer(AppNavigator);

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
      'helvetica_neue_hv': require('./src/assets/fonts/helvetica_neue_hv.ttf')
    });

    this.fontLoaded = true;
    this.defaultFonts();
  }

  defaultFonts(){
    const customTextProps = {
      style: {
        fontFamily: 'helvetica_neue_md'
      }
    }
    setCustomText(customTextProps);
  }

  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        {this.fontLoaded &&
          <AppContainer />
        }
      </ApplicationProvider>
    );
  }
}

export default App;