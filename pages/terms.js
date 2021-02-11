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
class terms extends Component {
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
              <Text style={[styles.text, styles.textTitle]}>{'الشروط والأحكام'}</Text>
              <Text style={[styles.text]}>{'تخضع عملية البيع في متجر أكاديمية ق واستخدامك له وعمليات شرائك واستخدامك للمنتجات المتوفرة في هذا الموقع إلى أحكام وشروط الاستخدام والخدمة.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يجوز لأكاديمية ق أن تختار قبول أو عدم قبول أو إلغاء طلبيتك في بعض الحالات وعلى سبيل المثال إن كان المنتج الذي ترغب بشرائه غير متوفر أو في حال تم تسعير المنتج بطريقة خاطئة أو في حال تبين إن الطلبية احتيالية، وسوف نقوم بإعادة ما قمت بدفعه للطلبيات التي لم يتم قبولها أو التي يتم إلغاؤها.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'عند الشراء أو إرسال بريد الإلكتروني إلى متجر أكاديمية ق، أنت توافق على استلام أي رسائل إلكترونية من المتجر.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يحق لأكاديمية ق أن تجري أي تعديلات أو تغييرات على كافة المنصات والمواقع الخاصة بها، كما يحق لها إجراء تعديلات على كافة سياساتها واتفاقياتها بما في ذلك سياسة الخصوصية.'}</Text>
            </View>

            <View style={{padding:10,width:width-20, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text style={[styles.text, styles.textTitle]}>{'التبديل والإرجاع'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يتم الاستبدال أو الاسترجاع، شرط أن تكون السلعة بحالتها عند الاستلام.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'في حال تم فتح المنتج واستخدامه فإننا نعتذر عن عدم إمكانية القيام بالاسترجاع أو التبديل.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'في حال تم استلام منتج غير مطابق لطلبك فإنه بإمكانك إعادة أو استبدال المنتج بشرط أن يكون بنفس حالته وتغليفه الذي استلمته به وإرساله إلينا مجدداً، وبعد استلام المنتج سنقوم فوراً بالبدء بإجراءات إعادة كافة المبالغ المالية التي دفعتها أو استبدال المنتج المرسل خطاءً بالمنتج المطلوب وبعد التأكد من عدم استخدام المنتج.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يتم الاستبدال او الاسترجاع خلال 3 أيام فقط من تاريخ الشراء .'}</Text>
            </View>

            <View style={{padding:10,width:width-20, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text style={[styles.text, styles.textTitle]}>{'إلغاء الطلب :'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يمكن إلغاء الطلب مجاناً في حال لم يتم الشحن.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'في حال تم شحن المنتج يتم إرجاع مبلغ الشراء مع خصم قيمة الشحن.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'في حال لم يتم إكمال عملية الدفع خلال 3 أيام سيتم إلغاء الطلب.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'مدة استرجاع المبلغ لحساب العميل تتفاوت من 7 – 21 يوم عمل.'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يتم إرجاع المبلغ المستلم نقداً من العميل عن طريق الحوالة البنكية إلى حساب العميل.'}</Text>
            </View>

            <View style={{padding:10,width:width-20, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text style={[styles.text, styles.textTitle]}>{'الشحن والتوصيل'}</Text>
              <Text style={[styles.text]}>{' ● '}{'يتم الشحن والتوصيل لجميع المدن داخل المملكة العربية السعودية، وتقدر تكلفة التوصيل بـ 7$، خلال 3-4 أيام عمل.'}</Text>
              <Text style={[styles.text]}>{' ● '}{' يتم الشحن والتوصيل لدول الخليج، وتقدر تكلفة التوصيل بـ 26$، خلال 5-7 أيام عمل.'}</Text>
              <Text style={[styles.text]}>{' ● '}{' يتم الشحن والتوصيل للدول العربية، وتقدر تكلفة التوصيل 33$، خلال 5-7 أيام عمل.'}</Text>
              <Text style={[styles.text]}>{' ● '}{' يتم الشحن والتوصيل لبقية دول العالم، وتقدر تكلفة التوصيل 40$، خلال 5-7 أيام عمل.'}</Text>
            </View>

            <View style={{padding:10,width:width-20, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text style={[styles.text]}>{'في حال تعذر التوصيل إلى مكانكم، فسنضطر آسفين إلى إبلاغكم بضرورة التوجه لمكتب شركة الشحن لاستلام طلباتكم، وفي حال الرغبة في التأكد من أن منطقتكم مشمولة بخدمات التوصيل، نرجوا التكرم بمراسلتنا عبر البريد الإلكتروني التالي: store@website.com'}</Text>
              <Text style={[styles.text]}>{'يتم الشحن داخل السعودية عبر شركة فيتشر ويمكن تعقب الارساليات من خلال الرابط التالي ( اضغط هنا)، ويتم شحن الارساليات خارج السعودية عبر البريد السعودي (خليجي اكسبرس + البريد الممتاز) ويمكن تعقب الارساليات من خلال الرابط التالي ( اضغط هنا).'}</Text>
              <Text style={[styles.text]}>{'طرق الدفع المتاحة هي: الدفع عبر البطاقات الائتمانية (فيزا، ماستركارد)، الدفع بواسطة باي بال، الدفع نقداً عند الاستلام للطلبات داخل السعودية فقط.'}</Text>
              <Text style={[styles.text]}>{'للمزيد من المساعدة نسعد بتواصلكم مع خدمة عملاء المتجر الإلكتروني store@website.com'}</Text>
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

module.exports = terms;
