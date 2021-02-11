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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
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
    rights:"جميع الحقوق محفوظة لتطبيق",
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
class library extends Component {
  constructor(props){
    super(props);

    StatusBar.setBarStyle('light-content', true);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      isLoading: true,
      storeDataSource: this.ds.cloneWithRows([]),
      isModalVisible: false,
      filters: [],
      savedfilters: [],
      booksData: [],
    }
    self = this;
  }

  filter(){
    this.setState({
      isModalVisible: false,
      isLoading: true,
    });

    var filters = this.state.filters;
    var books = this.state.booksData;
    console.log("filters", filters);
    console.log("books", books);
    var newbooks = [];

    for (var i = 0; i < books.length; i++) {
      for (var x = 0; x < books[i].terms.length; x++) {
        if(filters.indexOf(books[i].terms[x]) > -1){
          newbooks.push(books[i]);
        }
      }
      if(i == books.length-1){
        self.setState({
          //savedfilters: newbooks,
          isLoading: false,
          storeDataSource: self.ds.cloneWithRows(newbooks),
        });
      }
    }
  }

  pushTofilters(id){
    var filters = this.state.filters;
    var index = filters.indexOf(id);
    if(index > -1){
      filters.splice(index, 1);
      this.setState({filters: filters});
    }else{
      filters.push(id);
      this.setState({filters: filters});
    }
  }

  static renderRightButton(props){
    return (
      <TouchableOpacity style={{width:40,height:40, flexDirection:'column', alignItems:'center', justifyContent:'center'}} onPress={() => {self.setState({ isModalVisible: true })}}>
        <Icon name="filter" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    );
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
      <View
        style={styles.latestTouchableOpacityStyleStore}
      >
        <Image
          source={{uri: rowData.image}}
          style={styles.latestImageTouchableOpacityStyleStore}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[styles.avatarName,{color:'#333',fontSize:13}]}
        >
          {rowData.title}
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start',backgroundColor:'transparent'}}>
          <TouchableOpacity
            onPress={()=>Linking.openURL(rowData.link)}
            style={{borderColor:'#fcab00',borderWidth:1,borderRadius:4,width:100,height:30}}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.avatarName,{color:'#fcab00',fontSize:13,textAlign:'center'}]}
            >
              {'الرابط'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

        <Modal isVisible={this.state.isModalVisible} style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
          <View style={{ width: 340, height: 380, borderRadius: 8, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', overflow:'hidden' }} >
            <TouchableOpacity
              style={{position:'absolute', top:8, left: 8, zIndex:9999999, backgroundColor: 'transparent'}}
              onPress={()=>self.setState({ isModalVisible: false })} >
              <MaterialCommunityIcons name="close-circle-outline" size={22} color="#FFFFFF" style={{position:'absolute', top:0, left: 8}} />
            </TouchableOpacity>

            <Text style={[styles.headerTitl]} >حسب التصنيف </Text>

            <View style={{ width: 340, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5, flexWrap:'wrap'}} >
              <TouchableOpacity onPress={()=> {this.pushTofilters(301)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(301) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >التصميم</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(277)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(277) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >الإعداد والتقديم</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(283)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(283) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >الصحافة</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(278)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(278) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >الإعلام الرقمي</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(280)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(280) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >الإنتاج</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(279)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(279) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >الثقافة الإعلامية</Text>
              </TouchableOpacity>
            </View>


            <Text style={[styles.headerTitl]} >حسب عدد الصفحات </Text>

            <View style={{ width: 340, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5, flexWrap:'wrap'}} >
              <TouchableOpacity onPress={()=> {this.pushTofilters(284)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(284) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >من 1 إلى 50</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(285)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(285) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >من 51 إلى 100</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(286)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(286) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >من 101 إلى 200</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.pushTofilters(287)}} style={styles.loginBtnTypeOtion} >
                {(self.state.filters.indexOf(287) > -1) &&
                  <MaterialCommunityIcons name="check-circle-outline" size={22} color="#6e1874" style={{marginRight:5}} />
                }
                <Text style={[styles.butonskipText]} >من 201 فأكثر</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: 340, height: 15}} ></View>

            <TouchableOpacity onPress={()=> {this.filter()}} style={styles.saveButon} >
              <Text style={[styles.skipText]} > حفظ التصفية </Text>
            </TouchableOpacity>
            <View style={{ width: 340, height: 10}} ></View>
          </View>
        </Modal>

      </View>
    );
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
              booksData: resx,
              isLoading: false,
          });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_library_list&lang="+lang);
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
    height: 40,
    textAlign:'left',
    fontSize:13,
    fontFamily: 'JFFlat-regular' ,
  },
  saveButon:{
    height: 44,
    width: 150,
    padding:5,
    borderRadius: 22,
    backgroundColor: '#6e1874',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButonText:{

  },
  latestTouchableOpacityStyleStore: {
    backgroundColor:'#FFFFFF',
    borderColor:'#FFFFFF',
    borderWidth:3,
    overflow: 'hidden',
    flexWrap: 'wrap',
    borderRadius:1,
    margin: 5,
    width: width / 2 - 15,
    height: width / 2 + 68,
  },
  loginBtnTypeOtion : {
    height: 36,
    width: 160,
    borderColor: '#F7941E',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 14,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    backgroundColor: 'transparent',
    color:'#fff',
    paddingHorizontal:8,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    textAlign:'center'
  },
  butonskipText: {
    color:'#555',
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    textAlign:'center'
  },
  headerTitl: {
    color:'#fff',
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    textAlign:'center',
    height: 44,
    width: 340,
    paddingTop:12,
    backgroundColor: '#6e1874',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  latestImageTouchableOpacityStyleStore: {
    width: width / 2 - 15,
    height: width / 2 - 20,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },

});

module.exports = library;
