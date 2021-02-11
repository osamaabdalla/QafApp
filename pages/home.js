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
    subjectview:"Truck details",
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
    subjectview:"عرض العربة",
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
class home extends Component {
  constructor(props){
    super(props);

    StatusBar.setBarStyle('light-content', true);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      searchtext: '',
      items: [
        {"image":"https://website.com/wp-content/uploads/2017/08/courses.jpg", "link" : "https://website.com/courses"},
        {"image":"https://website.com/wp-content/uploads/2017/08/shop.jpg", "link" : "https://website.com/shop"},
        {"image":"https://website.com/wp-content/uploads/2017/08/book.jpg", "link" : "https://website.com/library"},
        {"image":"https://website.com/wp-content/uploads/2017/08/calender.jpg", "link" : "https://website.com/events"},
        {"image":"https://website.com/wp-content/uploads/2017/08/add-1.jpg", "link" : "https://website.com/share"}
      ],
      isLoading: true,
      viewsuggestnum: -1,
      latestTempDataSource: '',
      weeklatestTempDataSource: '',
      latestdatasource: [],
      weeklatestdatasource: [],
      subjectsDataSource: this.ds.cloneWithRows([]),
      storeDataSource: this.ds.cloneWithRows([]),
      sliderDataSource: [],
      catsDataSource: [],
    }

