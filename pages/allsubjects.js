import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  I18nManager,
  Platform,
  Linking,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import {Actions, ActionConst} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
import {inject, observer} from 'mobx-react/native';
import Share, {ShareSheet, Button} from 'react-native-share';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    home:"Home",
    search:"Search",
    viewall:"View All",
    latstfoodtruck:"Food Trucks",
    latestevents:"Our suggestions",
    thisweek:"This week",
    categories:"Categories",
    aboutus:"About us",
    contactus:"Contact us",
    events:"Event",
    viewevent:"Event details",
    truckview:"Truck details",
    allfoodtruck:"All food trucks",
    allevents:"All Event",
    rights:"Rights reserved for KsaToday @2017",
    date:"Date",
    place:"Place",
  },
  ar:{
    rights:"جميع الحقوق محفوظة لتطبيق السعودية اليوم @2017",
    home:"الرئيسية",
    search:"البحث",
    viewall:"عرض الكل",
    latstfoodtruck:"عربات الطعام ",
    latestevents:"إقتراحاتنا",
    thisweek:"هذا الاسبوع",
    categories:"تصنيفات الفعاليات",
    aboutus:"من نحن",
    contactus:"اتصل بنا",
    events:"الفعاليات",
    viewevent:"عرض الفعالية",
    truckview:"عرض العربة",
    allfoodtruck:"كل عربات الطعام",
    allevents:"كل الفعاليات",
    date:"التاريخ",
    place:"المكان",
  }
});
strings.setLanguage('ar');

const LISTPADDING = Platform.OS === 'ios' ? 44 : 0;

var self;
@inject(['store']) @observer
class allSubjects extends Component {
  constructor(props){
    super(props);

    StatusBar.setBarStyle('light-content', true);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      isLoading: true,
      starCount: 0,
      subjectsDataSource: this.ds.cloneWithRows([]),
    }

    self = this;

  }

  componentWillMount(){
    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      strings.setLanguage('ar');
      I18nManager.forceRTL(true);
      self.renderSubjectsContent(self.props.store.languages);
    }, 500);
  }

  renderSeparator(sectionID,rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 5,
        }}
      />
    );
  }

  renderableSubjectsScroll(props){
    return(
      <ScrollView
         horizontal={false}
         bounces={false}
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
      >
         {this.props.children}
     </ScrollView>
   );
  }

  renderSubjectsRow(rowData){
    return(
      <Animatable.View
        animation="flipInX"
        delay={200}
        style={[styles.latestTouchableOpacityStyle,{borderWidth:0, borderRadius:0, margin: 0}]}
      >
      <TouchableOpacity
        onPress={()=>Actions.subjectview({id:rowData.id})}
        style={styles.latestTouchableOpacityStyle}
      >
      <Image
        source={{uri: rowData.image}}
        style={styles.latestImageTouchableOpacityStyle}
      />

      <View
        style={styles.subjectDetails}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[styles.avatarName,{color:'#000000'}]}
        >
          {rowData.title}
        </Text>

        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'transparent',padding:2}}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rowData.rating}
            starColor={'#ffca0c'}
            emptyStarColor={'#ffca0c'}
            starSize={18}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.avatarName,{color:'#a1a1a1',fontSize:9}]}
          >
            {rowData.countstudent}{' طالب '}{' '}{' ( '}{rowData.rating}{' تقييمات ) '}
          </Text>
        </View>

        <View style={{width:220,height:1,marginTop:4,backgroundColor:'#f5f5f5'}}></View>

        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'transparent',padding:3}}>
          <Image
            source={{uri: rowData.author_avatar}}
            style={styles.avatarImage}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.avatarName}
          >
            {rowData.author_name}
          </Text>
        </View>

        <View   style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#f1f1f1',padding:3,paddingBottom:6,width: 220 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.avatarName,{color:'#000',fontSize:9}]}
          >
            {rowData.startdate}
          </Text>
        </View>

      </View>
      </TouchableOpacity>
      </Animatable.View>
    )
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
      <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} >
        <Animatable.View animation="zoomInUp">
            <View style={{width:width-10,margin:5,padding:5,backgroundColor:'transparent',borderRadius:0,alignItems:'center'}} >
              <ListView
                enableEmptySections={true}
                dataSource={this.state.subjectsDataSource}
                renderRow={this.renderSubjectsRow}
                renderScrollComponent={(props) => this.renderableSubjectsScroll()}
                renderSeparator={this.renderSeparator}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ListlatestViewStyle}
                removeClippedSubviews={true}
                style={{paddingHorizontal: 0}}
              />
            </View>
            <View style={{width:width,height:30}} ></View>
          </Animatable.View>
        </ScrollView>
      </View>
      )
    }
  }

  renderSubjectsContent(lang){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
          var resx = JSON.parse(this.response);
          console.log(resx);
          self.setState({
              subjectsDataSource: self.ds.cloneWithRows(resx),
              isLoading: false,
          });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_course_list&lang="+lang);
    xhr.send(data);
  }

}

const styles = StyleSheet.create({

  ListlatestViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  latestTouchableOpacityStyle: {
    backgroundColor:'#fff',
    borderColor:'#f6f8fd',
    overflow: 'hidden',
    borderRadius:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    width: width - 20,
    height: width / 3 - 15,
    marginBottom: 5,
  },

  latestImageTouchableOpacityStyle: {
    width: width / 3 - 30,
    height: width / 3 - 30,
    padding: 5,
    margin: 8,
    borderRadius: 8,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },

  subjectDetails: {
    width: 220,
    height: width / 3 - 20,
    paddingTop: 4,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },

  avatarName: {
    color:'#333',
    paddingHorizontal:5,
    paddingTop:5,
    textAlign:'left',
    fontSize:11,
    fontFamily: 'JFFlat-regular' ,
  },

  avatarImage:{
    width:22,
    height:22,
    borderRadius: 12,
    borderWidth:1,
    borderColor:'#f7941e'
  },
  viewMoreBtn:{
    width:140,
    height:35,
    backgroundColor:'#f7941e',
    margin:0,
    borderRadius:20,
    alignItems:'center',
    marginTop:-20
  },
  viewMoreText:{
    color:'#FFFFFF',
    paddingHorizontal:5,
    marginTop:10,
    width:130,
    textAlign:'center',
    fontSize:11,
    fontFamily: 'JFFlat-regular' ,
  }

});

module.exports = allSubjects;
