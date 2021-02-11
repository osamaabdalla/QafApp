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
class contribute extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      sections: [
        {title: 'شارك كمدرب', content: 1},
        {title: 'اقتراح مقدم مادة',content: 2},
        {title: 'اقتراح مادة',content: 3},
        {title: 'شارك كمتطوع',content: 4},
        {title: 'سنابات معرفية',content: 5}
      ],
      fivesnabatmsj:'',
      fivesnabatmsjsubject:'',
      fivesnabatmsjemail:'',
      fivesnabatmsjmobile:'',
      fivesnabatmsjname:'',
      fourthemessage:'',
      foursubject:'',
      fouremail:'',
      fourmobile:'',
      fourname:'',
      threecallway:'',
      threecallname:'',
      threecallsubject:'',
      threecallyname:'',
      twomentionname:'',
      twoname:'',
      twonamecall:'',
      twonameabout:'',
      twonameaboutcontact:'',
      twonamesubject:'',
      twonamename:'',
      onethemessage:'',
      onesubject:'',
      oneemail:'',
      onemobile:'',
      onename:'',
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

  _renderHeader(section, index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="borderBottomColor"
        style={{ backgroundColor: '#ececec', paddingLeft: 15, borderBottomColor: (isActive ? '#faaa0f' : '#f8f8f8'), borderBottomWidth: (isActive ? 1 : 3), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
          {(isActive) &&
            <Iconi name="ios-arrow-down" size={22} color="#faaa0f" style={styles.closeMenubtn} />
          }
          {(!isActive) &&
            <Iconi name="ios-arrow-back" size={22} color="#faaa0f" style={styles.closeMenubtn} />
          }
          <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
        <Animatable.View
          duration={300}
          easing="ease-out"
          style={{ backgroundColor: (isActive ? '#f8f8f8' : '#FFFFFF') , padding: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}
          animation={isActive ? 'zoomIn' : false}
          >
          {(section.content == 1) &&
            <View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({onename: text})}
                    value={self.state.onename}
                    placeholder={strings.name}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({onemobile: text})}
                    value={self.state.onemobile}
                    placeholder={strings.mobile}
                    keyboardType = {"numeric"}
                    returnKeyType = {"done"}
                    placeholderTextColor={'#969696'}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({oneemail: text})}
                    value={self.state.oneemail}
                    placeholder={strings.email}
                    keyboardType = {"email-address"}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({onesubject: text})}
                    value={self.state.onesubject}
                    placeholder={strings.subject}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 150,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInputArea}
                    onChangeText={(text) => self.setState({onethemessage: text})}
                    value={self.state.onethemessage}
                    placeholder={strings.themessage}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    multiline = {true}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5, marginBottom:50}} >
                  <TouchableOpacity
                    style={styles.sendbtn}
                    onPress={()=>self.sendContribute(1)}
                    >
                    <Text style={styles.textsbtm} >
                      {'إرسال'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          }

          {(section.content == 2) &&
            <View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twonamename: text})}
                    value={self.state.twonamename}
                    placeholder={'اسم مقدم المادة'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twonamesubject: text})}
                    value={self.state.twonamesubject}
                    placeholder={'عنوان المادة المعرفية'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twonameaboutcontact: text})}
                    value={self.state.twonameaboutcontact}
                    placeholder={'وسيلة تواصل مع مقدم المادة المعرفية'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    autoFocus = {false}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twonameabout: text})}
                    value={self.state.twonameabout}
                    placeholder={'نبذة عن المادة المعرفية '}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twonamecall: text})}
                    value={self.state.twonamecall}
                    placeholder={'وسيلة تواصل اخرى مع مقدم المادة المعرفية '}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twoname: text})}
                    value={self.state.twoname}
                    placeholder={'اسمك الكريم'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({twomentionname: text})}
                    value={self.state.twomentionname}
                    placeholder={'هل نذكر اسمك لمقدم المادة بانك صاحب التوصية ؟'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    autoFocus = {false}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5, marginBottom:50}} >
                  <TouchableOpacity
                    style={styles.sendbtn}
                    onPress={()=>self.sendContribute(2)}
                    >
                    <Text style={styles.textsbtm} >
                      {'إرسال'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          }

          {(section.content == 3) &&
            <View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({threecallyname: text})}
                    value={self.state.threecallyname}
                    placeholder={'اسمك الكريم'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({threecallsubject: text})}
                    value={self.state.threecallsubject}
                    placeholder={'عنوان المادة المعرفية'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({threecallname: text})}
                    value={self.state.threecallname}
                    placeholder={'هل هناك مدرب تقترح اسمه يناسب العنوان المقترح'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({threecallway: text})}
                    value={self.state.threecallway}
                    placeholder={'هل هناك وسيلة تواصل مع المدرب المقترح'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5, marginBottom:50}} >
                  <TouchableOpacity
                    style={styles.sendbtn}
                    onPress={()=>self.sendContribute(3)}
                    >
                    <Text style={styles.textsbtm} >
                      {'إرسال'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          }

          {(section.content == 4) &&
            <View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fourname: text})}
                    value={self.state.fourname}
                    placeholder={'اسمك الكريم'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fourmobile: text})}
                    value={self.state.fourmobile}
                    placeholder={'الهاتف المتنقل بالمفتاح الدولي'}
                    keyboardType = {"numeric"}
                    returnKeyType = {"done"}
                    placeholderTextColor={'#969696'}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fouremail: text})}
                    value={self.state.fouremail}
                    placeholder={'البريد الإلكتروني'}
                    keyboardType = {"email-address"}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({foursubject: text})}
                    value={self.state.foursubject}
                    placeholder={'مجال التطوع'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 150,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInputArea}
                    onChangeText={(text) => self.setState({fourthemessage: text})}
                    value={self.state.fourthemessage}
                    placeholder={'مزيد توضيح عن مجال التطوع ومهاراتك وخبراتك'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5, marginBottom:50}} >
                  <TouchableOpacity
                    style={styles.sendbtn}
                    onPress={()=>self.sendContribute(4)}
                    >
                    <Text style={styles.textsbtm} >
                      {'إرسال'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          }

          {(section.content == 5) &&
            <View>
              <View style={{width: width-50,height: 50,marginTop: 15}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fivesnabatmsjname: text})}
                    value={self.state.fivesnabatmsjname}
                    placeholder={'اسمك الكريم'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fivesnabatmsjmobile: text})}
                    value={self.state.fivesnabatmsjmobile}
                    placeholder={'الهاتف المتنقل بالمفتاح الدولي'}
                    keyboardType = {"numeric"}
                    returnKeyType = {"done"}
                    placeholderTextColor={'#969696'}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fivesnabatmsjemail: text})}
                    value={self.state.fivesnabatmsjemail}
                    placeholder={'البريد الإلكتروني'}
                    keyboardType = {"email-address"}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInput}
                    onChangeText={(text) => self.setState({fivesnabatmsjsubject: text})}
                    value={self.state.fivesnabatmsjsubject}
                    placeholder={'عنوان السنابات'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 150,marginTop: 5}} >
                  <TextInput
                    style={styles.menubtInputArea}
                    onChangeText={(text) => self.setState({fivesnabatmsj: text})}
                    value={self.state.fivesnabatmsj}
                    placeholder={'نبذة مختصرة عن السنابات المعرفية'}
                    placeholderTextColor={'#969696'}
                    returnKeyType = {"done"}
                    autoFocus = {false}
                    multiline = {true}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    underlineColorAndroid='transparent'
                  />
              </View>
              <View style={{width: width-50,height: 50,marginTop: 5, marginBottom:50}} >
                  <TouchableOpacity
                    style={styles.sendbtn}
                    onPress={()=>self.sendContribute(5)}
                    >
                    <Text style={styles.textsbtm} >
                      {'إرسال'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          }
      </Animatable.View>
    );
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
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{margin:10,padding:10, backgroundColor:'#FFFFFF'}} >
        <Accordion
          sections={self.state.sections}
          renderHeader={self._renderHeader}
          renderContent={self._renderContent}
        />
      </KeyboardAwareScrollView>
    </View>
    );
  }


    sendContribute(num){

      self.setState({
        isLoading: true
      });

      var valid = true;

      if(num == 1){
        if((self.state.onename.length < 2) || (self.state.onemobile.length < 2) || (self.state.oneemail.length < 2) || (self.state.onesubject.length < 2) || (self.state.onethemessage.length < 2)){
          valid = false;
        }
      }

      if(num == 2){
        if((self.state.twomentionname.length < 2) || (self.state.twoname.length < 2) || (self.state.twonamecall.length < 2) || (self.state.twonameabout.length < 2) || (self.state.twonameaboutcontact.length < 2) || (self.state.twonamesubject.length < 2) || (self.state.twonamename.length < 2)){
          valid = false;
        }
      }

      if(num == 3){
        if((self.state.threecallway.length < 2) || (self.state.threecallname.length < 2) || (self.state.threecallsubject.length < 2) || (self.state.threecallyname.length < 2)){
          valid = false;
        }
      }

      if(num == 4){
        if((self.state.fourthemessage.length < 2) || (self.state.foursubject.length < 2) || (self.state.fouremail.length < 2) || (self.state.fourmobile.length < 2) || (self.state.fourname.length < 2)){
          valid = false;
        }
      }

      if(num == 5){
        if((self.state.fivesnabatmsj.length < 2) || (self.state.fivesnabatmsjsubject.length < 2) || (self.state.fivesnabatmsjemail.length < 2) || (self.state.fivesnabatmsjmobile.length < 2) || (self.state.fivesnabatmsjname.length < 2)){
          valid = false;
        }
      }

      var cxdata = 'num='+num+'&fivesnabatmsj='+self.state.fivesnabatmsj+'&fivesnabatmsjsubject='+self.state.fivesnabatmsjsubject+'&fivesnabatmsjemail='+self.state.fivesnabatmsjemail+'&fivesnabatmsjmobile='+self.state.fivesnabatmsjmobile+'&fivesnabatmsjname='+self.state.fivesnabatmsjname+'&fourthemessage='+self.state.fourthemessage+'&foursubject='+self.state.foursubject+'&fouremail='+self.state.fouremail+'&fourmobile='+self.state.fourmobile+'&fourname='+self.state.fourname+'&threecallway='+self.state.threecallway+'&threecallname='+self.state.threecallname+'&threecallsubject='+self.state.threecallsubject+'&threecallyname='+self.state.threecallyname+'&twomentionname='+self.state.twomentionname+'&twoname='+self.state.twoname+'&twonamecall='+self.state.twonamecall+'&twonameabout='+self.state.twonameabout+'&twonameaboutcontact='+self.state.twonameaboutcontact+'&twonamesubject='+self.state.twonamesubject+'&twonamename='+self.state.twonamename+'&onethemessage='+self.state.onethemessage+'&onesubject='+self.state.onesubject+'&oneemail='+self.state.oneemail+'&onemobile='+self.state.onemobile+'&onename='+self.state.onename;

      console.log(cxdata);

      if(valid){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            self.setState({
                isLoading: false,
                fivesnabatmsj:'',
                fivesnabatmsjsubject:'',
                fivesnabatmsjemail:'',
                fivesnabatmsjmobile:'',
                fivesnabatmsjname:'',
                fourthemessage:'',
                foursubject:'',
                fouremail:'',
                fourmobile:'',
                fourname:'',
                threecallway:'',
                threecallname:'',
                threecallsubject:'',
                threecallyname:'',
                twomentionname:'',
                twoname:'',
                twonamecall:'',
                twonameabout:'',
                twonameaboutcontact:'',
                twonamesubject:'',
                twonamename:'',
                onethemessage:'',
                onesubject:'',
                oneemail:'',
                onemobile:'',
                onename:'',
            });
            setTimeout(() => {
              Alert.alert(
                'شكرا لك ',
                'تم إرسال الرسالة بنجاح ',
                [
                  {text: 'حسنا', onPress: () => console.log("done")}
                ],
              );
            }, 100);
          }
        });
        xhr.open("POST", 'https://website.com/ajax.php?service=send_contribute_form');
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
            {text: 'حسنا', onPress: () => console.log("done")}
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
    width: width-62,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 15,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
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
    marginTop: 15,
    backgroundColor: '#faaa0e',
  }

});

module.exports = contribute;
