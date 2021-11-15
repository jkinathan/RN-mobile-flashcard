// Quiz.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import QuizAndroid from './QuizAndroid';
import QuizIOS from './QuizIOS';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

export class Quiz extends Component {

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');

    if (Constants.platform.android) {
      return <QuizAndroid title={title} />;
    }
    return <QuizIOS title={title} />;
  }
}

export default Quiz;