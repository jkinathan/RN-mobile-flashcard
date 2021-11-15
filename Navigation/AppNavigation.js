// AppNavigation.js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import MainTabNavigator from './MainNavigation';

export default createAppContainer(MainTabNavigator);