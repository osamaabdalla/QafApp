import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {Provider, observer} from 'mobx-react/native';
import {SafeAreaView} from 'react-navigation';
import ListStore from './pages/listStore';
import App from './pages/App';

var self;
export default class Qaf extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Provider store={ListStore}><App /></Provider>
    );
  }
}


AppRegistry.registerComponent('Qaf', () => Qaf);
