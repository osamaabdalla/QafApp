import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Linking,
  I18nManager,
  TextInput,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Share, {ShareSheet, Button} from 'react-native-share';
import RNCalendarEvents from 'react-native-calendar-events';
import Modal from 'react-native-modal';

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
class eventview extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: '',
      comments: [],
      isLoading: true,
      isloved: false,
      isstartted: false,
      onethemessage: '',
      isModalVisible: false,
      senddingcomment: false,
    }
    self = this;
  }

  componentWillMount(){
    self.getBlogdetails();
    I18nManager.forceRTL(true);
  }

  _saveEvent(rowData){
    var sdate = new Date(rowData.EventStartDate);
    var edate = new Date(rowData.EventEndDate);
    var startDate = sdate.toISOString();
    var endDate = edate.toISOString();

    RNCalendarEvents.authorizeEventStore().then(status => {
        console.log(status);
        RNCalendarEvents.saveEvent(rowData.post_title, {
          location: rowData.guid,
          notes: rowData.post_content,
          startDate: startDate,
          endDate: endDate,
          allDay: true,
          alarms: [{
            date: -1
          }]
        })
        .then(id => {
          console.log(id);
          //this.props.store.addedEvent(rowData.id, id);
          Alert.alert(
            'نجاح',
            'تمت إضافة الفعالية للتقويم',
            [{text: 'حسنا' }]
          );
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {

    let shareOption = {
      title: this.state.content.post_title,
      message: this.state.content.post_content,
      url: this.state.content.guid,
    };

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
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}} contentContainerStyle={{ flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>

            <Image
              source={{uri:this.state.content.image}}
              style={{width:width-20,height:280, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor: '#ddd', borderWidth:5, borderColor:'#FFFFFF'}}
            />

            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {this.state.content.post_content}
              </Text>
              <View style={{width:width, marginLeft:-10, height: 10, backgroundColor:'#eceff1'}}></View>
              <Text
                style={[styles.text, styles.textSection]}
              >
                {'بداية الفعالية : '}{this.state.content.EventStartDate}
              </Text>
              <Text
                style={[styles.text, styles.textSection]}
              >
                {'نهاية الفعالية : '}{this.state.content.EventEndDate}
              </Text>

              <View style={{width:width, marginLeft:-10, height: 10, backgroundColor:'#eceff1'}}></View>
              <TouchableOpacity onPress={()=>this._saveEvent(this.state.content)} style={styles.sendbtn} >
                <Text style={[styles.text,{color:'#FFFFFF'}]} >
                    مزامنة أو تصدير للتقويم
                </Text>
              </TouchableOpacity>
              <View style={{width:width-60, height: 15}}></View>
            </View>

            <View style={{width:width-60, margin: 25}}></View>

        </ScrollView>
    </View>
    )
  }
  }

  getBlogdetails(){
    var id = self.props.id;
    console.log("id", id);

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var content = JSON.parse(this.response);
        console.log(content);
        Actions.refresh({title: content[0].post_title})
        self.setState({
            isLoading: false,
            content: content[0],
        });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_event_page&id="+id);
    xhr.send(data);
  }
}

const htmlstyles = StyleSheet.create({
    h4: {
      textAlign:'right',
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:13,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    p: {
      textAlign:'right',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:11,
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
      lineHeight: 24,
      color:'#5a5a5a',
      fontSize:13,
      fontFamily: 'JFFlat-regular',
    },
    textSection:{
      paddingTop:10,
      paddingBottom:10,
    },
    menubtInputArea : {
      height: 140,
      width: width-140,
      borderColor: '#ddd',
      borderRadius: 20,
      borderWidth: 1,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      paddingHorizontal: 20,
      paddingTop: 10,
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      backgroundColor: '#FFFFFF',
    },
    textTitle: {
      fontSize:14,
      paddingBottom: 5,
      color:'#000',
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
    sendbtn :{
      width:180,
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

module.exports = eventview;
