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
    country:"country",
  },
  ar: {
    country:"الدولة",
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
    name:"الاسم الأول",
    last_name:"الاسم الاخير",
    city:"المدينة",
    mobile:"رقم الجوال",
    dataerror:"الرجاء إدخال جميع البيانات بصورة صحيحة",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class order extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      firstName: '',
      address_1: '',
      city: '',
      name: '',
      country: '',
      last_name: '',
      mobile: '',
      email: '',
      notes: '',
      loading: true,
    }

    self = this;
    console.log(props);
    console.log(this.props.store);
  }


  orderPayments(){
    if((this.state.address_1.length < 1) || (this.state.country.length < 1)){
      Alert.alert(
        'عفوا',
        ' الرجاء التاكد من كتابة الدولة والعنوان ',
        [
          {text: 'حسنا'},
        ]
      );
    }else{
      Actions.orderPayments({data:self.state});
    }
  }

  getUserdata(){
    var id = this.props.store.id;
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var customer = JSON.parse(this.responseText);
        console.log(customer);
        var city = '';
        for (var i = 0; i < customer.meta_data.length; i++) {
          if(customer.meta_data[i].key == 'city'){
            city = customer.meta_data[i].value;
          }
        }
        var mobile = '';
        for (var i = 0; i < customer.meta_data.length; i++) {
          if(customer.meta_data[i].key == 'mobile'){
            mobile = customer.meta_data[i].value;
          }
        }
        self.setState({
          id: customer.id,
          username: customer.username,
          firstName: customer.first_name,
          last_name: customer.last_name,
          city: city,
          name: customer.id,
          address_1: customer.shipping.address_1,
          mobile: mobile,
          email: customer.email,
          loading: false,
        });
      }
    });

    xhr.open("GET", "https://website.com/wp-json/wc/v2/customers/"+id+"/?consumer_key=ck_2eb9d3d285f2422f83fefd7d8ec6332f3a50d878&consumer_secret=cs_bc87aa4f895ee94f45cbebfe202676962e0cb636");
    xhr.send(data);
  }

  componentWillMount(){
    this.getUserdata();
    setTimeout(function () {
      console.log(self.props.store.languages);
      strings.setLanguage('ar');
      self.setState({});
    }, 500);
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <ScrollView showsVerticalScrollIndicator={false} >
            <Spinner visible={this.state.loading} color={'#9d2888'} />
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#eceff1' }}>
        <View style={{flex: 1, backgroundColor: '#fff',margin: 10 }}>

            <View style={{width: width-20,height: 50,marginTop: 25,flexDirection:'row', justifyContent:'center', alignItems:'flex-start'}} >
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
                />
            </View>

            <View style={{width: width-20,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'flex-start'}} >
                <Icon name="user" size={14} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="country"
                  inputRef={(el) => { this.country = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({country: text})}
                  value={this.state.country}
                  placeholder={strings.country}
                  placeholderTextColor = {"#8b989e"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View style={{width: width-20,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
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
                />
            </View>

            <View style={{width: width-20,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="mobile" size={16} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="mobile"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.address_1 = el; }}
                  style={styles.menubtInput}
                  onChangeText={(text) => this.setState({address_1: text})}
                  value={this.state.address_1}
                  placeholder={'العنوان'}
                  placeholderTextColor = {"#8b989e"}
                  returnKeyType = {"next"}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                />
            </View>

            <View style={{width: width-20,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
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
                />
            </View>

            <View style={{width: width-20,height: 50,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
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
                />
            </View>

            <View style={{width: width-20,height: 150,marginTop: 2,flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <Icon name="mobile" size={16} color="#6d1874" style={styles.closeMenubtn} />
                <TextInput
                  ref="mobile"
                  underlineColorAndroid='transparent'
                  inputRef={(el) => { this.notes = el; }}
                  style={[styles.menubtInput,{height: 150}]}
                  onChangeText={(text) => this.setState({notes: text})}
                  value={this.state.notes}
                  placeholder={'ملاحظات حول الطلب '}
                  placeholderTextColor = {"#8b989e"}
                  returnKeyType = {"done"}
                  numberOfLines = {4}
                  autoFocus = {false}
                  autoCapitalize = {'none'}
                  autoCorrect = {false}
                />
            </View>

            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:50 }}>
                <TouchableOpacity onPress={()=> this.orderPayments()} style={styles.loginBtn} >
                  <Text style={styles.skipText} >{'إستمرار للدفع '}</Text>
                </TouchableOpacity>
            </View>

        </View>
      </KeyboardAwareScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  menubtInput : {
    height: 44,
    width: width-40,
    color:'#6d1874',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 20,
    borderRadius: 6,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },
  skipText: {
    width:140,
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
  loginBtn:{
    width:140,
    height:40,
    backgroundColor:'#faaa0d',
    borderWidth:1,
    borderColor:'#faaa0d',
    marginTop:25,
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

module.exports = order;
