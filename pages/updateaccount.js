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
  NativeModules,
  ImageBackground,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import Spinner from 'react-native-loading-spinner-overlay';
import {inject, observer} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNRestart from 'react-native-restart';
var ImagePicker = require('react-native-image-picker');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var RNUploader = NativeModules.RNUploader;
//import I18n from 'react-native-i18n';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    sendthecomment:"Send comment",
    languagespagse:"Languages",
    skip:"Skip",
    login:"Login",
    registernew:"Update",
    loginerror:"Error when update account",
    lostPassword:"Lost Password ?",
    error:"Error",
    ok:"OK",
    username:"Email",
    password:"New Password",
    passwordconfirm:"Password confirm",
    register:"Update",
    name:"Name",
    newreigstersuccess:"Update complete",
    newreigster:"Account update",
    city:"City",
    mobile:"Mobile",
    dataerror:"Please enter all data correctly",
    selectprofileimg:"Select profile image",
    updateaccount:"Edit account",
  },
  ar: {
    updateaccount:"تعديل بياناتي",
    selectprofileimg:'إختيار صورة البروفايل ',
    newreigster:"تعديل بياناتي",
    newreigstersuccess:"تم تعديل بيانات الحساب بنجاح",
    username:"البريد الإلكتروني",
    password:"كلمة المرور الجديدة",
    passwordconfirm:"تأكيد كلمة المرور",
    ok:"حسنا",
    error:"خطأ",
    sendthecomment:"إرسال التعليق",
    loginerror:"خطأ في عملية التحديث",
    languagespagse:"اللغات",
    skip:"تخطي",
    login:"دخول",
    registernew:"تحديث",
    lostPassword:"نسيت كلمة المرور ؟",
    register:"تحديث",
    name:"الاسم",
    city:"المدينة",
    mobile:"رقم الجوال",
    dataerror:"الرجاء إدخال جميع البيانات بصورة صحيحة",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class updateaccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      pagecontent: '',
      username: '',
      firstName: '',
      password: '',
      city: '',
      name: '',
      mobile: '',
      email: '',
      file: '',
      filename: '',
      fileName: '',
      avatarUrl: null,
      passwordconfirm: '',
      isLoading: false,
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
        Actions.refresh({title: 'حسابي'});
        self.setState({
          username: self.props.store.getUserName(),
          firstName: self.props.store.getName(),
          city: self.props.store.getUserCity(),
          name: self.props.store.getName(),
          mobile: self.props.store.getMobile(),
          email: self.props.store.getUserName(),
          avatarUrl: self.props.store.getAvatar(),
          avatarOldUrl: self.props.store.getAvatar(),
        });
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
  }

  _register(){
   this.setState({
     isLoading: true,
   });

   var firstName = this.state.firstName;
   var city = this.state.city;
   var mobile = this.state.mobile;
   var email = this.state.email;
   var password = this.state.password;
   var passwordconfirm = this.state.passwordconfirm;
   var oldfile = this.state.avatarOldUrl;
   var file = this.props.avatar;
   var fileName = this.props.fileName;
   var ids = this.props.store.getUserNumber();

   if((firstName !== '') && (city !== '') && (mobile !== '') && (email !== '') && (password == passwordconfirm)){

      var uls = 'https://website.com/wp-json/qaf/v1/register/normaluserupdate';
      var img = 'https://website.com/wp-content/uploads/2017/09/userlogotransparent.png';
      if((file !== oldfile) && (file !== img)){

        let files = [{
            name: 'file',
            filename: fileName,
            filepath: file,
            filetype: 'image/jpg'
        }];
        console.log(files);

        let opts = {
          url: uls,
          files: files,
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          params: {
            firstName: firstName,
            city: city,
            mobile: mobile,
            email: email,
            password: password,
            userid: ids,
            truckowner: false,
          },
        };
        console.log(opts);

        RNUploader.upload( opts, (err, response) => {
          if( err ){
            console.log(err);
            setTimeout(function () {
              Alert.alert(
                strings.error,
                strings.loginerror,
                [{text: strings.ok }]
              );
            }, 100);
            return;
          }
          console.log(response);

          let status = response.status;
          let responseString = response.data;
          let json = JSON.parse( responseString );
          console.log(json);
          this.setState({
            isLoading: false,
          });

          if(json.status == 'success'){
            setTimeout(function () {
              Alert.alert(
                strings.newreigster,
                strings.newreigstersuccess,
                [
                  {text: strings.ok}
                ],
                { cancelable: false }
              );
            }, 100);
          }else{
            setTimeout(function () {
              Alert.alert(
                strings.error,
                strings.loginerror,
                [{text: strings.ok }]
              );
            }, 100);
          }
        });

    }else{

       fetch('https://website.com/wp-json/qaf/v1/register/normaluserupdate', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: firstName,
            city: city,
            mobile: mobile,
            email: email,
            userid: ids,
            password: password,
            truckowner: false,
          })
       })
       .then((response) => response.json())
         .then((responseJson) => {
             console.log(responseJson);
             if(responseJson.status == 'success'){
               this.setState({
                 isLoading: false,
               });
               setTimeout(function () {
                 Alert.alert(
                   strings.newreigster,
                   strings.newreigstersuccess,
                   [
                     {text: strings.ok}
                   ],
                   { cancelable: false }
                 );
               }, 100);
             }else{
               this.setState({
                 isLoading: false,
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
              this.setState({isLoading: false});
              setTimeout(function () {
                Alert.alert(
                  strings.error,
                  strings.loginerror,
                  [{text: strings.ok }]
                );
              }, 100);
         });
       }
   }else{
     this.setState({isLoading: false});
     setTimeout(function () {
       Alert.alert(
         strings.error,
         strings.dataerror,
         [{text: strings.ok }]
       );
     }, 100);
   }
  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <ScrollView showsVerticalScrollIndicator={false} >
            <Spinner visible={this.state.isLoading} color={'#9d2888'} />
          </ScrollView>
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView style={{backgroundColor: '#eceff1' }} scrollEnabled={false} showsVerticalScrollIndicator={false} >
      <View style={{flex: 1, backgroundColor: '#eceff1',paddingTop:0 }}>

            <View style={{width: width,height: 50,marginTop: 25,flexDirection:'row', justifyContent:'center', alignItems:'flex-start'}} >
                <Icon name="user" size={14} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="firstName"
                  inputRef={(el) => { this.firstName = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({firstName: text})}
                  value={this.state.firstName}
                  placeholder={strings.name}
                  placeholderTextColor = {"#8b989e"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={(event) => this.refs.email.focus()}
                />
            </View>

            <View style={{width: width,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="envelope" size={14} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="email"
                  inputRef={(el) => { this.email = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  placeholder={strings.username}
                  placeholderTextColor = {"#8b989e"}
                  keyboardType = {"email-address"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={(event) => this.refs.city.focus()}
                />
            </View>

            <View style={{width: width,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="home" size={14} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="city"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.city = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({city: text})}
                  value={this.state.city}
                  placeholder={strings.city}
                  placeholderTextColor = {"#8b989e"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.mobile.focus()}
                />
            </View>

            <View style={{width: width,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="mobile" size={16} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="mobile"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.mobile = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({mobile: text})}
                  value={this.state.mobile}
                  placeholder={strings.mobile}
                  placeholderTextColor = {"#8b989e"}
                  keyboardType = {"phone-pad"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.password.focus()}
                />
            </View>

            <View style={{width: width,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="lock" size={17} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="password"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.password = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                  placeholder={strings.password}
                  placeholderTextColor = {"#8b989e"}
                  secureTextEntry = {true}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.passwordconfirm.focus()}
                />
            </View>
            <View style={{width: width,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="lock" size={17} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="passwordconfirm"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.passwordconfirm = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({passwordconfirm: text})}
                  value={this.state.passwordconfirm}
                  placeholder={strings.passwordconfirm}
                  placeholderTextColor = {"#8b989e"}
                  secureTextEntry = {true}
                  returnKeyType = {"done"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                />
            </View>

            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:50 }}>
                <TouchableOpacity onPress={()=> this._register()} style={styles.loginBtn} >
                  <Text style={styles.skipText} >{strings.register}</Text>
                </TouchableOpacity>
            </View>

      </View>
    </KeyboardAwareScrollView>
    );
  }

}

const styles = StyleSheet.create({

  loginButtonText: {
    width: width/2,
    height: 35,
    marginLeft: width/5,
    backgroundColor: '#5d5d5d',
    color:'#fff',
    paddingTop:4,
    textAlign:'center',
    paddingHorizontal:8,
    writingDirection:'rtl',
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    marginTop:20,
  },
  menubtInput : {
    height: 44,
    width: width-40,
    color:'#6d1874',
    borderColor: '#a6b0b4',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 20,
    borderRadius: 6,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },
  welcomeText: {
    width: width-50,
    backgroundColor: 'transparent',
    color:'#fff',
    paddingTop:7,
    textAlign:'center',
    paddingHorizontal:8,
    writingDirection:'rtl',
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    marginTop:20,
    textAlign:'center'
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
    marginTop:8,
    textAlign:'center'
  },
  skipBtn:{
    width:140,
    height:40,
    backgroundColor:'transparent',
    borderWidth:1,
    borderColor:'#fff',
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
    height:45,
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
    left:50
  },

});

module.exports = updateaccount;
