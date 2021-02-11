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
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconf from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';
var ImagePicker = require('react-native-image-picker');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var RNUploader = NativeModules.RNUploader;
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
    loginerror:"Error when registeration",
    lostPassword:"Lost Password ?",
    error:"Error",
    ok:"OK",
    username:"Email",
    password:"Password",
    passwordconfirm:"Password confirm",
    register:"Register",
    name:"Name",
    newreigstersuccess:"Registration complete",
    newreigster:"New reigster",
    city:"City",
    mobile:"Mobile",
    dataerror:"Please enter all data correctly",
    selectprofileimg:"Select profile image",
  },
  ar: {
    selectprofileimg:'إختيار صورة البروفايل ',
    newreigster:"تسجيل جديد",
    newreigstersuccess:"تم التسجيل بنجاح",
    username:"البريد الإلكتروني",
    password:"كلمة المرور",
    passwordconfirm:"تأكيد كلمة المرور",
    ok:"حسنا",
    error:"خطأ",
    sendthecomment:"إرسال التعليق",
    loginerror:"خطأ في عملية التسجيل",
    languagespagse:"اللغات",
    skip:"تخطي",
    login:"دخول",
    registernew:"تسجيل جديد",
    lostPassword:"نسيت كلمة المرور ؟",
    register:"تسجيل",
    name:"الاسم",
    city:"المدينة",
    mobile:"رقم الجوال",
    dataerror:"الرجاء إدخال جميع البيانات بصورة صحيحة",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class register extends Component {
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
      country: '',
      sex: 'إختر الجنس',
      nameascertificate: '',
      avatarUrl: null,
      passwordconfirm: '',
      loading: false,
      isModalVisible: false
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
    Actions.login({type: 'reset'});
  }

  confirmVerftype(type){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        Actions.login({type: 'reset'});
      }
    });
    xhr.open("GET", "https://website.com/wp-json/qaf/v1/verifyactivationtype/"+type);
    xhr.send(data);
  }

  confirmVerfyway(){
    Alert.alert(
      'التفعيل',
      'كيف يتم تفعيل الحساب ؟',
      [
        {text: 'بريد إلكتروني', onPress: () => this.confirmVerftype('email')},
        {text: 'رسالة جوال ', onPress: () => this.confirmVerftype('sms')}
      ],
      { cancelable: false }
    );
  }

  _register(){
   this.setState({
     loading: true,
   });

   var firstName = this.state.firstName;
   var city = this.state.city;
   var mobile = this.state.mobile;
   var email = this.state.email;
   var password = this.state.password;
   var passwordconfirm = this.state.passwordconfirm;
   var file = this.state.avatarUrl;
   var fileName = this.state.fileName;
   var country = this.state.country;
   var nameascertificate = this.state.nameascertificate;
   var sex = this.state.sex;

   if((firstName !== '') && (country !== '') && (sex !== '') && (city !== '') && (mobile !== '') && (email !== '') && (password !== '') && (password == passwordconfirm)){

      var uls = 'https://website.com/wp-json/qaf/v1/register/normaluser';
      if(file !== null){

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
            truckowner: false,
            country: country,
            nameascertificate: nameascertificate,
            sex: sex,
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
            loading: false,
          });

          if(json.status == 'success'){
            setTimeout(function () {
              Alert.alert(
                strings.newreigster,
                strings.newreigstersuccess,
                [
                  {text: strings.ok, onPress: () => this.confirmVerfyway({type: 'reset'})}
                ],
                { cancelable: false }
              );
            }, 100);
          }else{
            setTimeout(function () {
              Alert.alert(
                strings.error,
                strings.loginerror+'\n \n'+json.message,
                [{text: strings.ok }]
              );
            }, 100);
          }
        });

    }else{

       fetch('https://website.com/wp-json/qaf/v1/register/normaluser', {
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
            password: password,
            truckowner: false,
            country: country,
            nameascertificate: nameascertificate,
            sex: sex,
          })
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
                   strings.newreigster,
                   strings.newreigstersuccess,
                   [
                     {text: strings.ok, onPress: () => Actions.login({type: 'reset'})}
                   ],
                   { cancelable: false }
                 );
               }, 100);
             }else{
               this.setState({
                 loading: false,
               });
               setTimeout(function () {
                 Alert.alert(
                   strings.error,
                   strings.loginerror+'\n \n'+responseJson.message,
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
   }else{
     this.setState({loading: false});
     setTimeout(function () {
       Alert.alert(
         strings.error,
         strings.dataerror,
         [{text: strings.ok }]
       );
     }, 100);
   }
  }

  UploadProfilePicture(){
    var options = {
      maxWidth: 250,
      maxHeight: 250,
      quality: 1,
      title: strings.selectprofileimg,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        self.setState({
            tempAvatarUrl : response,
            avatarUrl: response.uri,
            fileName: response.fileName,
        });
      }
    });
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
    <View style={{flex: 1, backgroundColor: 'transparent' }}>
      <ImageBackground
        source={require('../images/login.jpg')}
        style={{width:width,height:height, flexDirection:'column', justifyContent:'center', alignItems:'center'}}
      >
      <KeyboardAwareScrollView style={{backgroundColor: 'transparent'}} contentContainerStyle={{width:width, flexDirection:'column', justifyContent:'center', alignItems:'center'}} bounces={false} showsVerticalScrollIndicator={false} >

            <View style={{width:width,height:100,}} ></View>
            <TouchableOpacity style={{width:width,alignSelf: 'center',alignItems:'center',justifyContent:'center',marginBottom:10}} onPress={()=>this.setState({loading: true}), ()=>this.UploadProfilePicture()}>
              {(() => {
                if (this.state.avatarUrl == null){
                  return(
                    <Image
                      source={require('../images/userlogo.png')}
                      style={{width:100,height:100,borderRadius: 50}}
                    />
                  );
                }else{
                  return(
                    <Image
                      source={{uri: this.state.avatarUrl}}
                      style={{width:100,height:100,borderRadius: 50}}
                    />
                  );
                }
              })()}
            </TouchableOpacity>

            <View style={{width: width-100,height: 50,marginTop: 25,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="user" size={17} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="firstName"
                  inputRef={(el) => { this.firstName = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({firstName: text})}
                  value={this.state.firstName}
                  placeholder={strings.name}
                  placeholderTextColor = {"#935aad"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={(event) => this.refs.email.focus()}
                />
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="envelope" size={12} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="email"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.email = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  placeholder={strings.username}
                  placeholderTextColor = {"#935aad"}
                  keyboardType = {"email-address"}
                  returnKeyType = {"next"}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.city.focus()}
                />
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="globe" size={14} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="country"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.country = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({country: text})}
                  value={this.state.country}
                  placeholder={'الدولة'}
                  placeholderTextColor = {"#935aad"}
                  returnKeyType = {"next"}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.mobile.focus()}
                />
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="home" size={14} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="city"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.city = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({city: text})}
                  value={this.state.city}
                  placeholder={strings.city}
                  placeholderTextColor = {"#935aad"}
                  returnKeyType = {"next"}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.mobile.focus()}
                />
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <TouchableOpacity onPress={()=> this.setState({isModalVisible: true})} style={styles.sexmenubtInput} >
                    <Icon name="venus-mars" size={14} color="#935aad" style={[styles.closeMenubtn,{left:0}]} />
                    <Text style={[styles.menubtInputtext,{marginTop:12}]} >{this.state.sex}</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="certificate" size={14} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="nameascertificate"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.nameascertificate = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({nameascertificate: text})}
                  value={this.state.nameascertificate}
                  placeholder={'الاسم كما تريده بالشهادة'}
                  placeholderTextColor = {"#935aad"}
                  returnKeyType = {"next"}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.mobile.focus()}
                />
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="mobile" size={16} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="mobile"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.mobile = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({mobile: text})}
                  value={this.state.mobile}
                  placeholder={strings.mobile}
                  placeholderTextColor = {"#935aad"}
                  keyboardType = {"phone-pad"}
                  returnKeyType = {"next"}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.password.focus()}
                />
            </View>

            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="lock" size={17} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  ref="password"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.password = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                  placeholder={strings.password}
                  placeholderTextColor = {"#935aad"}
                  secureTextEntry = {true}
                  returnKeyType = {"next"}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  onSubmitEditing={(event) => this.refs.passwordconfirm.focus()}
                />
            </View>
            <View style={{width: width-100,height: 50,marginTop: 5,flexDirection:'row', justifyContent:'center', alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:'#935aad'}} >
                <Icon name="lock" size={17} color="#935aad" style={styles.closeMenubtn} />
                <TextInput
                  underlineColorAndroid='transparent'
                  ref="passwordconfirm"
                  inputRef={(el) => { this.passwordconfirm = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({passwordconfirm: text})}
                  value={this.state.passwordconfirm}
                  placeholder={strings.passwordconfirm}
                  placeholderTextColor = {"#935aad"}
                  secureTextEntry = {true}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  returnKeyType = {"done"}
                />
            </View>

            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                <TouchableOpacity onPress={()=> this._skip()} style={styles.skipBtn} >
                  <Iconf name="arrow-right" size={17} color="#935aad" style={styles.btnIcons} />
                  <Text style={[styles.skipText, {color:'#935aad'}]} >{strings.skip}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this._register()} style={styles.loginBtn} >
                  <Text style={styles.skipText} >{strings.register}</Text>
                  <Iconf name="arrow-left" size={17} color="#FFFFFF" style={[styles.btnIcons, {left: 94}]} />
                </TouchableOpacity>
            </View>


            <Modal isVisible={this.state.isModalVisible} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <View style={{ width: 300, height: 140, borderRadius: 20, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <TouchableOpacity onPress={()=> this.setState({sex: 'ذكر',isModalVisible: false})} style={[styles.loginBtnTypeOtion,{marginBottom:20}]} >
                  <Text style={[styles.skipText,{color:'#ffffff', marginTop:20}]} > ذكر </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setState({sex: 'أنثى', isModalVisible: false})} style={styles.loginBtnTypeOtion} >
                  <Text style={[styles.skipText,{color:'#ffffff', marginTop:20}]} > أنثى </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <View style={{width:width,height:100,}} ></View>
      </KeyboardAwareScrollView>
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
      textAlign: 'right',
      paddingHorizontal: 40,
      borderRadius: 20,
      fontSize:14,
      fontFamily: 'JFFlat-regular',
    },
    menubtInputtext : {
      color:'#935aad',
      textAlign: 'left',
      paddingHorizontal: 0,
      width: width-80,
      fontSize:14,
      fontFamily: 'JFFlat-regular',
    },
    sexmenubtInput : {
      height: 44,
      width: width-100,
      borderColor: 'rgba(255, 255, 255, 0.14)',
      borderWidth: 1,
      paddingHorizontal: 30,
      borderRadius: 20,
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
    loginBtnType : {
      height: 44,
      width: width-80,
      borderColor: '#6e1874',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    skipBtn:{
      width:140,
      height:40,
      backgroundColor:'#FFFFFF',
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
    loginBtnTypeOtion : {
      height: 44,
      width: 250,
      borderColor: '#6e1874',
      backgroundColor: '#6e1874',
      borderWidth: 1,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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

module.exports = register;
