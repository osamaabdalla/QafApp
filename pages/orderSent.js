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
  WebView,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
class orderSent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      success: false,
      loadingPage: true
    }
    self = this;
  }

  componentWillMount(){
    I18nManager.forceRTL(true);
  }

  loadDone(){
    console.log("load done");
    this.setState({
      loadingPage: false
    });
  }

  onError(){
    console.log("load onError");
    this.setState({
      isLoading: false,
      success: false,
    });
  }

  componentDidMount(){
    this.props.store.emptyCart();
    console.log("props", this.props);
    if(this.props.payment_method == 'paytabs'){
      if(this.props.response.response_code == "4012"){
        Actions.refresh({title:'إكمال عملية الدفع'});
        this.setState({
          isLoading: false,
          success: true,
        });
      }else{
        this.setState({
          isLoading: false,
          success: false,
        });
      }
    }
  }

  render() {
    if((this.props.payment_method == 'paytabs') && this.state.isLoading && !this.state.success){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <ScrollView showsVerticalScrollIndicator={false} >
            <Spinner visible={this.state.isLoading} color={'#9d2888'} />
          </ScrollView>
        </View>
      );
    }

    if((this.props.payment_method == 'paytabs') && !this.state.isLoading && !this.state.success){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <ScrollView showsVerticalScrollIndicator={false} >
            <Text style={[styles.text, styles.textTitle,{textAlign:'center', paddingTop: 100, width:width}]} >
              {'عفوا '}{'\n \n'}{this.props.response.result}
            </Text>
          </ScrollView>
        </View>
      );
    }

    if((this.props.payment_method == 'paytabs') && !this.state.isLoading && this.state.success){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:width, minHeight:height, backgroundColor: '#ffffff', flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
              {(this.state.loadingPage) &&
                <View style={{width:width, minHeight:height,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
                  <Spinner visible={this.state.loadingPage} color={'#9d2888'} />
                </View>
              }

              <WebView
                style={{flex:1, width:width, minHeight:height}}
                allowsInlineMediaPlayback={true}
                onLoad={()=>this.loadDone()}
                onError={()=>this.onError()}
                mixedContentMode={'always'}
                javaScriptEnabled={true}
                bounces={false}
                source={{uri: self.props.response.payment_url}}
              />
          </ScrollView>
        </View>
      );
    }



    return (
      <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} >

            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center', width:width,height:height-150}} >
              <MaterialCommunityIcons name="checkbox-marked-circle" size={80} color="#f7941e" style={{}} />
              <Text numberOfLines={1} style={[styles.text,{color: '#333333', fontSize: 14}]}>{'تم إرسال الطلب بنجاح'}</Text>

              <TouchableOpacity onPress={()=> Actions.home({type:'reset'})} style={styles.viewMoreBtn} >
                <Text style={styles.viewMoreText} >{'الصفحة الرئيسية'}</Text>
              </TouchableOpacity>
            </View>

        </ScrollView>
      </View>
    );
  }

}


const htmlstyles = StyleSheet.create({
    h4: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:15,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    p: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    h3: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    a: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    strong: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    div: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    h2: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    span: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    image: {
      maxWidth: width-20,
      padding: 0,
      margin:0,
    },
    div: {
      maxWidth: width-20,
      padding: 0,
      margin:0,
    },

});

const styles = StyleSheet.create({
    text: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 40,
      color:'#5a5a5a',
      fontSize:15,
      fontFamily: 'JFFlat-regular',
    },
    textTitle: {
      fontSize:14,
      paddingBottom: 5,
      color:'#000',
    },
    viewMoreBtn:{
      width:140,
      height:45,
      backgroundColor:'#f7941e',
      margin:0,
      borderRadius:20,
      alignItems:'center',
      marginTop: 100,
    },
    viewMoreText:{
      color:'#FFFFFF',
      paddingHorizontal:5,
      marginTop:14,
      width:130,
      textAlign:'center',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
    }
});

module.exports = orderSent;
