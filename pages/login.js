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
  Alert,
  ImageBackground,
  StatusBar,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import Spinner from 'react-native-loading-spinner-overlay';
import {inject, observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconf from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';
//import I18n from 'react-native-i18n';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    sendthecomment:"Send comment",
    languagespagse:"Languages",
    skip:"Skip",
    login:"Login",
    registernew:"Register",
    loginerror:"Wrong Login Data",
    lostPassword:"Lost Password ?",
    error:"Error",
    ok:"OK",
    username:"Email",
    password:"Password",
    reigstertype:"Select reigsteration type",
    normaluser:"Normal user",
    foodtruck:"Foodtruck owner",
    cancel:"Cancel",
    newreigster:"New reigster",
  },
  ar: {
    reigstertype:"إختر نوع التسجيل",
    username:"البريد الإلكتروني",
    password:"كلمة المرور",
    ok:"حسنا",
    error:"خطأ",
    sendthecomment:"إرسال التعليق",
    loginerror:"بيانات الدخول خاطئة",
    languagespagse:"اللغات",
    skip:"تخطي",
    login:"دخــول",
    registernew:"تسجيل جديد",
    lostPassword:"نسيت كلمة السر ؟",
    normaluser:"مستخدم عادي",
    foodtruck:"صاحب عربة طعام",
    cancel:"إلغاء",
    newreigster:"تسجيل جديد",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class splash extends Component {
  constructor(props){
    super(props);
    if(Platform.OS === 'ios'){
      StatusBar.setBarStyle('dark-content', true);
    }else{
      StatusBar.setBarStyle('light-content', true);
    }
    this.state = {
      pagecontent: '',
      username: '',
      password: '',
      loading: false,
    }
    self = this;
    console.log(props);
    console.log(this.props.store);
  }


  componentWillMount(){
      setTimeout(function () {
        console.log(self.props.store.languages);
        strings.setLanguage('ar');
        self.setState({});
        Actions.refresh({title: strings.languagespagse});
        if(self.props.store.languages == 'ar'){
          console.log('ar forced');
          I18nManager.forceRTL(true);
        }else{
          console.log('en forced');
          I18nManager.forceRTL(false);
        }
      }, 500);
  }

  _skip(){
    console.log('_skiped');
    Actions.home({type: 'reset'});
  }

  _login(){
     self.setState({
       loading: true,
     });
     var user = self.state.username;
     var pass = self.state.password;
     console.log(user);
     console.log(pass);
     fetch('https://website.com/wp-json/qaf/v1/authenticate', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user, password: pass})
     }).then((response) => response.json()).then((responseJson) => {
         console.log(responseJson);
         if(responseJson.status == 'success'){
           self.props.store.setPhoneNumber(responseJson.id);
           self.props.store.setName(responseJson.name);
           self.props.store.setUserName(responseJson.email);
           self.props.store.setHastruck(responseJson.hastruck);
           self.props.store.setAvatar(responseJson.avatarUrl);
           self.props.store.setUserCity(responseJson.city);
           self.props.store.setMobile(responseJson.mobile);

           self.setState({
             loading: false,
           });
           setTimeout(function () {
             Actions.home({type: 'reset'});
           }, 100);
         }else{
           self.setState({
             loading: false,
           });
           setTimeout(function () {
             Alert.alert(
               strings.error,
               strings.loginerror,
               [{text: strings.ok }]
             );
           }, 100);
         }
     })
     .catch((error) => {
          console.error(error);
          self.setState({loading: false});
          setTimeout(function () {
            Alert.alert(
              strings.error,
              strings.loginerror,
              [{text: strings.ok }]
            );
          }, 100);
     });
  }

  _registernew(){
    Actions.register();
  }

  _lostPassword(){
      Actions.lostpassword({type: 'push'});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#6d1874' }}>
          <Spinner visible={this.state.loading} color={'#9d2888'} />
          <ImageBackground
            source={require('../images/login.jpg')}
            style={{width:width,height:height, flexDirection:'column', justifyContent:'center', alignItems:'center'}}
          >

            <Image
              source={require('../images/logo.png')}
              style={{width:150,height:150,borderRadius: 0}}
            />


            <View style={{width: width-100,height: 50,marginTop: 75,flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="envelope" size={14} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({username: text})}
                  value={this.state.name}
                  placeholder={strings.username}
                  placeholderTextColor = {"#935aad"}
                  keyboardType = {"email-address"}
                  returnKeyType = {"done"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  underlineColorAndroid='transparent'
                />
            </View>
            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="lock" size={17} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.mobile}
                  placeholder={strings.password}
                  placeholderTextColor = {"#935aad"}
                  secureTextEntry = {true}
                  returnKeyType = {"done"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                <TouchableOpacity onPress={()=> this._skip()} style={styles.skipBtnNow} >
                  <Iconf name="arrow-right" size={17} color="#935aad" style={styles.btnIcons} />
                  <Text style={[styles.skipText,{color:'#935aad'}]} >{strings.skip}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this._login()} style={styles.skipBtn} >
                  <Text style={[styles.skipText]} >{strings.login}</Text>
                  <Iconf name="arrow-left" size={17} color="#FFFFFF" style={[styles.btnIcons, {left: 94}]} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={()=> this._registernew()} style={styles.loginBtn} >
              <Text style={styles.skipText} >{strings.registernew}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this._lostPassword()} style={styles.lostPasswordBtn} >
              <Text style={[styles.skipText,{color:'#935aad'}]} >{strings.lostPassword}</Text>
            </TouchableOpacity>

        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  menubtInput : {
    height: 44,
    width: width-80,
    color:'#935aad',
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: 40,
    borderRadius: 20,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },
  skipText: {
    width:150,
    height:40,
    backgroundColor: 'transparent',
    color:'#fff',
    textAlign:'center',
    writingDirection:'rtl',
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    marginTop:10,
    textAlign:'center'
  },
  skipBtn:{
    width:140,
    height:40,
    backgroundColor:'#935aad',
    borderWidth:1,
    borderColor:'#935aad',
    margin:5,
    marginTop:25,
    borderRadius:20,
  },
  skipBtnNow:{
    width:140,
    height:40,
    backgroundColor:'#FFFFFF',
    borderWidth:1,
    borderColor:'#935aad',
    margin:5,
    marginTop:25,
    borderRadius:20,
  },
  loginBtn:{
    width:140,
    height:40,
    backgroundColor:'#faaa0d',
    borderWidth:1,
    borderColor:'#faaa0d',
    margin:5,
    marginTop:25,
    borderRadius:20,
  },
  lostPasswordBtn:{
    width:140,
    height:40,
    backgroundColor:'transparent',
    borderWidth:0,
    margin:5,
    borderRadius:20,
  },
  closeMenubtn: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    paddingHorizontal:8,
    top: 12,
    left:0
  },
  btnIcons: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    top: 10,
    left:10
  },

});

module.exports = splash;
