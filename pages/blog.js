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
class blog extends Component {
  constructor(props){
    super(props);

    StatusBar.setBarStyle('light-content', true);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      isLoading: true,
      subjectsDataSource: this.ds.cloneWithRows([]),
      storeDataSource: this.ds.cloneWithRows([]),
    }

    self = this;

  }

  componentWillMount(){

    this.renderStoreContent('ar');

    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      strings.setLanguage('ar');
      I18nManager.forceRTL(true);
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

  renderableStoreScroll(props){
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

  renderStoreRow(rowData){
    return(
      <TouchableOpacity
        onPress={()=>Actions.viewblog({id:rowData.id})}
        style={styles.latestTouchableOpacityStyleStore}
      >
        <Image
          source={{uri: rowData.image}}
          style={styles.latestImageTouchableOpacityStyleStore}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[styles.avatarName,{color:'#000',fontSize:14}]}
        >
          {rowData.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={styles.avatarName}
        >
          {rowData.terms}
        </Text>
      </TouchableOpacity>
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
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View>
            <View style={{width:width,padding:5,flexDirection: 'row', justifyContent: 'flex-start', alignItems:'flex-start', flexWrap: 'wrap',}} >
                  <ListView
                    enableEmptySections={true}
                    dataSource={this.state.storeDataSource}
                    renderRow={this.renderStoreRow}
                    //renderScrollComponent={(props) => this.renderableStoreScroll()}
                    renderSeparator={this.renderSeparator}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.ListlatestViewStyle}
                    removeClippedSubviews={true}
                  />
              </View>
              <View style={{width:width,height:30}} ></View>
          </View>
        </ScrollView>
      </View>
      )
    }
  }

  renderStoreContent(lang){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
          var resx = JSON.parse(this.response);
          console.log(resx);
          self.setState({
              storeDataSource: self.ds.cloneWithRows(resx),
              isLoading: false,
          });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_blog_list&lang="+lang);
    xhr.send(data);
  }

}

const styles = StyleSheet.create({

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
    height: width / 2 + 50,
  },

  latestImageTouchableOpacityStyleStore: {
    width: width / 2 - 15,
    height: width / 2 - 20,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },

});

module.exports = blog;
