import React, { Component, Fragment } from 'react';
import { StatusBar, ScrollView, View, TouchableOpacity, AsyncStorage, SafeAreaView } from 'react-native';
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
  @observable email = '';
  @observable password = '';
  @observable password2 = '';

  handleChange = (key) => (value) => {
    this[key] = value;
  }

  attemptSignup = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('AppStack');
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.safeAreaTop}/>
        <SafeAreaView style={styles.safeArea}>
          <View style={{flex: 1}}>
            <StatusBar 
              translucent 
              backgroundColor={theme["color-primary-default"]} 
              barStyle="light-content"
            />
            <ScrollView>
              <View style={styles.logo}>
                <Text category="h1" style={styles.logoTitle}>Sign up</Text>
                <Text category="p1" style={styles.logoSubtitle}>HR System for AsPromoter</Text>
              </View>
              <View style={styles.container}>
                <Input 
                  keyboardType="email-address"
                  placeholder="Email"
                  value={this.email}
                  onChangeText={this.handleChange('email')}
                  style={styles.input}
                />
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
                <Input 
                  placeholder="Re-enter password"
                  value={this.password2}
                  onChangeText={this.handleChange('password2')}
                  status={this.password===this.password2?'':'danger'}
                  secureTextEntry
                  style={styles.input}
                />
                <Button onPress={this.attemptSignup}>Sign Up</Button>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <Text category="p1">{"Already have an account? "}</Text>
              <TouchableOpacity>
                <Text 
                  category="p1" 
                  style={styles.create}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Login
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