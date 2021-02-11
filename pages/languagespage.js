import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TextInput,
  I18nManager,
  Platform,
  ImageBackground,
  Image
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import HTMLView from 'react-native-htmlview';
import {inject, observer} from 'mobx-react/native';
import RNRestart from 'react-native-restart';
//import I18n from 'react-native-i18n';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    sendthecomment:"Send comment",
    languagespagse:"Languages",
  },
  ar: {
    sendthecomment:"إرسال التعليق",
    languagespagse:"اللغات",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class languagespage extends Component {
  constructor(props){
    super(props);
    console.log("languagespage");
    this.state = {
      pagecontent: '',
      loading: true,
    }
    self = this;
    console.log(props);
    console.log(this.props.store);
  }


  componentDidMount(){
    setTimeout(function () {
      if(self.props.store.languages == 'null'){
        strings.setLanguage('ar');
        self.props.store.changelanguages('ar');
        self.setState({});
        self.setState({loading:false});
        I18nManager.forceRTL(true);
        RNRestart.Restart();
      }else{
        strings.setLanguage('ar');
        self.setState({});
        self.setState({loading:false});
        I18nManager.forceRTL(true);

        if(self.props.store.userName !== 'null'){
            Actions.home();
        }else{
          Actions.splash();
        }
      }
    }, 1000);
  }

  changelanguages(lang){
    strings.setLanguage(lang);
    this.props.store.changelanguages(lang);

    if(lang == 'ar'){
      I18nManager.forceRTL(true);
      self.setState({loading:false});
    }else{
      I18nManager.forceRTL(false);
      self.setState({loading:false});
    }
    RNRestart.Restart();
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#FFFFFF' }}>
        <ImageBackground
          source={require('../images/splash.jpg')}
          style={{width:width,height:height, flexDirection:'column', justifyContent:'center', alignItems:'center'}}
        >
            <Spinner visible={this.state.loading} color={'#9d2888'} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  loginButtonText: {
    width:150,
    height:45,
    backgroundColor: 'transparent',
    color:'#fff',
    textAlign:'center',
    paddingHorizontal:8,
    writingDirection:'rtl',
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    marginTop:8,
    textAlign:'center'
  },
  loginButton:{
    width:150,
    height:45,
    marginTop:25,
    backgroundColor:'#faaa0d',
    borderRadius:20,
  },
});

module.exports = languagespage;
