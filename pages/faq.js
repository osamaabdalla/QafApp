import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  I18nManager,
  TextInput,
  Alert,
  Platform,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import Iconi from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
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
class faq extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      sections: [
        {title: 'من أنتم', content: 1, icon: 'question-circle-o'},
        {title: 'التسجيل',content: 2, icon: 'sign-in'},
        {title: 'الإعدادات',content: 3, icon: 'cogs'},
        {title: 'الشهادات',content: 4, icon: 'certificate'},
        {title: 'الأوسمة',content: 5, icon: 'tags'},
        {title: 'المواد',content: 6, icon: 'graduation-cap'},
        {title: 'المتجر',content: 7, icon: 'shopping-basket'},
        {title: 'المكتبة',content: 8, icon: 'book'},
        {title: 'المدونة',content: 9, icon: 'rss'},
        {title: 'الروزنامة',content: 10, icon: 'calendar'},
        {title: 'المشاركة',content: 11, icon: 'slideshare'},
      ],
    }
    self = this;
  }

  componentWillMount(){
    setTimeout(function () {
      I18nManager.forceRTL(true);
    }, 500);
  }

  _renderHeader(section, index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="borderBottomColor"
        style={{ backgroundColor: '#f8f8f8', paddingLeft: 15, borderBottomColor: (isActive ? '#f0f0f0' : '#f0f0f0'), borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
          <Iconi name={section.icon} size={22} color="#666" style={styles.closeMenubtn} />
          <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
        <Animatable.View
          duration={300}
          easing="ease-out"
          style={{ backgroundColor: '#FFFFFF' , padding: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}
          animation={isActive ? 'zoomIn' : false}
          >
          {(section.content == 1) &&
            <View style={styles.faq} >
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'ماهي أكاديمية ق؟'}</Text>
                  <Text style={styles.texts}>{'أكاديمية إلكترونية متخصصة بمجالات الإعلام، وتسويق المنتجات والخدمات الواعدة، وإطلاق المشاريع الجديدة …'}</Text>
                </View>

                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'ماهي مجالات الأكاديمية؟'}</Text>
                  <Text style={styles.texts}>{'تختص أكاديمية ق بكل ما هو متعلق بالإعلام في شتى مجالاته وتخصصاته.'}</Text>
                </View>

                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'من هم مقدموا المواد المعرفية؟'}</Text>
                  <Text style={styles.texts}>{'مقدموا المواد المعرفية في أكاديمية ق مجموعة من المختصين والممارسين لمجالات الإعلام تم اختيارهم بعناية'}</Text>
                </View>

                  <View style={[styles.textscont,{borderBottomWidth:0}]} >
                    <Text style={[styles.texts,{color: '#000000'}]}>{'مالذي يميز أكاديمية ق؟'}</Text>
                  <Text style={styles.texts}>{'كونها تجمع المواد المعرفية ومتجر متخصص بالمنتجات الإعلامية وروزنامة للأحداث الإعلامية بالإضافة إلى مكتبة رقمية، وأكثر من ذلك سيتم إتاحته في الأيام القادمة بإذن الله.'}</Text>
                </View>
            </View>
          }

          {(section.content == 2) &&
            <View style={styles.faq} >
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'كيف يمكنني التسجيل؟'}</Text>
                  <Text style={styles.texts}>{'تستطيع التسجيل بكل سهولة ويسر عن طريق الضغط على زر تسجيل الدخول في أعلى الصفحة الرئيسية ثم إنشاء حساب.'}</Text>
                </View>
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'كيف أفعل حسابي؟'}</Text>
                  <Text style={styles.texts}>{'بعد التسجيل سوف تجد رسالة التفعيل في بريدك الوارد وإن لم تجدها فتفقد الرسائل في البريد غير الهام.'}</Text>
                </View>
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'نسيت كلمة السر ؟'}</Text>
                  <Text style={styles.texts}>{'يمكنك استعادة أو تغيير كلمة المرور، عن طريق الضغط على زر (نسيت كلمة السر؟) في صفحة تسجيل الدخول.'}</Text>
                </View>
                  <View style={[styles.textscont,{borderBottomWidth:0}]} >
                    <Text style={[styles.texts,{color: '#000000'}]}>{'أرغب بتغيير البريد الإلكتروني ؟'}</Text>
                  <Text style={styles.texts}>{'من خلال الدخول لصفحتك الشخصية ثم الدخول على الإعدادت وإدخال كلمة المرور ثم إدخال البريد الإلكتروني الجديد.'}</Text>
                </View>
            </View>
          }

          {(section.content == 3) &&
            <View style={styles.faq} >
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'أين أجد قائمة المواد المعرفية الخاصة بي؟'}</Text>
                  <Text style={styles.texts}>{'تجد جميع المواد المعرفية الخاصة بك والتي سبق لك حضورها أو التسجيل فيها، من خلال الذهاب إلى صفحتك الشخصية ومن ثم النقر على أيقونة المواد المعرفية.'}</Text>
                </View>
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'كيف أخفي أو أظهر معلوماتي الشخصية؟'}</Text>
                  <Text style={styles.texts}>{'بإمكانك إخفاء أو إظهار معلوماتك الشخصية عبر زيارة الصفحة الشخصية الخاصة بك من أيقونة الإعدادات ثم أيقونة ظهور الحساب والتحكم في تفاصيل الظهور والإخفاء.'}</Text>
                </View>
                <View style={styles.textscont} >
                  <Text style={[styles.texts,{color: '#000000'}]}>{'أرغب بإيقاف تنبيهات البريد الإلكتروني'}</Text>
                  <Text style={styles.texts}>{'من خلال زيارة صفحة الإعدادات الخاصة بك ومن ثم التحكم في نوع الرسائل البريدية التي ترغب في تلقيها.'}</Text>
                </View>
                  <View style={[styles.textscont,{borderBottomWidth:0}]} >
                    <Text style={[styles.texts,{color: '#000000'}]}>{'أرغب باسم مستخدم واسم آخر للشهادة'}</Text>
                  <Text style={styles.texts}>{'تستطيع استخدام اسمك الشخصي ثلاثياً أو رباعياً كما تريد في شهادات المواد المعرفية، واستخدام اسم قصير مثلاً في تصفح الموقع والظهور للمستخدمين من خلال صفحة الإعدادات الخاصة بحسابك.'}</Text>
                </View>
            </View>
          }

          {(section.content == 4) &&
            <View style={styles.faq} >
                          <View style={styles.textscont} >
                            <Text style={[styles.texts,{color: '#000000'}]}>
              هل الشهادات مجانية؟</Text>
                <Text style={styles.texts}>

المواد المعرفية والشهادات الخاصة بها مجانية ولا نقوم بتحصيل أي مبالغ أو رسوم عليها.</Text>

</View>
              <View style={styles.textscont} >
                <Text style={[styles.texts,{color: '#000000'}]}>
أين أجد شهاداتي؟</Text>
  <Text style={styles.texts}>

بعد تجاوزك للمادة المعرفية سوف تجد شهادة إتمام المادة في ملفك الشخصي.
</Text>
</View>
              <View style={styles.textscont} >
                <Text style={[styles.texts,{color: '#000000'}]}>
لا استطيع تحميل الشهادة؟</Text>
  <Text style={styles.texts}>

نسعد بتواصل مع الدعم الفني مباشرة عبر صفحة تواصل (https://website.com/contact-us)
</Text>
</View>
  <View style={[styles.textscont,{borderBottomWidth:0}]} >
    <Text style={[styles.texts,{color: '#000000'}]}>
هل شهادات المواد المعرفية معتمدة؟</Text>
  <Text style={styles.texts}>

الشهادات معتمدة من قبل أكاديمية ق، وهي غير غير معتمدة عند أي جهات آخرى، ونحن نسعى إلى إيجاد شراكات في المستقبل القريب.</Text>
</View>

            </View>
          }

          {(section.content == 5) &&
            <View style={styles.faq} >
            <View style={styles.textscont} >
              <Text style={[styles.texts,{color: '#000000'}]}>ماهو الوسام؟</Text>

            <Text style={styles.texts}>  صورة إلكترونية ذهبية اللون تظهر في صفحة الطالب، ويستطيع أعضاء الأكاديمية الاطلاع على أوسمة الطلاب الآخرين، وهو وسام يرمز إلى تميز الطالب في مادة معرفية معينة.</Text>
            </View>
              <View style={styles.textscont} >
                <Text style={[styles.texts,{color: '#000000'}]}>كيف أحصل على الوسام؟</Text>

              <Text style={styles.texts}>عند تجاوز المادة المعرفية والحصول على معدل لا يقل عن %90 في الاختبار النهائي، بالإضافة إلى معايير تقييم أخرى مثل: المشاركة الفاعلة في المادة والنقاشات والواجبات والتكاليف.</Text>
            </View>
                            <View style={styles.textscont} >
                              <Text style={[styles.texts,{color: '#000000'}]}>  هل بالإمكان طباعة الوسام أو تحميله؟</Text>

              <Text style={styles.texts}>الوسام صورة إلكترونية للحساب الشخصي بالموقع، تظهر للمستخدمين وهو ليس كالشهادة الخاصة بإتمام المواد المعرفية، فبالتالي لا يمكن طباعته أو تحميله أو الحصول على افادة مكتوبة بشأنه.</Text>
            </View>

            <View style={[styles.textscont,{borderBottomWidth:0}]} >
              <Text style={[styles.texts,{color: '#000000'}]}>  في ماذا يفيدني الوسام؟</Text>

            <Text style={styles.texts}>  سوف تظهر الفائدة من الوسام خلال الأشهر القادمة بعد إطلاق النسخة الكاملة من الأكاديمية، وسوف تعطي دلالة لدى الآخرين على تميز الحائز على الأوسمة.</Text>
            </View>
            </View>
          }


          {(section.content == 6) &&
            <View style={styles.faq} ><View style={styles.textscont} >
              <Text style={[styles.texts,{color: '#000000'}]}>
              كم هي تكلفة الدراسة للمواد المعرفية؟</Text>
              <Text style={styles.texts}>
جميع المواد المعرفية في أكاديمية ق هي بدون أي رسوم مالية وهي متاحة مجاناً للجميع.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كيف أنضم للمواد المعرفية؟</Text>
<Text style={styles.texts}>
من خلال صفحة المواد المعرفية يتم اختيار المادة المعرفية المراد الانضمام لها ثم الانضمام للمادة.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
عدد المواد التي يمكن دراستها في آن واحد</Text>
<Text style={styles.texts}>
لا يوجد عدد أدنى أو أقصى لعدد المواد التي يمكنك دراستها، بل يعتمد ذلك على قدراتك وإمكانياتك ورغباتك.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كيف أتصفح جميع المواد المعرفية؟</Text>
<Text style={styles.texts}>
يمكنك تصفح المواد المعرفية من خلال الضغط على زر المواد المعرفية في أعلى الصفحة.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
هل بالإمكان دراسة مادة انتهى تاريخها؟</Text>
<Text style={styles.texts}>
نعم يمكنك الانضمام إلى أي مادة معرفية ودراستها، حتى إذا انتهى تاريخ المادة المعرفية فعلياً، ولكن لن نستطيع الحصول على شهادة إتمام حضور للمادة.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
الانسحاب من دراسة مادة معرفية</Text>
<Text style={styles.texts}>
يمكنك الانسحاب من أي مادة معرفية في أي وقت، في حال عدم الرغبة في إتمام دراسة المادة.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
الانضمام لمادة بدأ فعلاً تاريخ الدراسة فيها</Text>
<Text style={styles.texts}>
يمكنك الانضمام إلى أي مادة معرفية حتى إذا بدأت المادة المعرفية فعلياً.</Text>
</View>
  <View style={[styles.textscont,{borderBottomWidth:0}]} >
    <Text style={[styles.texts,{color: '#000000'}]}>
متى أحصل على شهادة إتمام المادة؟</Text>
<Text style={styles.texts}>
عند إتمام دراسة المادة المعرفية في الفترة المحددة واجتياز الاختبار النهائي والحصول على درجة لا تقل عن %60.</Text>
</View>
            </View>
          }
          {(section.content == 7) &&
            <View style={styles.faq} ><View style={styles.textscont} >
              <Text style={[styles.texts,{color: '#000000'}]}>
              ماهي المنتجات التي يوفرها المتجر؟</Text>
              <Text style={styles.texts}>
متجر أكاديمية ق هو متجر متخصص في بيع المنتجات ذات العلاقة بالإعلام، وقد بدأ بالكتب الإعلامية وسوف يتوسع خلال الأيام القادمة بإذن الله على مزيد من الأصناف الأخرى.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
ماهي طرق الدفع المتاحة؟</Text>
<Text style={styles.texts}>
تستطيع الدفع عبر بطاقة الائتمان أو بطاقة السحب الآلي التي تدعم الشراء عبر الإنترنت، كما يمكنك الدفع عند الإستلام في حال كنت داخل حدود المملكة العربية السعودية.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كيف يتم الشحن والتوصيل؟</Text>
<Text style={styles.texts}>
نقوم بشحن البضائع إلى أي مكان، عبر شركة فيتشر للطلبات التي تقع داخل السعودية، وعبر البريد السعودي الممتاز للطلبات خارج السعودية.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
ماهي شروط التبديل أو الإسترجاع؟</Text>
<Text style={styles.texts}>
تخضع عملية البيع والشراء والتبديل أو الإسترجاع للمنتجات المتوفرة في المتجر إلى مجموعة من الأحكام والشروط، وهي مفصلة عبر الرابط التالي: (website.com/terms).
</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كم تبلغ تكلفة الشحن والتوصيل؟</Text>
<Text style={styles.texts}>
‘داخل السعودية: 7$. دول الخليج: 26$. بقية الدول العربية: 33$. بقية دول العالم: 40$.
</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كم تستغرق مدة الشحن والتوصيل؟</Text>
<Text style={styles.texts}>
‘ داخل السعودية: من 3-4 أيام عمل. خارج السعودية: من 5-7 أيام عمل.
</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كيف أتابع الطلب بعد عملية الشحن؟</Text>
<Text style={styles.texts}>
عبر الموقع الإلكتروني لشركة فيتشر للطلبات داخل السعودية، وعبر موقع البريد السعودي الممتاز للطلبات خارج السعودية.
</Text>
</View>
  <View style={[styles.textscont,{borderBottomWidth:0}]} >
    <Text style={[styles.texts,{color: '#000000'}]}>
كيف انضم كمورد للمتجر؟</Text>
<Text style={styles.texts}>
نسعد بالتواصل من خلال ارسال التفاصيل التالية: (المنتجات، الأسعار، الصور، رابط الموقع الإلكتروني أو المتجر عبر انستقرام، وسيلة التواصل المتاحة) للبريد الإلكتروني store@website.com</Text>
</View>
            </View>
          }
          {(section.content == 8) &&
            <View style={styles.faq} ><View style={styles.textscont} >
              <Text style={[styles.texts,{color: '#000000'}]}>
              ماهي المكتبة الرقمية ؟</Text>
              <Text style={styles.texts}>
هي مكتبة تقوم فكرتها على حصر الكتب والمؤلفات الإعلامية في شتى المجالات، وإتاحتها كمرجع معرفي لأعضاء وزوار الأكاديمية، في مكان واحد.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
كيف أستخدم المكتبة الرقمية ؟</Text>
<Text style={styles.texts}>
من خلال اختيار العنوان المناسب ومن ثم سوف يتم تحويلك إلى مصدر الكتاب.</Text>
</View>
<View style={styles.textscont} >
  <Text style={[styles.texts,{color: '#000000'}]}>
لماذا يتم تحويلي إلى موقع آخر خارج الأكاديمية؟</Text>
<Text style={styles.texts}>
نظراً لأن الكتب هي ملك خاص لجهات أو أفراد ولا يحق لنا أخذها ورفعها في سيرفرات الأكاديمية، لذا تقوم فكرة المكتبة الرقمية على حصر الكتب وتسهيل الوصول إليها والبحث عنها.</Text>
</View>
  <View style={[styles.textscont,{borderBottomWidth:0}]} >
    <Text style={[styles.texts,{color: '#000000'}]}>
هل هناك رسوم لاستخدام المكتبة الرقمية؟</Text>
<Text style={styles.texts}>
جميع الكتب المتاحة عبر المكتبة الرقمية هي كتب إلكترونية مجانية، يمكن الاستفادة منها دون أي مقابل مالي أو رسوم.</Text>
</View>
            </View>
          }
          {(section.content == 9) &&
            <View style={styles.faq} ><View style={styles.textscont} >
              <Text style={[styles.texts,{color: '#000000'}]}>
              ماهي المدونة؟</Text>
              <Text style={styles.texts}>
          مساحة يتم النشر فيها بكل ما يتعلق بالأكاديمية من مقالات وأخبار وأحداث متنوعة ومتجددة.</Text>
        </View>
          <View style={[styles.textscont,{borderBottomWidth:0}]} >
            <Text style={[styles.texts,{color: '#000000'}]}>
          هل استطيع كتابة تدوينة؟</Text>
          <Text style={styles.texts}>
          نعم تستطيع كتابة تدوينة عبر الضغط على المدونة ثم على مربع شارك بتدوينه، وسوف يتم مراجعة التدوينة من قبل إدارة الأكاديمية ومن ثم نشرها.</Text>
        </View>
            </View>
          }
          {(section.content == 10) &&
            <View style={styles.faq} ><View style={styles.textscont} >
              <Text style={[styles.texts,{color: '#000000'}]}>
              ماهي روزنامة الإعلام؟</Text>
              <Text style={styles.texts}>
      تقويم إلكتروني يهدف إلى حصر الأحداث ذات العلاقة بالإعلام وتسويقها، وتسهيل الحصول على المعلومات حولها، وتحقيق المزيد من التكامل في الأحداث الإعلامية من حيث المواعيد.</Text>
    </View>
      <View style={styles.textscont} >
        <Text style={[styles.texts,{color: '#000000'}]}>
      كيف أشارك بنشر حدث في الروزنامة؟</Text>
      <Text style={styles.texts}>
      تستطيع نشر أي حدث بكل بساطة من خلال الدخول على تبويب الروزنامة بالصفحة الرئيسية، ومن ثم الضغط على زر اضافة حدث جديد، ومن ثم ادخال تفاصيل الحدث الإعلامي.</Text>
    </View>
      <View style={styles.textscont} >
        <Text style={[styles.texts,{color: '#000000'}]}>
      ماهي محددات النشر في الروزنامة؟</Text>
      <Text style={styles.texts}>
      ارتباط الحدث بالإعلام، مثل: (دورة، ملتقى، مهرجان، منتدى، ورشة عمل …إلخ). لغة الحدث الإعلامي بالعربية.</Text>
    </View>
      <View style={[styles.textscont,{borderBottomWidth:0}]} >
        <Text style={[styles.texts,{color: '#000000'}]}>
      كم يستغرق قبول الحدث وإدراجه بالروزنامة؟</Text>
      <Text style={styles.texts}>
      يتم مراجعة الأحداث الإعلامية المضافة من قبل الأعضاء المسجلين بالأكاديمية دون الزوار، والتأكد من اكتمال المعلومات والتفاصيل ونشرها في الموقع خلال 24 ساعة كحد أقصى.</Text>
    </View>
            </View>
          }
          {(section.content == 11) &&
            <View style={styles.faq} >
              <View style={styles.textscont} >
                <Text style={[styles.texts,{color: '#000000'}]}>
              كيف أقدم مادة معرفية؟</Text>
              <Text style={styles.texts}>
        نسعد بك في أكاديمية ق بالانضمام كمقدم لمادة معرفية عن طريق الضغط على زر شارك في أعلى الصفحة الرئيسية وتعبئة البيانات في أيقونة شارك كمدرب، وسوف نقوم بالتواصل معك فوراً.</Text>
      </View>
        <View style={styles.textscont} >
          <Text style={[styles.texts,{color: '#000000'}]}>
        هل استطيع اقتراح مواد معرفية؟</Text>
        <Text style={styles.texts}>
        بالإمكان المساهمة باقتراح مواد معرفية في مجالات الإعلام وسوف نعمل جاهدين على تلبية الرغبات التي ترد من قبل أعضاء الأكاديمية بإذن الله.</Text>
      </View>
        <View style={styles.textscont} >
          <Text style={[styles.texts,{color: '#000000'}]}>
        هل استطيع اقتراح مقدم مواد معرفية؟</Text>
        <Text style={styles.texts}>
        بالإمكان المساهمة باقتراح مقدم للمواد المعرفية أو ممارس متميز في مجالات الإعلام وسوف نعمل جاهدين على التواصل معه والبحث عن سبل التعاون والتكامل.</Text>
      </View>
        <View style={[styles.textscont,{borderBottomWidth:0}]} >
          <Text style={[styles.texts,{color: '#000000'}]}>
        كيف أتطوع بموهبتي أو مهنتي ؟</Text>
        <Text style={styles.texts}>
        نرحب بك عن طريق الضغط على زر شارك في أعلى الصفحة الرئيسية وتعبئة البيانات في أيقونة شارك كمتطوع، وسوف نقوم بالتواصل معك في أسرع وقت ممكن بالفرص التطوعية التي تتناسب معك.</Text>
      </View>
            </View>
          }

      </Animatable.View>
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
      <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
      <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{margin:0,padding:10, backgroundColor:'#eceff1'}} >
        <Accordion
          sections={self.state.sections}
          renderHeader={self._renderHeader}
          renderContent={self._renderContent}
        />
        <View style={{height:50,width:width}} ></View>
      </KeyboardAwareScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  texts :{
    textAlign:'left',
    color: '#777',
    padding: 0,
    fontFamily: 'JFFlat-regular' ,
    paddingTop:0,
    lineHeight:25,
    paddingHorizontal:10,
    fontSize:13
  },
  textscont :{
    width: width-20,
    borderBottomWidth:1,
    borderBottomColor:'#faaa0f',
    paddingBottom:5,
    paddingTop:7,
  },

  textsbtm :{
    textAlign:'center',
    color: '#fff',
    padding: 5,
    paddingTop:0,
    fontFamily: 'JFFlat-regular' ,
    lineHeight:20,
    fontSize:15
  },

  menubtInput : {
    height: 40,
    width: width-62,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 15,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
  },
  menubtInputArea : {
    height: 140,
    width: width-62,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 20,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    backgroundColor: '#FFFFFF',
  },
  headerText:{
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize:14,
    fontFamily: 'JFFlat-regular',
    color:'#666'
  },
  closeMenubtn: {
  },
  faq:{
    width: width-20,
    minHeight: 40,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    paddingBottom: 8,
  },
  sendbtn :{
    width:140,
    height:40,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 18,
    borderWidth: 0,
    marginTop: 15,
    backgroundColor: '#faaa0e',
  }

});

module.exports = faq;
