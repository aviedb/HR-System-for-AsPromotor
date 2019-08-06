import React, { Component, Fragment } from 'react';
import { StatusBar, View, TouchableOpacity, AsyncStorage, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Text } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Button from '../../../components/Button';

import styles from '../styles';
import theme from '../../../styles/theme';

@observer
class Login extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable username = '';
  @observable password = '';

  handleChange = (key) => (value) => {
    this[key] = value;
  }

  attemptLogin = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('AppStack');
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.safeAreaTop}/>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar 
            translucent 
            backgroundColor={theme["color-primary-default"]} 
            barStyle="light-content"
          />
          <View style={{flex: 1}}>
            <KeyboardAwareScrollView>
              <View style={styles.logo}>
                <Text category="h1" style={styles.logoTitle}>Login</Text>
                <Text category="p1" style={styles.logoSubtitle}>HR System for AsPromoter</Text>
              </View>
              <View style={styles.container}>
                <Input 
                  placeholder="Username"
                  value={this.username}
                  onChangeText={this.handleChange('username')}
                  style={styles.input}
                />
                <Input 
                  placeholder="Password"
                  value={this.password}
                  onChangeText={this.handleChange('password')}
                  secureTextEntry
                  style={styles.input}
                />
                <Button onPress={this.attemptLogin}>Login</Button>
                <Text category="p1" style={styles.forget}>Forgot your password?</Text>
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.footer}>
              <Text category="p1">{"Don't have an account? "}</Text>
              <TouchableOpacity>
                <Text 
                  category="p1" 
                  style={styles.create}
                  onPress={() => this.props.navigation.navigate('Signup')}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default Login;