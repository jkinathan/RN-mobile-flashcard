// Quiz.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import QuizAndroid from './QuizAndroid';
import Quiz_iOS from './Quiz_iOS';

export class Quiz extends Component {
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
    return <QuiziOS title={title} />;
  }
}

export default Quiz;