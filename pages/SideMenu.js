import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  Platform,
  I18nManager,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import {inject, observer} from 'mobx-react/native';
import RNRestart from 'react-native-restart';
//import I18n from 'react-native-i18n';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    home:"Home Page",
    suggestions:"Our suggestions",
    thisweek:"This week",
    allevents:"All Event",
    calendar:"Calendar",
    favorites:"Favorites",
    setting:"Setting",
    logout:"Logout",
    login:"Login",
    search:"Search",
    viewall:"View All",
    latstfoodtruck:"Latest Food Trucks",
    latestevents:"Latest events",
    categories:"Categories",
    aboutus:"About us",
    contactus:"Contact us",
    events:"Event",
    addevents:"Add Event",
    viewevent:"Event details",
    truckview:"Truck details",
    allfoodtruck:"Food trucks",
    selelang:"Languages",
    selelanguafeg:"Languages",
    foodtruckadd:"Add food truck",
    rights:"Rights reserved for Qaf",
    myaccount:"My account",
    activity:"Activities",
  },
  ar: {
    myaccount:"حسابي",
    rights:"الحقوق محفوظة أكاديمية ق ",
    home:"الصفحة الرئيسية",
    suggestions:"إقتراحاتنا",
    thisweek:"هذا الاسبوع",
    allevents:"جميع الفعاليات",
    calendar:"التقويم",
    favorites:"المفضلة",
    setting:"الاعدادات",
    logout:"تسجيل الخروج",
    login:"تسجيل الدخول",
    search:"البحث",
    viewall:"عرض الكل",
    latstfoodtruck:"احدث عربات الطعام",
    foodtruckadd:"إضافة عربة طعام",
    latestevents:"اخدث الفعاليات",
    categories:"تصنيفات الفعاليات",
    aboutus:"من نحن",
    contactus:"اتصل بنا",
    events:"الفعاليات",
    addevents:"اضافة فعالية",
    viewevent:"عرض الفعالية",
    truckview:"عرض العربة",
    allfoodtruck:"عربات الطعام",
    selelang:"اللغات",
    selelanguafeg:"Languages",
    activity:"أنشطة",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class SideMenu extends Component {
  constructor(props){
    super(props);
    self = this;
  }

  drawerchanges(){
    //this.props.closer();
  }

  componentWillMount(){
    setTimeout(function () {
      self.setState({});
      strings.setLanguage('ar');
      I18nManager.forceRTL(true);
    }, 500);
  }

  _meunProfile(){
    if(this.props.store.userName !== 'null'){
      return(
        <View style={{flex: 0.15,width:220,marginBottom:0,borderBottomWidth:1, borderBottomColor:'transparent',flexDirection:'column',alignItems:'center',paddingBottom:8}} >
          <Image style={styles.image} source={{uri:this.props.store.avatar}} />
          <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.myaccount()}} >
              <Text style={[styles.menubtnText,{textAlign: 'center',marginTop:0}]} >
                {this.props.store.name}{' - '}{strings.myaccount}
              </Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View style={{flex: 0.15,width:220,marginBottom:0,borderBottomWidth:1, borderBottomColor:'transparent',flexDirection:'column',alignItems:'center',paddingBottom:10}} >
          <Image style={styles.image} source={require('../images/userlogo.png')} />
            <TouchableOpacity onPress={()=> {this.drawerchanges(), this._login()}} >
                <Text style={styles.menubtnText} >
                  {strings.login}
                </Text>
            </TouchableOpacity>
        </View>
      );
    }
  }

  _logButtons(){
    if(this.props.store.userName !== 'null'){
      return(
        <TouchableOpacity onPress={()=> {this.drawerchanges(), this._logout()}} style={styles.menubtn} >
            <Image style={[styles.menuIcons]} tintColor="#fff" source={require('../images/logout.png')} />
            <Text style={styles.menubtnText} >
              {strings.logout}
            </Text>
        </TouchableOpacity>
      );
    }
  }

  _login(){
    Actions.login();
  }

  _logout(){
    this.props.store.setPhoneNumber('null');
    this.props.store.setName('null');
    this.props.store.setUserName('null');
    this.props.store.setHastruck(false);
    setTimeout(function () {
      RNRestart.Restart();
    }, 100);
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/sideMenuBg.png')}
        style={{width:280,height:height, flexDirection:'column', justifyContent:'center', alignItems:'center'}}
      >
          {this._meunProfile()}

          <View style={{width:180,height:1,backgroundColor:'#FFFFFF', opacity:0.1,marginTop:12,marginBottom:6}} ></View>

          <View style={styles.contBtns}>


          <ScrollView showsVerticalScrollIndicator={false} >

              <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.home({type:'reset'})}} style={styles.menubtn} >
                  <Image style={[styles.menuIcons,{width:21}]} tintColor="#fff" source={require('../images/home.png')} />
                  <Text style={styles.menubtnText} >
                    {strings.home}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> Actions.store({type:'reset'})} style={styles.menubtn} >
                  <Image style={[styles.menuIcons,{width:21}]} tintColor="#fff" source={require('../images/store.png')} />
                  <Text style={styles.menubtnText} >
                    {'المتجر الإلكتروني '}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> Actions.allSubjects({type:'reset'})} style={styles.menubtn} >
                  <Image style={[styles.menuIcons,{width:22}]} tintColor="#fff" source={require('../images/subjects.png')} />
                  <Text style={styles.menubtnText} >
                    {'المواد المعرفية '}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.calenders({type:'reset'})}} style={styles.menubtn} >
                  <Image style={[styles.menuIcons]} tintColor="#fff" source={require('../images/events.png')} />
                  <Text style={styles.menubtnText} >
                    {'روزنامة الإعلام '}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.library({type:'reset'})}} style={styles.menubtn} >
                  <Image style={styles.menuIcons} tintColor="#fff" source={require('../images/library.png')} />
                  <Text style={styles.menubtnText} >
                    {'المكتبة الرقمية '}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.blog({type:'reset'})}} style={styles.menubtn} >
                  <Image style={[styles.menuIcons]} tintColor="#fff" source={require('../images/blog.png')} />
                  <Text style={styles.menubtnText} >
                    {'المدونة'}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.aboutpage({type:'reset'})}} style={styles.menubtn} >
                  <Image style={[styles.menuIcons]} tintColor="#fff" source={require('../images/information.png')} />
                  <Text style={styles.menubtnText} >
                    {'عن أكاديمية ق'}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> {this.drawerchanges(), Actions.contribute({type:'reset'})}} style={styles.menubtn} >
                  <Image style={styles.menuIcons} tintColor="#fff" source={require('../images/shareus.png')} />
                  <Text style={styles.menubtnText} >
                    {'شارك'}
                  </Text>
              </TouchableOpacity>

              {this._logButtons()}

          </ScrollView>

        </View>
        <View style={{width:180,height:1,backgroundColor:'#FFFFFF', opacity:0.1,marginTop:10,marginBottom:10}} ></View>
          <View style={styles.socialView}>

              <View style={{justifyContent: 'center', alignItems:'center', flexDirection: 'row', width:280}} >

                  <TouchableOpacity onPress={()=> Linking.openURL('mailto:info@website.com').catch(err => console.error('An error occurred', err))} style={styles.socialBtn} >
                      <Image style={styles.socialBtnIcons} source={require('../images/socials/email.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> Linking.openURL('https://www.instagram.com/qafaca').catch(err => console.error('An error occurred', err))} style={styles.socialBtn} >
                      <Image style={styles.socialBtnIcons} source={require('../images/socials/instagram.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> Linking.openURL('https://www.snapchat.com/add/qafaca').catch(err => console.error('An error occurred', err))} style={styles.socialBtn} >
                      <Image style={styles.socialBtnIcons} source={require('../images/socials/snapchat.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> Linking.openURL('https://t.me/Qafaca').catch(err => console.error('An error occurred', err))} style={styles.socialBtn} >
                      <Image style={styles.socialBtnIcons} source={require('../images/socials/telegram.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/qafaca').catch(err => console.error('An error occurred', err))} style={styles.socialBtn} >
                      <Image style={styles.socialBtnIcons} source={require('../images/socials/facebook.png')} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> Linking.openURL('https://twitter.com/qafaca').catch(err => console.error('An error occurred', err))} style={styles.socialBtn} >
                      <Image style={styles.socialBtnIcons} source={require('../images/socials/twitter.png')} />
                  </TouchableOpacity>

              </View>
              <Text style={styles.rightsText} >
                {strings.rights}
              </Text>

          </View>

        </ImageBackground>

    );
  }

}

const styles = StyleSheet.create({
  slideMenu:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius:30,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  contBtns:{
    flex: 0.6,
    //flexDirection: 'column',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
  },

  socialBtn: {
    marginLeft:2,
    marginRight:2,
    overflow:'hidden',
    width:24,
    height:24,
    borderRadius:12,
    backgroundColor:'transparent',
  },

  socialView:{
    flex: 0.10,
    justifyContent: 'center',
    backgroundColor:'transparent',
    paddingTop:10,
    paddingBottom:5,
  },

  rightsText: {
    color: '#fff',
    fontSize:10,
    textAlign:'center',
    fontFamily: 'JFFlat-regular' ,
    marginTop:10,
    marginBottom:6,
    justifyContent: 'center',
  },

  menubtn: {
    height:38,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    right:0,
    width:280,
    paddingLeft:40
  },

  closeMenubtn: {
    position: 'absolute',
    width: 38,
    height: 38,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    right: 0,
    top: 20,
  },

  menuIcons: {
    marginLeft: 0,
    marginRight: 10,
    width:20,
    height:20,
  },

  socialBtnIcons: {
    marginLeft: 0,
    marginRight: 0,
    width:24,
    height:24,
    borderRadius:12,
    overflow:'hidden',
    backgroundColor:'transparent',
  },

  menubtnText: {
    textAlign: 'left',
    color:'#fff',
    fontFamily: 'JFFlat-regular',
    backgroundColor:'transparent',
    fontSize:11,
    marginTop: 2,
  }

});

module.exports = SideMenu;
