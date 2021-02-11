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

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();


var self;

@inject(['store']) @observer
class AboutPage extends Component {
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
    self.getAboutPage();
    I18nManager.forceRTL(true);
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
    }else{
      return (
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:15}}>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/aboutus.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'من نحن'}</Text>
              <Text style={[styles.text]}>{this.state.aboutus}</Text>
            </View>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/vision.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'الرؤية'}</Text>
              <Text style={[styles.text]}>{this.state.vision}</Text>
            </View>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/message.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'الرسالة'}</Text>
              <Text style={[styles.text]}>{this.state.message}</Text>
            </View>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/goals.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'الأهداف'}</Text>
              <Text style={[styles.text]}>{this.state.goals}</Text>
            </View>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/values.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'القيم العملية'}</Text>
              <Text style={[styles.text]}>{this.state.values}</Text>
            </View>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/targets.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'المستهدفون'}</Text>
              <Text style={[styles.text]}>{this.state.targets}</Text>
            </View>

            <View style={{padding:15,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
              <Image style={{position:'absolute', left:15, top: 20, width:45,height:45}} source={require('../images/about/alsubaiee.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'جائزة السبيعي للتميز '}</Text>
              <Text style={[styles.text]}>{this.state.alsubaiee}</Text>
            </View>

            <View style={{width:width-60, margin: 15, flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
                <Text style={[styles.text, styles.textTitle,{textAlign:'center'}]}>{'---------------: صفحات اخرى :---------------'}</Text>
            </View>

            <TouchableOpacity onPress={()=> Actions.faq()} style={{padding:15,width:width-30, marginBottom: 15,paddingBottom:5, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:40}} >
              <Image style={{position:'absolute', left:15, top: 10, width:25,height:25}} source={require('../images/about/arrow.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'الأسئلة المتكررة'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> Actions.terms()} style={{padding:15,paddingBottom:5,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:40}} >
              <Image style={{position:'absolute', left:15, top: 10, width:25,height:25}} source={require('../images/about/arrow.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'شروط وأحكام المتجر'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> Actions.privacy()} style={{padding:15,paddingBottom:5,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:40}} >
              <Image style={{position:'absolute', left:15, top: 10, width:25,height:25}} source={require('../images/about/arrow.png')} />
              <Text style={[styles.text, styles.textTitle]}>{'سياسة الخصوصية'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> Actions.client()} style={{padding:15,paddingBottom:5,width:width-30, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:40}} >
              <Image style={{position:'absolute', left:15, top: 10, width:25,height:25}} source={require('../images/about/arrow.png')} />
              <Text style={[styles.text, styles.textTitle]}>{' موردو المتجر'}</Text>
            </TouchableOpacity>

            <View style={{width:width-60, margin: 25}}></View>

        </ScrollView>
    </View>
    )
  }
  }

  getAboutPage(){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var pacontent = JSON.parse(this.response);
        console.log(pacontent);
        self.setState({
            isLoading: false,
            aboutus: pacontent.aboutus,
            vision: pacontent.vision,
            goals: pacontent.goals,
            alsubaiee: pacontent.alsubaiee,
            message: pacontent.message,
            values: pacontent.values,
            targets: pacontent.targets,
        });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_aboutus_page&lang=ar");
    xhr.send(data);
  }
}

const styles = StyleSheet.create({
    text: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:11,
      fontFamily: 'JFFlat-regular',
    },
    textTitle: {
      fontSize:14,
      paddingBottom: 5,
      color:'#000',
    },
});

module.exports = AboutPage;
