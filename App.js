// App.js
import React,{ Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { setLocalNotification } from './utils/notification';
import store from './store'
import HomeScreen from './components/HomeScreen'
import { Provider } from 'react-redux';

export default class App extends Component {
  
  componentDidMount() {
    setLocalNotification();
  }

  render() {
      return (
          <Provider store={store}>
              <View style={styles.container}>
                <HomeScreen />
              </View>
          </Provider>
      );
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#dde'
  }
});