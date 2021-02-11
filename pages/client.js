import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  I18nManager,
  TextInput,
  Platform,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var self;

@inject(['store']) @observer
class client extends Component {
  constructor(props){
    super(props);
    this.state = {
      aboutus: '',
      vision: '',
      goals: '',
      alsubaiee: '',
      message: '',
      values: '',
      targets: '',
      isLoading: true
    }
    self = this;
  }

  componentWillMount(){
    I18nManager.forceRTL(true);
  }

  render() {
      return (
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}}>

            <View style={{padding:10,width:width-20, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >

              <Text style={[styles.text]}>{'يتم تشغيل المتجر الإلكتروني بواسطة متجر أويرد'}</Text>
              <Image style={{width:width/2,height:150}} resizeMode={'contain'} source={{uri:'https://website.com/wp-content/uploads/2017/06/logo.png'}} />

              <Text style={[styles.text]}>{'منتجات المتجر الإلكتروني تم توفيرها بواسطة الموردين والمزودين'}</Text>
              <Image style={{width:width/2,height:80}} resizeMode={'contain'} source={{uri:'https://website.com/wp-content/uploads/2017/06/z9PH7C2O.png'}} />
              <Image style={{width:width/2,height:80}} resizeMode={'contain'} source={{uri:'https://website.com/wp-content/uploads/2017/06/logo-4.png'}} />
              <Image style={{width:width/2,height:80}} resizeMode={'contain'} source={{uri:'https://website.com/wp-content/uploads/2017/06/logo1.png'}} />
              <Image style={{width:width/2,height:80}} resizeMode={'contain'} source={{uri:'https://website.com/wp-content/uploads/2017/06/jarirbookstorepng.png'}} />

              <Text style={[styles.text]}>{'كيف تصبح مورد ومزود للمنتجات بمتجر الأكاديمية؟'}</Text>
              <Text style={[styles.text]}>{'من خلال ارسال التفاصيل التالية (المنتجات، الأسعار، الصور، الموقع الإلكتروني أو المتجر عبر الانستقرام)'}</Text>
              <Text style={[styles.text]}>{'للبريد الإلكتروني store@website.com  أو من خلال صفحة التواصل معنا'}</Text>

            </View>

            <View style={{width:width-20, margin: 25}}></View>
        </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    text: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
    },
    textTitle: {
      fontSize:14,
      paddingBottom: 5,
      color:'#000',
    },
});

module.exports = client;
