import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  Platform,
  TextInput,
  I18nManager,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

import HTMLView from 'react-native-htmlview';
import resolveAssetSource from 'resolveAssetSource';
import {Actions, ActionConst} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window');
import {inject, observer} from 'mobx-react/native';
import LocalizedStrings from 'react-native-localization';
import Share, {ShareSheet, Button} from 'react-native-share';
import RNCalendarEvents from 'react-native-calendar-events';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

const LISTPADDING = Platform.OS === 'ios' ? 0 : 0;
LocaleConfig.locales['ar'] = {
  monthNames: ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر'],
  monthNamesShort: ['ينا','فبرا','مارس','ابر','ماي','يون','يول.','اغسط','سبت.','اكتو','نوف','ديس'],
  dayNames: ['الاحد','الاثنين','الثلاثاء','الاربعاء','الخميس','الجمعة','السبت'],
  dayNamesShort: ['الاحد','الاثنين','الثلاثاء','الاربعاء','الخميس','الجمعة','السبت'],
};
LocaleConfig.defaultLocale = 'ar';

let strings = new LocalizedStrings({
  en:{
    titleste:"All Events",
    oursuggestions:"Our suggestions",
    calenders:"Comming events calender",
    empty:"Empty",
    emptyday:"This is empty date!",
  },
  ar: {
    emptyday:"لاتوجد فعاليات ليوم",
    titleste:"الفعاليات",
    oursuggestions:"إقتراحاتنا",
    calenders:"تقويم الفعاليات",
    empty:"لاتوجد فعاليات في التقويم",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class calenders extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      items: {},
      eventslist:[{
        EventEndDate:"2017-04-27 17:00:00",
        EventStartDate:"2017-04-25 08:00:00",
        ID:2890,
        comment_count:"0",
        comment_status:"open",
        filter:"raw",
        guid:"https://website.com/?post_type=tribe_events&#038;p=2890",
        image:"https://website.com/wp-content/uploads/2017/04/C8pWR9OXgAACg-J-1024x721.jpg",
        menu_order:0,
        ping_status:"closed",
        pinged:"",
        post_author:"1",
        post_content:"ملتقى سنوي يحضره ما يزيد عن 250 إعلاميا، يهدف إلى تطوير الإعلام المرئي الهادف من خلال تعزيز التواصل والتفاعل وتبادل الخبرات بين أعضاء الرابطة، تعقد النسخة الثامنة منه هذا العام برعاية معالي وزير الشؤون الإسلامية والدعوة والإرشاد في رحاب مكة المكرمة مهبط الوحي ومنطلق الرسالة الخالدة.",
        post_content_filtered:"",
        post_date:"2017-04-23 16:20:57",
        post_date_gmt:"2017-04-23 16:20:57",
        post_excerpt:"",
        post_mime_type:"",
        post_modified:"2017-06-17 20:04:25",
        post_modified_gmt:"2017-06-17 20:04:25",
        post_name:"%d9%85%d9%84%d8%aa%d9%82%d9%89-%d8%b1%d8%a7%d8%a8%d8%b7%d8%a9-%d8%a7%d9%84%d8%a5%d8%b9%d9%84%d8%a7%d9%85-%d8%a7%d9%84%d9%85%d8%b1%d8%a6%d9%8a-%d8%a7%d9%84%d9%87%d8%a7%d8%af%d9%81-8",
        post_parent:0,
        post_password:"",
        post_status:"publish",
        post_title:"ملتقى رابطة الإعلام المرئي الهادف 8",
        post_type:"tribe_events",
        to_ping:"",
      }],
      markedDates:{}
    }
    self = this;
  }

  renderEventSeparator(sectionID,rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 0,
        }}
      />
    );
  }

  componentDidMount(){
    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      I18nManager.forceRTL(true);
    }, 500);
  }

  componentWillMount(){

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("events.responseText ", this.responseText);
        var events = JSON.parse(this.responseText);
        console.log("events", events);
        self.setState({
          eventslist: events
        });

        var markedDates = {};
        var startdate = '';
        for (var i = 0; i < events.length; i++) {
          startdate = events[i].EventStartDate.slice(0, -9);
          markedDates[startdate] = {selected: true, marked: true};

          if(i == events.length-1){
            self.setState({
              markedDates: markedDates
            });
          }
        }
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_tribe_events");
    xhr.send(data);

    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      I18nManager.forceRTL(true);
    }, 500);
  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}} >
            <ActivityIndicator size="large" color="#6d1874" />
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          markedDates={this.state.markedDates}
          renderKnob={() => {return (<View style={{backgroundColor:'#731872',width:50,height:8,marginTop:10,borderRadius:8}} />);}}
          theme={{
            textDayfontFamily: 'JFFlat-regular',
            textMonthfontFamily: 'JFFlat-regular',
            textDayHeaderfontFamily: 'JFFlat-regular',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 12,
            agendaDayTextColor: '#333333',
            selectedDayBackgroundColor: '#6d1874',
            todayTextColor: '#6d1874',
            dotColor: '#6d1874',
          }}
          style={{height: 350}}
        />
      </View>
    );
  }

  loadItems(day) {
    var date = new Date();
    var nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 6);
    var mainEventsArray = [];
    var events = self.state.eventslist;
    if(events.length > 0){
      for (var i = 0; i < events.length; i++) {
        const startdate = events[i].EventStartDate.slice(0, -9);
        //console.log("startdate", startdate);
        const strTime = startdate.split('T')[0];
        if (!mainEventsArray[strTime]) {
          mainEventsArray[strTime] = [];
          mainEventsArray[strTime].push(events[i]);
        }else{
          mainEventsArray[strTime].push(events[i]);
        }
        if(i == events.length-1){
          self.setState({
            isLoading: false,
          });
          var itemarraysevents = [];
          var itemarrays = [];
          setTimeout(() => {
            for (let i = -15; i < 85; i++) {
              const time = day.timestamp + i * 24 * 60 * 60 * 1000;
              const strTime = self.timeToString(time);
              if(mainEventsArray[strTime]){
                itemarrays[strTime] = mainEventsArray[strTime];
              }else{
                itemarrays[strTime] = [];
              }
            }

            //console.log(itemarraysevents);
            //console.log(itemarrays);
            const newItems = {};
            Object.keys(itemarrays).forEach(key => {newItems[key] = itemarrays[key]});
            console.log("newItems", newItems);

            self.setState({
              items: newItems
            });
          }, 1000);
        }
      }
    }else{
      self.setState({
        items: {},
        isLoading: false,
      });
    }
  }

  renderItem(item) {
    console.log("item", item);

    return (
      <TouchableOpacity
        onPress={()=>Actions.eventview({id:item.ID})}
        style={[styles.item]}
      >
        <Image style={styles.image} source={{uri:item.image}} />
        <Text style={{fontFamily: 'JFFlat-regular', textAlign: 'left', lineHeight: 24}} >{item.post_title}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate(date) {
    var datys = date.getDate();
    return (
      <View style={styles.emptyDate}><Text style={{fontFamily: 'JFFlat-regular'}} >{strings.emptyday} {datys}</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    console.log("message time", time);

    const date = new Date(time);
    console.log("message date", date);

    return date.toISOString().split('T')[0];
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 45,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image:{
    position: 'absolute',
    left: 4,
    top: 17,
    width: 36,
    height: 36,
    borderRadius: 18
  },
  emptyDate: {
    backgroundColor: 'transparent',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

});

module.exports = calenders;
