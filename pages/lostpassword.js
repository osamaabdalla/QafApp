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
  ImageBackground,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import Spinner from 'react-native-loading-spinner-overlay';
import {inject, observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    passwordconfirm:"Password confirm",
    register:"Register",
    name:"Name",
    sendpassword:"Send password",
    passwordsent:"Password sent to your email",
    success:"Success",
  },
  ar: {
    username:"ادخل بريدك الإلكتروني",
    sendpassword:"إرسال كلمة المرور",
    password:"كلمة المرور",
    passwordconfirm:"تأكيد كلمة المرور",
    ok:"حسنا",
    error:"خطأ",
    sendthecomment:"إرسال التعليق",
    loginerror:"بيانات الدخول خاطئة",
    languagespagse:"اللغات",
    skip:"تخطي",
    login:"دخول",
    registernew:"تسجيل جديد",
    lostPassword:"نسيت كلمة المرور ؟",
    register:"تسجيل",
    name:"الاسم",
    passwordsent:"تم إرسال كلمة المرور إلى بريدك الإلكتروني",
    success:"نجاح",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class lostpassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
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
        Actions.refresh({title: strings.languagespagse, type: 'push'});
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
    Actions.login({type: 'push'});
  }

  _sendpassword(){
   this.setState({
     loading: true,
   });
   var user = this.state.username;
   console.log(user);
   fetch('https://website.com/wp-json/qaf/v1/resetpassword', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: user})
   })
   .then((response) => response.json())
     .then((responseJson) => {
         console.log(responseJson);
         if(responseJson.status == 'success'){
           this.setState({
             loading: false,
           });
           setTimeout(function () {
             Alert.alert(
               strings.success,
               strings.passwordsent,
               [
                 {text: strings.ok, onPress: () => Actions.login({type: 'push'})}
               ],
             );
           }, 100);
         }else{
           this.setState({
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
          this.setState({loading: false});
          setTimeout(function () {
            Alert.alert(
              strings.error,
              strings.loginerror,
              [{text: strings.ok }]
            );
          }, 100);
     });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent' }}>
          <Spinner visible={this.state.loading} color={'#9d2888'} />
          <ImageBackground
            source={require('../images/login.jpg')}
            style={{width:width,height:height, flexDirection:'column', justifyContent:'center', alignItems:'center'}}
          >

            <Image
              source={require('../images/logo.png')}
              style={{width:100,height:100,borderRadius: 0}}
            />

            <View style={{width: width-100,height: 50,marginTop: 25,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="envelope" size={14} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({username: text})}
                  value={this.state.username}
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

            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                <TouchableOpacity onPress={()=> this._skip()} style={styles.skipBtn} >
                  <Text style={styles.skipText} >{strings.login}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this._sendpassword()} style={[styles.loginBtn,{'width':170}]} >
                  <Text style={[styles.skipText,{'width':170}]} >{strings.sendpassword}</Text>
                </TouchableOpacity>
            </View>

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
      paddingHorizontal:8,
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


});

module.exports = lostpassword;
