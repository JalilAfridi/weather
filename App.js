/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
} from 'react-native';
import Home from './src/screens/Home';



const App = () => {

  return (
        <View
          style={{ flex:1 }}>
           
          <Home></Home>
        </View>
  );
};


export default App;
