import React, {Fragment} from 'react';
import { View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import MainNavigator from '../Navigation/index';


function MainStatusBar ({backgroundColor, ...props}) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

const HomeScreen =(props)=> {
    return (
        <Fragment>
            <MainStatusBar
                backgroundColor="black"
                barStyle="light-content"
            />
            <MainNavigator />
        </Fragment>
    );
}

export default HomeScreen;
