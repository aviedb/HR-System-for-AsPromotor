import React, { Component, Fragment } from 'react';
import { StatusBar, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Button, 
  Input,
  Text
} from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import styles from './styles';

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

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#3267FF'}}/>
        <SafeAreaView style={styles.safeArea}>
          <View style={{flex: 1}}>
            <StatusBar translucent backgroundColor="#3267FF" barStyle="light-content" />
            <ScrollView>
              <View style={styles.logo}>
                <Text category="h1" style={styles.logoTitle}>Sign up</Text>
                <Text category="p1" style={styles.logoSubtitle}>Lorem ipsum dolor sit amet</Text>
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
                <Button onPress={() => this.props.navigation.navigate('Home')}>Sign up</Button>
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