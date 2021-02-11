import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  I18nManager,
  AsyncStorage,
  View
} from 'react-native';
import {Scene, Router, Stack,  Actions, ActionConst} from 'react-native-router-flux';
import ListStore from './listStore';

var Home = require('./home');
var store = require('./store');
var library = require('./library');
var blog = require('./blog');
var Splash = require('./splash');
var Login = require('./login');
import SideMenu from './SideMenu';
import contribute from './contribute';
var Register = require('./register');
var Lostpassword = require('./lostpassword');
var NavigationDrawer = require('./drawer');
var calenders = require('./calenders');
var AboutPage = require('./aboutPage');
var languagespage = require('./languagespage');
var contactUs = require('./contactUs');
var myaccount = require('./myaccount');
var updateaccount = require('./updateaccount');
var searchevents = require('./searchevents');
var allSubjects = require('./allsubjects');
var viewblog = require('./viewblog');
var subjectview = require('./subjectview');
var startstudysubject = require('./startstudysubject');
var eventview = require('./eventview');
var productview = require('./productview');
var cart = require('./cart');
var order = require('./order');
var orderPayments = require('./orderPayments');
var orderSent = require('./orderSent');
var faq = require('./faq');
var terms = require('./terms');
var privacy = require('./privacy');
var client = require('./client');
var addnewevent = require('./addnewevent');

