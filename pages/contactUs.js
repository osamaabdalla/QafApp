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
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import I18n from 'react-native-i18n';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

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
    subject:"الموضوع",
    themessage:"رسالتك (اجباري)",
    email:"البريد الالكتروني",
    mobile:"الجوال (اجباري)",
    name:"الاسم (اجباري)",
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
class contactUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      mobile: '',
      email: '',
      subject: '',
      themessage: '',
    }
    self = this;
  }

  componentWillMount(){
      setTimeout(function () {
        console.log(self.props.store.languages);
        strings.setLanguage('ar');
        self.setState({});
        Actions.refresh({title: strings.selelanguafeg, type: 'push'});
        if(self.props.store.languages == 'ar'){
          console.log('ar forced');
          I18nManager.forceRTL(true);
        }else{
          console.log('en forced');
          I18nManager.forceRTL(false);
        }
      }, 500);
  }

  render() {
    return (
    <KeyboardAwareScrollView style={{paddingBottom:80}} >
    <View style={{flex: 1,  backgroundColor: '#FFFFFF', marginTop: 64,padding: 25, paddingTop: 2, marginBottom:0, paddingBottom:0 }}>
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#FFFFFF',paddingTop: 29}}
      >
        <TouchableOpacity style={{width:110,height:80,alignSelf: 'center',alignItems:'center',justifyContent:'center'}} >
            <Image
              source={require('../images/logo.png')}
              style={{width:100,height:100,borderRadius: 0}}
            />
        </TouchableOpacity>

        <View style={{width: width-50,marginTop: 5}}>
          <Text
            style={styles.texts}
            numberOfLines={1}
          >
          {strings.pleasefilltheformbelow}
          </Text>
          <View style={{width: width-50,height: 50,marginTop: 15}} >
              <Icon name="user" size={14} color="#5d5d5d" style={styles.closeMenubtn} />
              <TextInput
                style={styles.menubtInput}
                onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}
                placeholder={strings.name}
                returnKeyType = {"done"}
                autoFocus = {false}
                underlineColorAndroid='transparent'
              />
          </View>
          <View style={{width: width-50,height: 50,marginTop: 5}} >
              <Icon name="mobile" size={17} color="#5d5d5d" style={styles.closeMenubtn} />
              <TextInput
                style={styles.menubtInput}
                onChangeText={(text) => this.setState({mobile: text})}
                value={this.state.mobile}
                placeholder={strings.mobile}
                keyboardType = {"numeric"}
                returnKeyType = {"done"}
                autoFocus = {false}
                underlineColorAndroid='transparent'
              />
          </View>
          <View style={{width: width-50,height: 50,marginTop: 5}} >
              <Icon name="envelope" size={10} color="#5d5d5d" style={styles.closeMenubtn} />
              <TextInput
                style={styles.menubtInput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                placeholder={strings.email}
                keyboardType = {"email-address"}
                returnKeyType = {"done"}
                autoFocus = {false}
                underlineColorAndroid='transparent'
              />
          </View>
          <View style={{width: width-50,height: 50,marginTop: 5}} >
              <Icon name="comment" size={12} color="#5d5d5d" style={styles.closeMenubtn} />
              <TextInput
                style={styles.menubtInput}
                onChangeText={(text) => this.setState({subject: text})}
                value={this.state.subject}
                placeholder={strings.subject}
                returnKeyType = {"done"}
                autoFocus = {false}
                underlineColorAndroid='transparent'
              />
          </View>
          <View style={{width: width-50,height: 150,marginTop: 5}} >
              <Icon name="comments-o" size={14} color="#5d5d5d" style={styles.closeMenubtn} />
              <TextInput
                style={styles.menubtInputArea}
                onChangeText={(text) => this.setState({themessage: text})}
                value={this.state.themessage}
                placeholder={strings.themessage}
                returnKeyType = {"done"}
                autoFocus = {false}
                multiline = {true}
                underlineColorAndroid='transparent'
              />
          </View>
          <View style={{width: width-50,height: 50,marginTop: 5, marginBottom:50}} >
              <TouchableOpacity
                style={styles.sendbtn}
                onPress={()=>this.sendcotact()}
                >
                <Text style={styles.textsbtm} >
                  {strings.send}
                </Text>
              </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      </View>
      </KeyboardAwareScrollView>
    );
  }


  sendcotact(){
        if ((this.state.name.length > 0) && (this.state.mobile.length > 0) && (this.state.themessage.length > 0)){

            var cdata = "name="+this.state.name+"&mobile="+this.state.mobile+"&email="+this.state.email+"&subject="+this.state.subject+"&themessage="+this.state.themessage;
            console.log(cdata);

            var cxdata = null;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4) {
                  self.setState({
                    name: '',
                    mobile: '',
                    email: '',
                    subject: '',
                    themessage: '',
                    isLoading: false
                  });
                  setTimeout(() => {
                    Alert.alert(
                        strings.thankyou,
                        strings.sents,
                    );
                  }, 100);
              }
            });
            xhr.open("POST", 'https://website.com/ajax.php?service=add_contact_forms&'+cdata);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(cxdata);

        }else{
          this.setState({
            isLoading: false
          });
          setTimeout(() => {
            Alert.alert(
              strings.sorry,
              strings.plasentrname,
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
    fontSize:13
  },

  menubtInput : {
    height: 40,
    width: width-62,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 30,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },

  menubtInputArea : {
    height: 140,
    width: width-62,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 30,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },

  closeMenubtn: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    paddingHorizontal:8,
    top: 12,
  },

  sendbtn :{
    width:110,
    height:40,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 18,
    borderWidth: 0,
    backgroundColor: '#09097c',
  }

});

module.exports = contactUs;
