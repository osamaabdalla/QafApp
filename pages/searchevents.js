import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
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
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width , height} = Dimensions.get('window');
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
    textholder:"-- إختر نوع البحث ",
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
class searchevents extends Component {
  constructor(props){
    super(props);
    StatusBar.setBarStyle('light-content', true);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      isLoading: false,
      isWait: true,
      posttype:'',
      textholder:"-- إختر نوع البحث ",
      searchtext: '',
      storeDataSource: this.ds.cloneWithRows([]),
      isModalVisible: false
    }
    self = this;
  }

  viewDetails(id){
    var type = this.state.posttype;

    if(type == 'course'){
      Actions.subjectview({id:id});

    }else if (type == 'tribe_events') {
      Actions.eventview({id:id});

    }else if (type == 'product') {
      Actions.productview({id:id});

    }else{
      Actions.viewblog({id:id});
    }
  }

  search(){
    if((this.state.searchtext.length > 1) && (this.state.posttype.length > 1)){
      this.renderStoreContent(this.state.searchtext, this.state.posttype);
      Actions.refresh({title: this.state.textholder});
    }else{
      Alert.alert(
        'عفوا',
        ' الرجاء كتابة كلمة البحث واختيار نوع البحث',
        [
          {text: 'حسنا', onPress: () => console.log("done")}
        ],
      );
    }
  }

  componentWillMount(){
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
    if(self.state.posttype == 'biblio'){
      return(
        <View
          style={[styles.latestTouchableOpacityStyleStore,{height: width / 2 + 50}]}
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
      )
    }

    return(
      <TouchableOpacity
        onPress={()=>self.viewDetails(rowData.id)}
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
    }

    if(this.state.isWait){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1'}} >
            <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
            <View style={{width:width,height:height-100, flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
              <TextInput
                style={styles.menubtInput}
                onChangeText={(text) => this.setState({searchtext: text})}
                value={this.state.searchtext}
                placeholder = {'ادخل كلمة البحث'}
                placeholderTextColor = {'#6e1874'}
                returnKeyType = {"search"}
                autoFocus = {false}
                autoCapitalize = {'none'}
                autoCorrect={false}
                underlineColorAndroid = {'transparent'}
              />

              <TouchableOpacity onPress={()=> this.setState({isModalVisible: true})} style={styles.loginBtnType} >
                <Text style={[styles.skipText,{color:'#333',marginTop:12}]} >{this.state.textholder}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.search()} style={styles.loginBtn} >
                  <Icon name="search" size={15} style={{position:'absolute', top: 10, left: 12}} color="#FFFFFF" />
                  <Text style={styles.skipText} >{'بحث'}</Text>
              </TouchableOpacity>

            </View>

            <Modal isVisible={this.state.isModalVisible} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <View style={{ width: 300, height: 300, borderRadius: 20, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }} >
                <TouchableOpacity onPress={()=> this.setState({textholder: 'البحث في المواد المعرفية ', posttype:'course',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
                  <Text style={[styles.skipText,{color:'#ffffff'}]} >البحث في المواد المعرفية </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setState({textholder: 'البحث في الفعاليات ', posttype:'tribe_events',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
                  <Text style={[styles.skipText,{color:'#ffffff'}]} >البحث في الفعاليات </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setState({textholder: 'البحث في المتجر الاكتروني ', posttype:'product',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
                  <Text style={[styles.skipText,{color:'#ffffff'}]} >البحث في المتجر الاكتروني </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setState({textholder: 'البحث في المكتبة ', posttype:'biblio',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
                  <Text style={[styles.skipText,{color:'#ffffff'}]} >البحث في المكتبة </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setState({textholder: 'البحث في الاخبار والمقالات ', posttype:'post',isModalVisible: false})} style={styles.loginBtnTypeOtion} >
                  <Text style={[styles.skipText,{color:'#ffffff'}]} >البحث في الاخبار والمقالات </Text>
                </TouchableOpacity>
              </View>
            </Modal>

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
              <View style={{width:width,height:5}} ></View>
          </View>

          <TouchableOpacity onPress={()=> {this.setState({ isLoading: false, isWait: true, }),
            Actions.refresh({title:'البحث'})}} style={[styles.loginBtn,{marginLeft:120}]} >
              <Icon name="search" size={15} style={{position:'absolute', top: 10, left: 12}} color="#FFFFFF" />
              <Text style={styles.skipText} >{'بحث جديد'}</Text>
          </TouchableOpacity>
          <View style={{width:width,height:30}} ></View>
        </ScrollView>
      </View>
    );

  }

  renderStoreContent(term, type){
    console.log("url", "https://website.com/ajax.php?service=get_search_list&lang=ar&term="+term+"&type="+type);

    self.setState({
      isLoading: true,
    });
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var resx = JSON.parse(this.response);
        console.log(resx);
        if(resx.length > 0){
          self.setState({
            storeDataSource: self.ds.cloneWithRows(resx),
            isLoading: false,
            isWait: false,
          });
        }else{
          Actions.refresh({title: 'البحث'});
          self.setState({
            isLoading: false,
            isWait: true,
          });
          setTimeout(function () {
            Alert.alert(
              'عفوا',
              'لا توجد نتائج لعملية البحث',
              [
                {text: 'حسنا', onPress: () => console.log("done")}
              ],
            );
          }, 100);
        }
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_search_list&lang=ar&term="+term+"&type="+type);
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
    height: width / 2 + 20,
  },
  latestImageTouchableOpacityStyleStore: {
    width: width / 2 - 15,
    height: width / 2 - 20,
    backgroundColor:'transparent',
    overflow: 'hidden',
  },
  menubtInput : {
    height: 44,
    width: width-80,
    color:'#935aad',
    borderColor: '#6e1874',
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    fontSize:14,
    backgroundColor: '#FFFFFF',
    fontFamily: 'JFFlat-regular',
  },
  loginBtnType : {
    height: 44,
    width: width-80,
    borderColor: '#6e1874',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  loginBtnTypeOtion : {
    height: 44,
    width: 250,
    borderColor: '#6e1874',
    backgroundColor: '#6e1874',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 20,
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
  loginBtn:{
    width:140,
    height:40,
    backgroundColor:'#faaa0d',
    borderWidth:1,
    borderColor:'#faaa0d',
    margin:5,
    marginTop:25,
    borderRadius:20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

module.exports = searchevents;