import { inject, observer} from 'mobx-react/native';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    home:"Home",
    search:"Search",
    viewall:"View All",
    latstfoodtruck:"Latest Food Trucks",
    latestevents:"Latest events",
    categories:"Categories",
    aboutus:"About us",
    contactus:"Contact us",
    events:"Event",
    viewevent:"Event details",
    truckview:"Truck details",
    allfoodtruck:"All food trucks",
    allevents:"All Event",
    languagespage:"Languages",
    addevents:"Add Event",
    thisweekevents:"This week",
    searchevents:"Search results",
    allSubjects:"all Subjects",
    myaccount:"My account",
    updateaccount:"Edit account",
    myafaviorate:"Favorites",
    calenders:"Calenders",
    activities:"Activities",
    truckadd:"truck details",
    updateLocation:"Update Truck Location",
    addtruckproduct:"Add product",
    activitiesections:"Activity sections",
    acitiyview:"Activity view",
    store:"Store",
    library:"library",
    blog:"blog",
    contribute:"contribute",
    viewblog:"viewblog",
    subjectview:"subjectview",
    startstudysubject:"startstudysubject",
    eventview:"eventview",
    productview:"productview",
    cart:"cart",
    order:"order",
    orderPayments:"orderPayments",
    orderSent:"orderSent",
    faq:"faq",
    terms:"terms",
    privacy:"privacy",
    client:"client",
    addnewevent:"addnewevent",
  },
  ar: {
    addnewevent:"⁠⁠⁠إضافة حدث",
    privacy:"سياسة الخصوصية",
    terms:"شروط وأحكام المتجر",
    faq:"الأسئلة المتكررة",
    orderSent:"تم إرسال الطلب",
    orderPayments:"إختيار طريقة الدفع ",
    order:"تحديث بيانات الشحن والتوصيل",
    cart:" سلة المنتجات ",
    productview:"تفاصيل المنتج ",
    eventview:"عرض الفعالية ",
    startstudysubject:"منهج المادة المعرفية ",
    subjectview:"تفاصيل المادة ",
    viewblog:"التفاصيل",
    contribute:"شارك",
    blog:"المدونة",
    library:"المكتبة الرقمية ",
    store:"المتجر",
    home:"الرئيسية",
    search:"البحث",
    viewall:"عرض الكل",
    latstfoodtruck:"احدث عربات الطعام",
    latestevents:"اخدث الفعاليات",
    categories:"تصنيفات الفعاليات",
    aboutus:"عن أكاديمية ق",
    contactus:"اتصل بنا",
    events:"الفعاليات",
    viewevent:"عرض الفعالية",
    truckview:"عرض العربة",
    allfoodtruck:"كل عربات الطعام",
    allevents:"كل الفعاليات",
    languagespage:"اللغات",
    addevents:"اضافة فعالية",
    thisweekevents:"فعاليات الاسبوع",
    searchevents:"البحث",
    allSubjects:"المواد المعرفية",
    myaccount:"حسابي",
    updateaccount:"تعديل بياناتي",
    myafaviorate:"المفضلة",
    calenders:"روزنامة الإعلام",
    activities:"الانشطة",
    truckadd:"تفاصيل العربة",
    updateLocation:"تحديث موقع العربة",
    addtruckproduct:"إضافة منتج",
    activitiesections:"اقسام الانشطة",
    acitiyview:"عرض النشاط",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class App extends Component {

  constructor(props){
    super(props);
    console.log("App");
    StatusBar.setBarStyle('light-content', true);
    self = this;
  }

  componentWillMount(){
    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      Actions.refresh({title: strings.home});
      if(self.props.store.languages == 'ar'){
        I18nManager.forceRTL(true);
      }else{
        I18nManager.forceRTL(true);
      }
    }, 500);
  }


  render() {
    return (
      <View style={styles.container} >
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} drawerPosition={'left'} >
            <Stack key="root" drawer contentComponent={SideMenu}  >
                 <Stack
                   key="main"
                   tabs={false}
                   initial={true}
                   type={ActionConst.RESET}
                   style={styles.appBar}
                   drawerImage={require('../images/menu.png')}
                   leftButtonIconStyle={{height: 20,resizeMode: 'contain',tintColor: 'white'}}
                   >
                    <Scene
                      key="languagespage"
                      component={languagespage}
                      hideNavBar={true}
                    />
                    <Scene
                      key="splash"
                      component={Splash}
                      hideNavBar={true}
                    />
                    <Scene
                      key="login"
                      component={Login}
                      hideNavBar={true}
                    />
                    <Scene
                      key="register"
                      component={Register}
                      hideNavBar={true}
                    />
                    <Scene
                      key="lostpassword"
                      component={Lostpassword}
                      hideNavBar={true}
                    />
                    <Scene
                      key="home"
                      component={Home}
                      title={strings.home}
                      rightButtonIconStyle={{height: 17,resizeMode: 'contain',tintColor: 'white',marginRight:-15}}
                      onRight={()=>Actions.searchevents()} rightButtonImage={require('../images/search.png')}
                      hideNavBar={false}
                      navTransparent={true}
                    />
                    <Scene
                      key="aboutpage"
                      component={AboutPage}
                      title={strings.aboutus}
                      hideNavBar={false}
                      navTransparent={true}
                      back={false}
                    />
                    <Scene
                      key="calenders"
                      component={calenders}
                      title={strings.calenders}
                      hideNavBar={false}
                      navTransparent={true}
                      back={false}
                      backButtonTintColor={'#fff'}
                      rightButtonIconStyle={{height: 17,resizeMode: 'contain',tintColor: 'white',marginRight:-15}}
                      onRight={()=>Actions.addnewevent()} rightButtonImage={require('../images/add-button.png')}
                    />
                    <Scene
                      key="addnewevent"
                      component={addnewevent}
                      title={strings.addnewevent}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="allSubjects"
                      component={allSubjects}
                      title={strings.allSubjects}
                      hideNavBar={false}
                      back={false}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="subjectview"
                      component={subjectview}
                      title={strings.subjectview}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="eventview"
                      component={eventview}
                      title={strings.eventview}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="startstudysubject"
                      component={startstudysubject}
                      title={strings.startstudysubject}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="store"
                      component={store}
                      title={strings.store}
                      hideNavBar={false}
                      back={false}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                      rightButtonIconStyle={{height: 20,resizeMode: 'contain',tintColor: 'white',marginRight:-15}}
                      onRight={()=>Actions.cart()} rightButtonImage={require('../images/cart.png')}
                    />
                    <Scene
                      key="client"
                      component={client}
                      title={strings.client}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="privacy"
                      component={privacy}
                      title={strings.privacy}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="blog"
                      component={blog}
                      title={strings.blog}
                      hideNavBar={false}
                      navTransparent={true}
                      back={false}
                    />
                    <Scene
                      key="library"
                      component={library}
                      title={strings.library}
                      hideNavBar={false}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="searchevents"
                      component={searchevents}
                      title={strings.searchevents}
                      hideNavBar={false}
                      back={true}
                      navTransparent={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="myaccount"
                      component={myaccount}
                      title={strings.myaccount}
                      hideNavBar={false}
                      back={false}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="updateaccount"
                      component={updateaccount}
                      title={strings.updateaccount}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="faq"
                      component={faq}
                      title={strings.faq}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="terms"
                      component={terms}
                      title={strings.terms}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                      navTransparent={true}
                    />
                    <Scene
                      key="contactus"
                      component={contactUs}
                      title={strings.contactus}
                      hideNavBar={false}
                    />
                    <Scene
                      key="contribute"
                      component={contribute}
                      title={strings.contribute}
                      navTransparent={true}
                      hideNavBar={false}
                    />
                    <Scene
                      key="viewblog"
                      component={viewblog}
                      title={strings.viewblog}
                      navTransparent={true}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="productview"
                      component={productview}
                      title={strings.productview}
                      navTransparent={true}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="cart"
                      component={cart}
                      title={strings.cart}
                      navTransparent={true}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="order"
                      component={order}
                      title={strings.order}
                      navTransparent={true}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="orderPayments"
                      component={orderPayments}
                      title={strings.orderPayments}
                      navTransparent={true}
                      hideNavBar={false}
                      back={true}
                      backButtonTintColor={'#fff'}
                    />
                    <Scene
                      key="orderSent"
                      component={orderSent}
                      title={strings.orderSent}
                      navTransparent={true}
                      hideNavBar={false}
                      back={false}
                      backButtonTintColor={'#fff'}
                    />

                 </Stack>
            </Stack>
        </Router>
      </View>
    );
  }
}


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 54;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor:'#6d1874',
    height: APPBAR_HEIGHT,
    paddingTop: 20,
  },
  navBar: {
    backgroundColor:'#6d1874',
    height: 44,
    paddingTop: 0,
    marginTop:-20,
  },
  statusBar: {
    zIndex:9999,
  },
  container: {
    flex: 1,
  },
  navBarTitle:{
    color:'#FFFFFF',
    fontFamily: 'JFFlat-regular' ,
    fontSize:15,
  },
});
export default App;
