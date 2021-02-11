import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TextInput,
  I18nManager,
  Platform,
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import {inject, observer} from 'mobx-react/native';
import Swiper from 'react-native-swiper';
import RNRestart from 'react-native-restart';
//import I18n from 'react-native-i18n';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    sendthecomment:"Send comment",
    languagespagse:"Languages",
    skip:"Continue",
    welcom:"Discover all Saudi events, such as festivals, concerts, conferences, events and much more, get details of the effectiveness of the event site, the date of the event and the contact information of the ticketing sites.",
  },
  ar: {
    sendthecomment:"إرسال التعليق",
    languagespagse:"اللغات",
    skip:"التالي",
    welcom:"اكتشف جميع فعاليات السعودية ،، كالمهرجانات والحفلات الموسيقية والمؤتمرات، والأحداث وأكثر من ذلك بكثير ، واحصل على تفاصيل الفعالية من موقع الفعالية وتاريخ الفعالية وبيانات التواصل لمعرفه مواقع بيع التذاكر",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class splash extends Component {
  constructor(props){
    super(props);
    console.log("splash");
    this.state = {
      pagecontent: '',
      index:0,
    }
    self = this;
    console.log(props);
    console.log(this.props.store);
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillMount(){
      setTimeout(function () {
        console.log(self.props.store.languages);
        strings.setLanguage('ar');
        self.setState({});
        console.log('ar forced');
        I18nManager.forceRTL(true);
      }, 500);
  }

  _skip(){
    if(this.state.index > 2){

      if(Platform.OS === 'ios'){
        StatusBar.setBarStyle('dark-content', true);
      }else{
        StatusBar.setBarStyle('light-content', true);
      }

      if(this.props.store.userName !== 'null'){
          Actions.home({type: 'push'});
      }else{
          Actions.login({type: 'push'});
      }
    }else{
      this.refs.slider.scrollBy(1, true);
    }
  }

  changelanguages(lang){
    strings.setLanguage(lang);
    this.props.store.changelanguages(lang);
    I18nManager.forceRTL(true);
    RNRestart.Restart();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF' }}>
          <ImageBackground
            source={require('../images/slidersBg.png')}
            style={{width:width,height:height, flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}
          >

            <Swiper ref={'slider'} style={styles.wrapper} height={width} width={width} showsButtons={false} loop={false} index={0} onIndexChanged={(val)=> {self.setState({index:val}), console.log("val", val);
            }} autoplay={false} dotStyle={styles.dots} dotColor={'#f7941e'} activeDotColor={'#935aad'} activeDotStyle={styles.dots}  >
                <View style={styles.slide1}>
                    <Image
                      source={require('../images/w1.png')}
                      style={styles.simage}
                    />
                    <Text style={[styles.text, styles.textTitle]}>من أي مكان</Text>
                    <Text style={styles.text}>قيل العلم يؤتى ، والواقع اليوم بأن العلم هو من أصبح يأتي إليك عبر مختلف الوسائل .. لذلك تعلم في المكان الذي تحب</Text>
                </View>
                <View style={styles.slide1}>
                    <Image
                      source={require('../images/w2.png')}
                      style={styles.simage}
                    />
                    <Text style={[styles.text, styles.textTitle]}>في أي زمان</Text>
                    <Text style={styles.text}>لم تعد الدراسة والعمل والأسرة عائقاً لك أمام تقدمك المهاري والعلمي .. تعلم في الوقت الذي تريد</Text>
                </View>
                <View style={styles.slide1}>
                    <Image
                      source={require('../images/w3.png')}
                      style={styles.simage}
                    />
                    <Text style={[styles.text, styles.textTitle]}>أي مجال</Text>
                    <Text style={styles.text}>مجالات الأكاديمية متنوعة ونحن نسعى لكي نوفر لك مزيج تعليمي متنوع وثري بالفائدة .. تعلم في الفن الذي تهواه</Text>
                </View>
                <View style={styles.slide1}>
                    <Image
                      source={require('../images/w4.png')}
                      style={styles.simage}
                    />
                    <Text style={[styles.text, styles.textTitle]}>أي وسيلة</Text>
                    <Text style={styles.text}>سواء أردت الإطلاع على مقاطع الفيديو أو الملفات الصوتية أو المقروءة فكلها تحمل ذات الهدف .. تعلم كما تشاء</Text>
                </View>
            </Swiper>

            <TouchableOpacity onPress={()=> this._skip()} style={styles.skipBtn} >
              <Text style={styles.skipText} >{strings.skip}</Text>
            </TouchableOpacity>

        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  simage:{
    width:100,
    height:100,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 0
  },
  text: {
    textAlign:'justify',
    paddingHorizontal:18,
    writingDirection:'rtl',
    lineHeight: 28,
    color:'#92278f',
    fontSize:11,
    fontFamily: 'JFFlat-regular',
  },
  textTitle: {
    fontSize:16,
    paddingBottom: 10,
  },
  wrapper:{
  },
  slide1: {
    width: width-80,
    height: width+0,
    top: 150,
    left: 40,
    borderRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    width: width-50,
    backgroundColor: 'transparent',
    color:'#92278f',
    paddingTop:4,
    textAlign:'center',
    paddingHorizontal:8,
    writingDirection:'rtl',
    fontSize:12,
    fontFamily: 'JFFlat-regular',
    marginTop:20,
    textAlign:'center'
  },
  skipText: {
    width:150,
    height:40,
    backgroundColor: 'transparent',
    color:'#fff',
    textAlign:'center',
    paddingHorizontal:8,
    writingDirection:'rtl',
    fontSize:12,
    fontFamily: 'JFFlat-regular',
    marginTop:13,
    textAlign:'center'
  },
  skipBtn:{
    width:150,
    height:40,
    marginTop:0,
    backgroundColor:'#faaa0d',
    borderRadius:20,
    top: -150,
  },
  dots:{
    width:12,
    height:12,
    borderRadius:6,
    marginLeft: 4,
    marginRight: 4,
    top: -1,
    marginBottom: 4,
    zIndex:99999999999
  }
});

module.exports = splash;
