import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  I18nManager,
  TextInput,
  Platform,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';

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
class privacy extends Component {
  constructor(props){
    super(props);
    this.state = {
      aboutus: '',
      vision: '',
      goals: '',
      alsubaiee: '',
      message: '',
      values: '',
      targets: '',
      isLoading: true
    }
    self = this;
  }

  componentWillMount(){
    I18nManager.forceRTL(true);
  }

  render() {
      return (
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}}>

            <View style={{padding:10,width:width-20, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >

              <Text style={[styles.text]}>{'تقوم سياسة الخصوصية في أكاديمية ق على الأهمية القصوى لحفظ وسرية وأمان المعلومات الشخصية للمستخدمين، ويقع نطاق عملنا على جميع ما هو داخل نطاق الأكاديمية (website.com)، دون أي مسؤولية حيال الروابط التي تحيل المستخدم لخارج الأكاديمية، وكما تعلمون أن عملية نقل وتخزين البيانات ليس أمنة تماماً في شبكة الانترنت وعلى الرغم من ذلك فإننا نبذل قصارى جهدنا لحماية المعلومات الشخصية الخاصة بكم.'}</Text>
              <Text style={[styles.text]}>{'قد نقوم بجمع ومعالجة المعلومات التي تقدم عند التسجيل والاستخدام للأكاديمية أو المتجر الإلكتروني أو المكتبة الرقمية وأي من أجزاء ومكونات الأكاديمية، أو من خلال الزيارات المستمرة للأكاديمية كما تشمل تلك المعلومات ما يتعلق بالمعلومات التقنية بكافة أنواعها، كما نقوم بجمع المعلومات التي نتلقاها من مصادر أخرى والتي نقوم بتشغيلها أو الاستفادة منها، ونحن نعمل مع أطراف أخرى ثالثة (على سبيل المثال: الشركاء التجاريين، مزودي الخدمات، منصات الدفع الإلكتروني …إلخ)، ونركز في استخدام المعلومات التي تقدمونها من حيث الاستخدام على التقارير والاحصائيات والتحليلات والتي تهدف لتحسين المنتجات والخدمات وابراز الأكاديمية، بالإضافة إلى مراقبة وكشف سوء الاستخدام، وقياس وفهم وتوجيه الإعلانات، كما أن مسؤولية المستخدم تقع على عاتقة وهو مسؤول عن كلمة السر وبيانات المستخدم التي يقوم باستخدامها داخل الأكاديمية.'}</Text>
              <Text style={[styles.text]}>{'إضافة لما سبق ذكره فقد نشارك المعلومات التي نقوم بجمعها ولا تشكل إمكانية تعرف شخصي على المستخدم مع العموم ومع الغير.'}</Text>
              <Text style={[styles.text]}>{'يستخدم موقع أكاديمية ق ملفات تعريف الارتباط أو ما يسمى بالكوكيز، لتمييزكم عن المستخدمين الآخرين، وهذا يساعدنا على تزويدكم بتجربة جيدة عند قيامكم بتصفح الأكاديمية ويسمح لنا في الوقت ذاته بتحسين الأكاديمية، ومن خلال الاستمرار في تصفح الاكاديمية، فإنكم توافقون على قيامنا باستخدام ملفات تعريف الارتباط أو الكوكيز في التعامل معكم.'}</Text>
              <Text style={[styles.text]}>{'نحن نستخدم خدمة التسويق Google AdWordsللإعلان على شبكة الإنترنت، واستهداف زوار الأكاديمية، وقد تستخدم ملفات تعريف الارتباط لنشر الإعلانات بناء على الزيارات المسبقة للمتصفح، وأي معلومات أو بيانات سوف تستخدم بناء على سياسة الخصوصية المتبعة في الأكاديمية وقوقل، كما يمكنك إلغاء الإعلانات بناء على الاهتمامات من إعدادات ملفات تعريف الارتباط، أو إيقافها بشكل دائم عبر الإضافات الخاصة بالمتصفح المستخدم.'}</Text>
              <Text style={[styles.text]}>{'قد يحتوي الموقع روابط إلى مواقع إلكترونية للغير كمزودي محتوى آخرين وبعض مزودي الخدمات، غير أن هذه المواقع الأخرى ليست تحت إدارتنا وبذلك عليك أن تتفهم وتوافق على أننا لا نتحمل مسؤولية جمع هذه المواقع واستخدامها لمعلوماتك ما لم تتم الإشارة له بغير ذلك في سياسة الخصوصية هذه. نوصيكم بالحرص عندما يتم توجيهكم إلى موقع الغير لتقوموا بمراجعة سياسات الخصوصية لكل موقع تزورونه وتستخدمونه.'}</Text>
              <Text style={[styles.text]}>{'أي تغييرات تطرأ على سياسة الخصوصية الخاصة بالأكاديمية في المستقبل سوف يتم نشرها هنا على هذه الصفحة، ونحن نحتفظ بحقنا في التعديل والتطوير دون إخطار أو موافقة من أطراف أخرى، ونسعد باطلاعكم المستمر على هذه الصفحة.'}</Text>

            </View>

            <View style={{width:width-20, margin: 25}}></View>
        </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    text: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:12,
      fontFamily: 'JFFlat-regular',
    },
    textTitle: {
      fontSize:14,
      paddingBottom: 5,
      color:'#000',
    },
});

module.exports = privacy;
