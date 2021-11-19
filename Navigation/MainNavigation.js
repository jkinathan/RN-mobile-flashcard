// MainNavigation.js
import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { FontAwesome5,Ionicons } from '@expo/vector-icons';
// import { createStackNavigator } from 'react-navigation';
import { TabNavigator, createStackNavigator } from "react-navigation";
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import DeckDetail from '../components/DeckDetail';
import AddCard from '../components/Card';
import Quiz from '../components/QuizAndroid';

import { green, lightGreen } from '../utils/colors';

const Tabs = TabNavigator(
  {
    Home: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: () => <FontAwesome5 name="home" size={24} color="#88c" />,
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: () => <Ionicons name="add" size={30} color={"balck"} />,
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? blue : "white",
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? "white" : "blue",
        shadowColor: "rgba(10, 10, 10, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
      },
    },
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        },
        title: 'Deck Details'
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        },
        headerTitleStyle: {
          textAlign: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Add Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        }
      }
    }
  },
  { headerLayoutPreset: 'center' }
);

export default MainNavigator;