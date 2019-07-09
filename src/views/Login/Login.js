import React, { Component, Fragment } from 'react';
import { StyleSheet, StatusBar, Platform, ScrollView, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  Button, 
  Input,
  Layout, 
  Text
} from 'react-native-ui-kitten';

class Login extends Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    password: ''
  }

  handleChange = (key) => (value) => {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#3267FF'}}/>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar translucent backgroundColor="#3267FF" barStyle="light-content" />
          <Layout style={{flex: 1}}>
            <ScrollView>
              <View style={styles.logo}>
                <Text category="h1" style={styles.logoTitle}>Login</Text>
                <Text category="p1" style={styles.logoSubtitle}>Lorem ipsum dolor sit amet</Text>
              </View>
              <View style={styles.container}>
                <Input 
                  placeholder="Username"
                  value={this.state.username}
                  onChangeText={this.handleChange('username')}
                  style={styles.input}
                />
                <Input 
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={this.handleChange('password')}
                  secureTextEntry
                  style={styles.input}
                />
                <Button onPress={() => this.props.navigation.navigate('Home')}>Login</Button>
                <Text category="p1" style={styles.forget}>Forgot your password?</Text>
              </View>
            </ScrollView>
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
          </Layout>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: 'white'
  },
  header: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 16,
  },
  container: {
    paddingHorizontal: 40,
    flex: 1
  },
  logo: {
    height: 200,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3267FF',
  },
  logoTitle: {
    color: '#fff',
    fontFamily: 'helvetica_neue_bd'
  },
  logoSubtitle: {
    color: '#fff',
    fontFamily: 'helvetica_neue_lt'
  },
  input: {
    marginBottom: 8
  },
  forget: {
    marginTop: 16,
    alignSelf: 'flex-end',
    color: '#3267FF'
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 20,
    justifyContent: 'center'
  },
  create: {
    color: '#3267FF',
    fontWeight: 'bold'
  }
});

export default Login;