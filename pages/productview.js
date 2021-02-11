import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Linking,
  I18nManager,
  TextInput,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Share, {ShareSheet, Button} from 'react-native-share';
import Modal from 'react-native-modal';

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
class productview extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: '',
      comments: [],
      isLoading: true,
      isloved: false,
      isstartted: false,
      onethemessage: '',
      isModalVisible: false,
      senddingcomment: false,
    }
    self = this;
  }

  addToCart(id){
    if(this.props.store.userName !== 'null'){
        this.props.store.addProductToCart(id);
        var count = this.props.store.getCart().length;
        Alert.alert(
          'نجاح',
          'تم إصافة المنتج للسلة  \n'+'يوجد لديك '+count+' منتجات في السلة ',
          [
            {text: 'إرسال الطلب ', onPress: () => Actions.cart()},
            {text: 'الاستمرار في التسوق'},
          ]
        );
    }else{
      Alert.alert(
        'عفوا',
        'الرجاء تسجيل الدخول اولا',
        [{text: 'حسنا' }]
      );
    }
  }

  sendcomment(){
    if(this.props.store.userName !== 'null'){
      var comet = this.state.onethemessage;
      var id = this.state.content.id;
      var name = this.props.store.name;
      var author = this.props.store.id;

      if(comet.length > 1){
        self.setState({ senddingcomment: true, })
        var id = self.props.id;
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            self.setState({ senddingcomment: true, });
            Alert.alert(
              'نجاح',
              'تم إرسال التعليق , شكرا لك ',
              [{text: 'حسنا', onPress: () => self.setState({ senddingcomment: false, isModalVisible: false, }) }]
            );
          }
        });
        xhr.open("GET", "https://website.com/ajax.php?service=add_comment&id="+id+"&author="+author+"&name="+name+"&content="+comet);
        xhr.send(data);
      }else{
        Alert.alert(
          'عفوا',
          'الرجاء كتابة التعليق',
          [{text: 'حسنا' }]
        );
      }
    }else{
      Alert.alert(
        'عفوا',
        'الرجاء تسجيل الدخول اولا',
        [{text: 'حسنا' }]
      );
    }
  }

  star(){
    if(this.state.isstartted){
      self.setState({
        isstartted: false,
      });
    }else{
      self.setState({
        isstartted: true,
      });
    }
  }

  comment(){
    this.setState({
      isModalVisible: true
    });
  }

  love(){
    if(this.state.isloved){
      self.setState({
        isloved: false,
      });
    }else{
      self.setState({
        isloved: true,
      });
    }
  }

  componentWillMount(){
    self.getBlogdetails();
    I18nManager.forceRTL(true);
  }

  _showModal = () => this.setState({ isModalVisible: true });

  render() {

    let shareOption = {
      title: this.state.content.title,
      message: this.state.content.content,
      url: this.state.content.link,
    };

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
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}} contentContainerStyle={{ flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>

            <Image
              source={{uri:this.state.content.image}}
              style={{width:width-20,height:280, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor: '#ddd', borderWidth:5, borderColor:'#FFFFFF'}}
            />

            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, minHeight: 45, marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={[styles.text,{lineHeight:25}]}
              >
                {this.state.content.title}
              </Text>
            </View>

            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, height: 40, marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {'التصنيف : '}{' '}{' ( '}{this.state.content.terms}{' ) '}
              </Text>
            </View>

            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, height: 50, marginBottom: 1, flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'#FFFFFF'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.avatarName,{color:'#6c9b58',fontSize:17,width:width/2-20,textAlign:'left'}]}
              >
                {' السعر '}{' : '}{this.state.content.price}{' $ '}
              </Text>
              <TouchableOpacity
                onPress={()=>this.addToCart(this.state.content.id)}
                style={{borderColor:'#fcab00',borderWidth:1,borderRadius:4,width:width/2-10,height:42,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.avatarName,{color:'#fcab00',fontSize:15,textAlign:'center'}]}
                >
                  {'إضف للسلة '}
                </Text>
              </TouchableOpacity>
            </View>


            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, height: 40, marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {'اسم المؤلف : '}{' '}{this.state.content.author_name}
              </Text>
            </View>
            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, height: 40, marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {'عدد الصفحات : '}{' '}{this.state.content.book_page}
              </Text>
            </View>
            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, height: 40, marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {'سنة النشر : '}{' '}{this.state.content.book_year}
              </Text>
            </View>
            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, height: 40, marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {'دار النشر : '}{' '}{this.state.content.book_homme}
              </Text>
            </View>


            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width-20, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
              <Text
                style={styles.text}
              >
                {this.state.content.content}
              </Text>
            </View>

              <View style={{padding:10,width:width-20, height: 50, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'space-around'}} >

                {(this.state.isloved) &&
                  <TouchableOpacity
                    onPress={()=>this.love()}
                    style={{flexDirection:'row',alignItems:'center', justifyContent:'center',width:40, height: 40}} >
                      <Icon name="heart" size={22} color="#f55000" style={{}} />
                  </TouchableOpacity>
                }

                {(!this.state.isloved) &&
                  <TouchableOpacity
                    onPress={()=>this.love()}
                    style={{flexDirection:'row',alignItems:'center', justifyContent:'center',width:40, height: 40}} >
                      <Icon name="heart" size={22} color="#b0bec5" style={{}} />
                  </TouchableOpacity>
                }

                <TouchableOpacity
                  onPress={this._showModal}
                  style={{flexDirection:'row',alignItems:'center', justifyContent:'center',width:40, height: 40}} >
                    <Iconm name="comment-text" size={22} color="#b0bec5" style={{}} />
                </TouchableOpacity>

                {(this.state.isstartted) &&
                  <TouchableOpacity
                    onPress={()=>this.star()}
                    style={{flexDirection:'row',alignItems:'center', justifyContent:'center',width:40, height: 40}} >
                      <Icon name="star" size={22} color="#faaa0d" style={{}} />
                  </TouchableOpacity>
                }

                {(!this.state.isstartted) &&
                  <TouchableOpacity
                    onPress={()=>this.star()}
                    style={{flexDirection:'row',alignItems:'center', justifyContent:'center',width:40, height: 40}} >
                      <Icon name="star" size={22} color="#b0bec5" style={{}} />
                  </TouchableOpacity>
                }

                <TouchableOpacity
                  onPress={()=> Share.open(shareOption)}
                  style={{flexDirection:'row',alignItems:'center', justifyContent:'center',width:40, height: 40}} >
                    <Icon name="share-alt" size={22} color="#b0bec5" style={{}} />
                </TouchableOpacity>

              </View>

              {self.state.comments.map((coment, i) => {
                  return (
                    <View key={'coment'+i} style={{padding:10,width:width-20, marginBottom: 10, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
                      <Image style={{position:'absolute', left:15, top: 20, width:46,height:46, borderRadius: 23}} source={require('../images/avatar.jpeg')} />
                      <Text style={[styles.text, styles.textTitle]}>{coment.comment_author}</Text>
                      <Text style={[styles.text]}>{coment.comment_content}</Text>
                    </View>
                  );
              })}

            <View style={{width:width-60, margin: 25}}></View>

            <Modal isVisible={this.state.isModalVisible} style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
              <View style={{width:width-100, height:width-100 ,backgroundColor:'#FFFFFF',borderRadius: 20,flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}} >
                <Text style={[styles.textsbtm,{color:'#333',backgroundColor:'transparent',width:width-100, height:60, paddingTop: 10}]} >
                  {'كتابة تعليق'}
                </Text>
                <TouchableOpacity
                  style={{position:'absolute', top:8, left: 8}}
                  onPress={()=>self.setState({ isModalVisible: false })}
                  >
                  <Ionicons name="md-close-circle" size={22} color="#faaa0d" style={{position:'absolute', top:0, left: 8}} />
                </TouchableOpacity>

                <TextInput
                  style={styles.menubtInputArea}
                  onChangeText={(text) => self.setState({onethemessage: text})}
                  value={self.state.onethemessage}
                  placeholder={'اكتب تعليقك هنا'}
                  placeholderTextColor={'#333'}
                  returnKeyType = {"done"}
                  autoFocus = {false}
                  multiline = {true}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  underlineColorAndroid='transparent'
                />

                {(this.state.senddingcomment) &&
                  <ActivityIndicator size="large" color="#731872" style={{marginTop: 15}} />
                }

                {(!this.state.senddingcomment) &&
                  <TouchableOpacity
                    style={styles.sendbtn}
                    onPress={()=>self.sendcomment()}
                    >
                    <Text style={styles.textsbtm} >
                      {'إرسال التعليق'}
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </Modal>
        </ScrollView>
    </View>
    )
  }
  }

  getBlogdetails(){
    var id = self.props.id;
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var content = JSON.parse(this.response);
        console.log(content);
        Actions.refresh({title: content.title})
        self.setState({
            isLoading: false,
            content: content,
        });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_productview_page&lang=ar&id="+id);
    xhr.send(data);
  }
}

const htmlstyles = StyleSheet.create({
    h4: {
      textAlign:'right',
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:13,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    p: {
      textAlign:'right',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:11,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    image: {
      maxWidth: width-20,
      padding: 0,
      margin:0,
    },
    div: {
      maxWidth: width-20,
      padding: 0,
      margin:0,
    },

});

const styles = StyleSheet.create({
    text: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 24,
      color:'#333',
      fontSize:13,
      fontFamily: 'JFFlat-regular',
    },
    menubtInputArea : {
      height: 140,
      width: width-140,
      borderColor: '#ddd',
      borderRadius: 20,
      borderWidth: 1,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      paddingHorizontal: 20,
      paddingTop: 10,
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      backgroundColor: '#FFFFFF',
    },
    textTitle: {
      fontSize:14,
      paddingBottom: 5,
      color:'#000',
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
    avatarName: {
      color:'#333',
      paddingHorizontal:5,
      paddingTop:9,
      height: 40,
      textAlign:'left',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
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

module.exports = productview;