    self = this;

  }

  componentWillMount(){

    this.renderSubjectsContent('ar');
    this.renderStoreContent('ar');

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
          var resx = JSON.parse(this.response);
          console.log(resx);
          if(resx.length > 0){
            self.setState({
              items: resx,
              isLoading: false,
            });
          }else{
            self.setState({
              isLoading: false,
            });
          }
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_main_sliders&lang="+self.props.store.languages);
    xhr.send(data);

    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      strings.setLanguage('ar');
      I18nManager.forceRTL(true);
      Actions.refresh({title: strings.home});
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
         horizontal={true}
         bounces={false}
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
      >
         {this.props.children}
     </ScrollView>
   );
  }

  renderableStoreScroll(props){
    return(
      <ScrollView
         horizontal={true}
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
        animation="zoomInUp"
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

          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.avatarName,{color:'#f7941e'}]}
          >
            {rowData.title}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.avatarName,{marginTop:4,marginBottom:5}]}
          >
            {rowData.terms}
          </Text>

          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#f6f8fd',padding:3}}>
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
        </TouchableOpacity>
      </Animatable.View >
    )
  }

  openSlide(item){
    if(item.link.indexOf("courses") > -1) {
      Actions.allSubjects();
    }
    if(item.link.indexOf("shop") > -1) {
      Actions.store();
    }
    if(item.link.indexOf("library") > -1) {
      Actions.library();
    }
    if(item.link.indexOf("events") > -1) {
      Actions.calenders();
    }
    if(item.link.indexOf("share") > -1) {
      Actions.contribute();
    }
  }

  renderStoreRow(rowData){
    return(
      <Animatable.View
        animation="zoomInUp"
        delay={200}
        style={[styles.latestTouchableOpacityStyle,{borderWidth:0, borderRadius:0, margin: 0}]}
      >
      <TouchableOpacity
        onPress={()=>Actions.productview({id:rowData.id})}
        style={styles.latestTouchableOpacityStyleStore}
      >
        <Image
          source={{uri: rowData.image}}
          style={styles.latestImageTouchableOpacityStyleStore}
        />
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
        <View>
          <Swiper
            style={styles.wrapper}
            index={0}
            key={1291}
            showsButtons={false}
            showsPagination={true}
            height={190}
            dotColor={'#f7941e'}
            activeDotColor={'#823aa3'}
            paginationStyle={{ bottom: 5 }}
            autoplay={true}
            autoplayTimeout={8}
            >
              {this.state.items.map((item, key) => {
                return (
                  <TouchableOpacity key={key} onPress={()=> this.openSlide(item)} style={styles.slide}>
                    <Image resizeMode='stretch' style={styles.image} source={{uri: item.image}} />
                  </TouchableOpacity>
                )
              })}
          </Swiper>

          <View style={{width:width,height:0}} ></View>

          <Animatable.View animation="fadeInUp" style={{width:width-20,height: width / 3 + 175, margin:10,padding:5,backgroundColor:'#FFFFFF',borderRadius:0,alignItems:'center'}} >
              <View style={{width:width-20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'#eceff1', padding:5, paddingBottom:9}} >
                  <Image style={{width:50,height:50}} source={require('../images/course.png')} />
                  <View style={{width:width-100, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',borderBottomColor:'#eceff1',paddingTop:8}} >
                      <Text style={[styles.menubtnText,{width:width-100}]} >
                        {'المواد المعرفية '}
                      </Text>
                      <Text style={[styles.menubtnText,{fontSize:10,color:'#661876',width:width-100}]} >
                        {'مجموعة من المواد في مجالات الإعلام المختلفة '}
                      </Text>
                  </View>
              </View>

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
                style={{paddingHorizontal: 8}}
              />

              <TouchableOpacity onPress={()=> Actions.allSubjects()} style={styles.viewMoreBtn} >
                <Text style={styles.viewMoreText} >{'شاهد المزيد'}</Text>
              </TouchableOpacity>

          </Animatable.View>

          <View style={{width:width,height:1}} ></View>

          <Animatable.View animation="fadeInUp" style={{width:width-20,height: width / 3 + 125, margin:10,padding:5,backgroundColor:'#FFFFFF',borderRadius:0,alignItems:'center'}} >
              <View style={{width:width-20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'#eceff1', padding:5, paddingBottom:9}} >
                  <Image style={{width:50,height:50}} source={require('../images/stores.png')} />
                  <View style={{width:width-100, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',borderBottomColor:'#eceff1',paddingTop:8}} >
                      <Text style={[styles.menubtnText,{width:width-100}]} >
                        {' المتجر الإلكتروني '}
                      </Text>
                      <Text style={[styles.menubtnText,{fontSize:10,color:'#661876',width:width-100}]} >
                        {' خيارات متعددة لصناعة المعارف واكتساب المهارات '}
                      </Text>
                  </View>
              </View>

              <ListView
                enableEmptySections={true}
                dataSource={this.state.storeDataSource}
                renderRow={this.renderStoreRow}
                renderScrollComponent={(props) => this.renderableStoreScroll()}
                renderSeparator={this.renderSeparator}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ListlatestViewStyle}
                removeClippedSubviews={true}
                scrollEnabled={true}
                horizontal={true}
              />

              <TouchableOpacity onPress={()=> Actions.store()} style={styles.viewMoreBtn} >
                <Text style={styles.viewMoreText} >{'الدخول للمتجر'}</Text>
              </TouchableOpacity>

          </Animatable.View>

          <View style={{width:width,height:30}} ></View>

          </View>
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
          if(resx.length > 3){
            resx = resx.slice(0, 3);
          }
          self.setState({
              subjectsDataSource: self.ds.cloneWithRows(resx),
              isLoading: false,
          });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_course_list&limitation=3&lang="+lang);
    xhr.send(data);
  }

  renderStoreContent(lang){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
          var resx = JSON.parse(this.response);
          console.log(resx);
          if(resx.length > 3){
            resx = resx.slice(0, 3);
          }
          self.setState({
              storeDataSource: self.ds.cloneWithRows(resx),
              isLoading: false,
          });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_store_list&limitation=3&lang="+lang);
    xhr.send(data);
  }

}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15
  },

  slide: {
    flex:1
  },

  image: {
    width,
    height:170,
  },

  menubtnText: {
    width: width - 20,
    textAlign: 'left',
    paddingHorizontal: 10,
    color:'#5d5d5d',
    fontFamily: 'JFFlat-regular' ,
    fontSize:12,
    marginBottom:8,
  },

  ListlatestViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  latestTouchableOpacityStyle: {
    backgroundColor:'#fff',
    borderColor:'#f6f8fd',
    borderWidth:2,
    overflow: 'hidden',
    borderRadius:1,
    margin: 3,
    width: width / 3 - 15,
    height: width / 3 + 50,
  },

  latestTouchableOpacityStyleStore: {
    backgroundColor:'#fff',
    borderColor:'#f6f8fd',
    borderWidth:2,
    overflow: 'hidden',
    borderRadius:1,
    margin: 3,
    width: width / 3 - 15,
    height: width / 3,
  },

  latestImageTouchableOpacityStyleStore: {
    width: width / 3 - 15,
    height: width / 3,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },

  latestImageTouchableOpacityStyle: {
    width: width / 3 - 15,
    height: width / 3 - 25,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },

  avatarName: {
    color:'#333',
    paddingHorizontal:5,
    paddingTop:5,
    textAlign:'left',
    fontSize:10,
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

module.exports = home;
