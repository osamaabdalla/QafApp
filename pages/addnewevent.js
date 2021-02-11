import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  I18nManager,
  TextInput,
  Alert,
  Platform,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import Iconi from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import DatePicker from 'react-native-datepicker';
var ImagePicker = require('react-native-image-picker');

import resolveAssetSource from 'resolveAssetSource';
import Modal from 'react-native-modal';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    pleasefilltheformbelow:"Please fill the form below",
    send:"Send",
    subject:"Subject",
    themessage:"Your message (required)",
    email:"Email",
    mobile:"Mobile (required)",
    name:"Name (required)",
    selelanguafeg:"Contact us",
    thankyou:"Thank you",
    sents:"Your message sent",
    sorry:"Sorry",
    plasentrname:"Please enter all required data",
  },
  ar: {
    pleasefilltheformbelow:"الرجاء تعبئة النموذج ادناه",
    send:"إرسال",
    subject:"عنوان المادة التعريفية",
    themessage:"نبذة عن المادة المعرفية",
    email:"البريد الالكتروني",
    mobile:"الهاتف المتنقل بالمفتاح الدولي",
    name:"الاسم",
    selelanguafeg:"اتصل بنا",
    thankyou:"شكرا لك",
    sents:"تم ارسال رسالتك",
    sorry:"عفوا",
    plasentrname:"الرجاء كتابة البيانات الاجبارية",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class addnewevent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      avatarUrl: null,
      sex:'المشاركة متاحة ل',
      title:'',
      description:'',
      fromdate:'',
      timefrom:'',
      dateto:'',
      timeto:'',
      places:'',
      adress:'',
      country:'',
      city:'',
      state:'',
      zip:'',
      organizer:'',
      website:'',
      fees:'',
    }
    self = this;
  }

  componentWillMount(){
    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      I18nManager.forceRTL(true);
    }, 500);
  }

  async UploadProfilePicture(){
    var options = {
      title: 'اختيار صورة الحدث',
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
            avatarUrl: response.uri
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
      <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
      <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{margin:10,padding:10, backgroundColor:'#FFFFFF'}} contentContainerStyle={{flexDirection:'column', alignItems:'center',justifyContent:'flex-start'}} >


        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({title: text})}
              value={self.state.title}
              placeholder={'عنوان الحدث'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoFocus = {false}
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 170,marginTop: 5}} >
            <TextInput
              style={[styles.menubtInput,{height:150}]}
              onChangeText={(text) => self.setState({description: text})}
              value={self.state.description}
              placeholder={'وصف الحدث'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoFocus = {false}
              autoCorrect={false}
              numberOfLines={8}
              multiline={true}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
            />
        </View>

        <TouchableOpacity style={{width:width-40,height:220,alignSelf: 'center',alignItems:'center',justifyContent:'center',marginBottom:10}} onPress={()=>this.setState({isLoading: true}), ()=>this.UploadProfilePicture()}>

          <Text style={{paddingTop:10,height: 35,color: '#333',textAlign:'left', width:width-50, fontFamily: 'JFFlat-regular',}}>{'صورة الحدث'}</Text>
          {(() => {
            if (this.state.avatarUrl == null){
              return(
                <Image
                  source={require('../images/defaultaddeventimage.png')}
                  style={{width:width-42,height:200,borderRadius: 8}}
                />
              );
            }else{
              return(
                <Image
                  source={{uri: this.state.avatarUrl}}
                  style={{width:width-42,height:200,borderRadius: 8,borderColor:'#fff', borderWidth:1}}
                />
              );
            }
          })()}
        </TouchableOpacity>

        <View style={{width:width-45,height:80,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{height: 30,color: '#333', paddingTop:10,fontFamily: 'JFFlat-regular'}}>{'تاريخ بداية الحدث'}</Text>
          <DatePicker
            style={{width: width-45,backgroundColor: '#eceff1',borderRadius: 7.5,paddingHorizontal: 5}}
            date={this.state.fromdate}
            mode="date"
            placeholder="من"
            format="DD/MM/YYYY"
            confirmBtnText={'اختيار'}
            cancelBtnText={'الغاء'}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(date) => {this.setState({fromdate: date})}}
          />
        </View>

        <View style={{width:width-45,height:80,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{height: 30,color: '#333', paddingTop:10, fontFamily: 'JFFlat-regular',}}>{'وقت بداية الحدث'}</Text>
          <DatePicker
            style={{width: width-45,backgroundColor: '#eceff1',borderRadius: 7.5,paddingHorizontal: 5,}}
            date={this.state.timefrom}
            mode="time"
            placeholder="08:00"
            format="HH:ss"
            confirmBtnText={'اختيار'}
            cancelBtnText={'الغاء'}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(time) => {this.setState({timefrom: time})}}
          />
        </View>

        <View style={{width:width-45,height:80,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{height: 30,color: '#333', paddingTop:10,alignItems: 'flex-start',fontFamily: 'JFFlat-regular',}}>{'تاريخ نهاية الحدث '}</Text>
          <DatePicker
            style={{width: width-45,height: 40,backgroundColor: '#eceff1',borderRadius: 7.5,paddingHorizontal: 5,}}
            date={this.state.dateto}
            mode="date"
            placeholder="الى"
            format="DD/MM/YYYY"
            confirmBtnText={'اختيار'}
            cancelBtnText={'الغاء'}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(date) => {this.setState({dateto: date})}}
          />
        </View>

        <View style={{width:width-45,height:80,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{height: 30,color: '#333', paddingTop:10,alignItems: 'flex-start',fontFamily: 'JFFlat-regular',}}>{'وقت نهاية الحدث'}</Text>
          <DatePicker
            style={{width: width-45,height: 40,backgroundColor: '#eceff1',borderRadius: 7.5,paddingHorizontal: 5,}}
            date={this.state.timeto}
            mode="time"
            placeholder="20:00"
            format="HH:ss"
            confirmBtnText={'اختيار'}
            cancelBtnText={'الغاء'}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(date) => {this.setState({timeto: date})}}
          />
        </View>


        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({places: text})}
              value={self.state.places}
              placeholder={'إسم المكان'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoFocus = {false}
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
            />

        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({adress: text})}
              value={self.state.adress}
              placeholder={'العنوان'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoFocus = {false}
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({country: text})}
              value={self.state.country}
              placeholder={'الدولة'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({city: text})}
              value={self.state.city}
              placeholder={'المدينة'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoFocus = {false}
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({state: text})}
              value={self.state.state}
              placeholder={'الولاية أو المقاطعة'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({zip: text})}
              value={self.state.zip}
              placeholder={'الرمز البريدي'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({phone: text})}
              value={self.state.phone}
              placeholder={'الهاتف'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({organizer: text})}
              value={self.state.organizer}
              placeholder={'منظم الفعالية'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({website: text})}
              value={self.state.website}
              placeholder={'رابط الموقع الالكتروني'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TextInput
              style={styles.menubtInput}
              onChangeText={(text) => self.setState({fees: text})}
              value={self.state.fees}
              placeholder={'قيمة الاشتراك في الحدث'}
              placeholderTextColor={'#969696'}
              returnKeyType = {"done"}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus = {false}
              underlineColorAndroid='transparent'
            />
        </View>
        <View style={{width: width-40,height: 50,marginTop: 10}} >
            <TouchableOpacity onPress={()=> this.setState({isModalVisible: true})} style={styles.loginBtnType} >
              <Text style={[styles.skipText,{color:'#333',marginTop:12,width: width-20,textAlign:'left'}]} >{this.state.sex}</Text>
            </TouchableOpacity>
        </View>
        <View style={{width: width-40,height: 50,marginTop: 5, marginBottom:50}} >
            <TouchableOpacity
              style={styles.sendbtn}
              onPress={()=>self.sendTheEvent()}
              >
              <Text style={styles.textsbtm} >
                {'إضافة الحدث'}
              </Text>
            </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.isModalVisible} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <View style={{ width: 280, height: 190, borderRadius: 20, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <TouchableOpacity onPress={()=> this.setState({sex: 'الرجال', posttype:'course',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
              <Text style={[styles.skipText,{color:'#ffffff'}]} >الرجال</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({sex: 'النساء', posttype:'tribe_events',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
              <Text style={[styles.skipText,{color:'#ffffff'}]} >النساء</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({sex: 'الرجال والنساء', posttype:'product',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
              <Text style={[styles.skipText,{color:'#ffffff'}]} >الرجال والنساء</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
    );
  }


  sendTheEvent(){
    self.setState({
      isLoading: true
    });

    var valid = true;

    if((self.state.title.length < 2) || (self.state.description.length < 2) || (self.state.fromdate.length < 2) || (self.state.timefrom.length < 2) || (self.state.dateto.length < 2) || (self.state.timeto.length < 2) || (self.state.places.length < 2) || (self.state.adress.length < 2) || (self.state.country.length < 2) || (self.state.city.length < 2) || (self.state.state.length < 2) || (self.state.zip.length < 2) || (self.state.organizer.length < 2) || (self.state.website.length < 2) || (self.state.fees.length < 2)){
        valid = false;
    }

    var cxdata = 'sex='+self.state.sex+'&title='+self.state.title+'&description='+self.state.description+'&fromdate='+self.state.fromdate+'&timefrom='+self.state.timefrom+'&dateto='+self.state.dateto+'&timeto='+self.state.timeto+'&places='+self.state.places+'&adress='+self.state.adress+'&country='+self.state.country+'&city='+self.state.city+'&state='+self.state.state+'&zip='+self.state.zip+'&organizer='+self.state.organizer+'&website='+self.state.website+'&fees='+self.state.fees;

    console.log(cxdata);

    if(valid){
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          self.setState({
            isLoading: false,
            avatarUrl: null,
            sex:'المشاركة متاحة ل',
            title:'',
            description:'',
            fromdate:'',
            timefrom:'',
            dateto:'',
            timeto:'',
            places:'',
            adress:'',
            country:'',
            city:'',
            state:'',
            zip:'',
            organizer:'',
            website:'',
            fees:'',
          });
          setTimeout(() => {
            Alert.alert(
              'شكرا لك ',
              'تم إرسال الحدث للمراجعة',
              [
                {text: 'حسنا'}
              ],
            );
          }, 100);
        }
      });
      xhr.open("POST", 'https://website.com/ajax.php?service=send_addnewevent_form');
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(cxdata);
    }else{
      self.setState({
        isLoading: false
      });
      setTimeout(() => {
        Alert.alert(
          'عفوا',
          'الرجاء تعبئة جميع البيانات بصورة صحيحة ',
          [
            {text: 'حسنا'}
          ],
        );
      }, 100);
    }
  }
}

const styles = StyleSheet.create({
  texts :{
    textAlign:'center',
    color: '#333',
    padding: 12,
    fontFamily: 'JFFlat-regular' ,
    paddingTop:12,
    lineHeight:29,
    fontSize:13
  },

  textsbtm :{
    textAlign:'center',
    color: '#fff',
    padding: 5,
    paddingTop:0,
    fontFamily: 'JFFlat-regular' ,
    lineHeight:20,
    fontSize:15
  },

  menubtInput : {
    height: 40,
    width: width-40,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 15,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },
  loginBtnType : {
    height: 40,
    width: width-40,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },

  menubtInputArea : {
    height: 140,
    width: width-62,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 20,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    backgroundColor: '#FFFFFF',
  },
  headerText:{
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },
  closeMenubtn: {
  },

  sendbtn :{
    width:140,
    height:40,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 18,
    borderWidth: 0,
    marginTop: 10,
    backgroundColor: '#faaa0e',
  },

    ListlatestViewStyle: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      flexWrap: 'wrap',
    },
    avatarName: {
      color:'#333',
      paddingHorizontal:5,
      paddingTop:7,
      height: 30,
      textAlign:'left',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
    },
    latestTouchableOpacityStyleStore: {
      backgroundColor:'#FFFFFF',
      borderColor:'#FFFFFF',
      borderWidth:3,
      overflow: 'hidden',
      borderRadius:1,
      margin: 5,
      width: width / 2 - 15,
      height: width / 2 + 20,
    },
    latestImageTouchableOpacityStyleStore: {
      width: width / 2 - 15,
      height: width / 2 - 20,
      backgroundColor:'transparent',
      overflow: 'hidden',
    },
    loginBtnTypeOtion : {
      height: 44,
      width: 250,
      borderColor: '#6e1874',
      backgroundColor: '#6e1874',
      borderWidth: 1,
      paddingHorizontal: 20,
      marginBottom:5,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    skipText: {
      backgroundColor: 'transparent',
      color:'#fff',
      paddingHorizontal:8,
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      textAlign:'center'
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

});

module.exports = addnewevent;
