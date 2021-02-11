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
  WebView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Share, {ShareSheet, Button} from 'react-native-share';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

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
class subjectview extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: '',
      comments: [],
      starCount: 0,
      isLoading: true,
      isloved: false,
      isstartted: false,
      loadDone: false,
      onethemessage: '',
      isModalVisible: false,
      registered: false,
      senddingcomment: false,
    }
    self = this;
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

  startstudysubject(){
    if(this.state.content.started){
      console.log("started : ", this.state.content.started);
      Actions.startstudysubject({id:this.state.content.id});
    }else{
      Alert.alert(
        'عفوا',
        this.state.content.note,
        [{text: 'حسنا' }]
      );
    }
  }

  registerinsubject(){
    if(this.props.store.userName !== 'null'){
      self.setState({ isLoading: true });

      var obCourseId = this.state.content.id;
      var userId = this.props.store.id;

      var data = new FormData();
      data.append("obCourseId", obCourseId);
      data.append("userId", userId);

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          self.setState({
            isLoading: false,
            registered: true,
          });
          setTimeout(function () {
            Alert.alert(
              'نجاح',
              'تم تسجيلك في المادة بنجاح',
              [{text: 'حسنا', onPress: () => Actions.refresh() }]
            );
          }, 100);
        }
      });
      xhr.open("POST", "https://website.com/ajax.php?service=register_in_a_course");
      xhr.send(data);
    }else{
      self.setState({ isLoading: false });
      setTimeout(function () {
        Alert.alert(
          'عفوا',
          'الرجاء تسجيل الدخول اولا',
          [{text: 'تسجيل الدخول ', onPress: () => Actions.login() }, {text: 'لاحقا' }]
        );
      }, 100);
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

  loadDone(){
    console.log("load done");

    this.setState({
      loadDone: true
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>

            {(this.state.content.promovideo == 'http://website.com') &&
              <Image
                source={{uri:this.state.content.image}}
                style={{width:width,height:280, backgroundColor: '#ddd'}}
              />
            }

            {(this.state.content.promovideo != 'http://website.com') &&
              <WebView
                source={{uri: this.state.content.promovideo}}
                onLoad={()=>this.loadDone()}
                allowsInlineMediaPlayback={true}
                style={{width:width,height:280, backgroundColor: '#ddd'}}
              />
            }

            {((!this.state.loadDone) && (this.state.content.promovideo !== 'http://website.com')) &&
              <View style={{width:width,height:280, backgroundColor: '#ddd', alignItems:'center',justifyContent:'center',position:'absolute',top:0,left:0}} >
                <ActivityIndicator size="large" color="#731872" style={{marginTop: 15}} />
              </View>
            }

            <View style={{ borderWidth:5, borderColor:'#FFFFFF',width:width, marginBottom: 15, backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
              <Text style={styles.text} > {'المدرب'} </Text>
              <Image source={{uri: this.state.content.author_avatar}} style={styles.avatarImage} />
              <Text style={styles.text} > {this.state.content.author_name} </Text>

              <View style={{position: 'absolute', right: 15, top: 10 ,width:60}} >
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.content.rating}
                  starColor={'#ffca0c'}
                  emptyStarColor={'#ffca0c'}
                  starSize={15}
                />
              </View>
            </View>

            <View style={{width:width, height: 340, marginBottom: 10, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}} >

              <Text style={[styles.text,{textAlign:'center', color: '#68c682', fontSize: 18, padding: 10}]} >
                {'مجاني'}
              </Text>

              <View style={{width:width, paddingHorizontal: 14, borderTopWidth: 1, borderTopColor: '#e3e3e3', borderBottomWidth: 1, borderBottomColor: '#e3e3e3', height: 50,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
                  <Text style={[styles.text,{textAlign:'center', color: '#444444'}]} >
                    {'90 يوم'}
                  </Text>
                  <Ionicons name="md-time" size={22} color="#444444" style={{position:'absolute', right: 14}} />
              </View>

              <View style={{width:width, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#e3e3e3', height: 50,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
                  <Text style={[styles.text,{textAlign:'center', color: '#444444'}]} >
                    {this.state.content.startdate}
                  </Text>
                  <Icon name="calendar" size={18} color="#444444" style={{position:'absolute', right: 14}} />
              </View>

              <View style={{width:width, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#e3e3e3', height: 50,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
                  <Text style={[styles.text,{textAlign:'center', color: '#444444'}]} >
                    {'وسام التميز '}
                  </Text>
                  <Feather name="award" size={22} color="#444444" style={{position:'absolute', right: 14}} />
              </View>

              <View style={{width:width, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#e3e3e3', height: 50,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
                  <Text style={[styles.text,{textAlign:'center', color: '#444444'}]} >
                    {' شهادة المادة المعرفية '}
                  </Text>
                  <Iconm name="certificate" size={22} color="#444444" style={{position:'absolute', right: 14}} />
              </View>

              {(this.state.registered) &&
                <TouchableOpacity onPress={()=> this.startstudysubject()} style={styles.viewMoreBtnDone} >
                  <Text style={styles.viewMoreTextDone} >{'عرض الدروس '}</Text>
                </TouchableOpacity>
              }

              {(!this.state.registered) &&
                <TouchableOpacity onPress={()=> this.registerinsubject()} style={styles.viewMoreBtn} >
                  <Text style={styles.viewMoreText} >{'سجل في المادة '}</Text>
                </TouchableOpacity>
              }

            </View>

            <View style={{width:width, height: 50, marginBottom: 10, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
              <Text
                style={[styles.text,{textAlign:'center', color: '#000000'}]}
              >
                {'الطلاب المسجلين : '}{this.state.content.countstudent}{' طالب '}
              </Text>
            </View>

              <View style={{width:width, height: 50, marginBottom: 10, backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'space-around'}} >

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
                    <View key={'coment'+i} style={{padding:10,width:width, marginBottom: 10, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:60}} >
                      <Image style={{position:'absolute', left:15, top: 20, width:46,height:46, borderRadius: 23}} source={require('../images/avatar.jpeg')} />
                      <Text style={[styles.text, styles.textTitle]}>{coment.comment_author}</Text>
                      <Text style={[styles.text]}>{coment.comment_content}</Text>
                    </View>
                  );
              })}

            <View style={{width:width, margin: 25}}></View>

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
    var user = this.props.store.id;
    var id = self.props.id;
    console.log("https://website.com/ajax.php?service=get_subject_details&user="+user+"&id="+id);

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log('this.response : ', this.response);
        if(this.response){
          var content = JSON.parse(this.response);
          console.log(content);
          if(content.promovideo == ''){
            content.promovideo = 'http://website.com'
          }
          Actions.refresh({title: content.title});
          if(content.registered !== false && content.registered !== null && typeof content.registered === 'object'){
            self.setState({
                isLoading: false,
                registered: true,
                content: content,
                comments: content.comments,
            });
          }else{
            self.setState({
                isLoading: false,
                registered: false,
                content: content,
                comments: content.comments,
            });
          }
        }else{
          self.setState({
              content: '',
              comments: [],
              isLoading: false,
          });
        }
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_subject_details&user="+user+"&id="+id);
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
      color:'#5a5a5a',
      fontSize:14,
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
      fontSize:15,
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
    avatarImage:{
      width:36,
      height:36,
      borderRadius: 18,
      borderWidth:1,
      borderColor:'#f7941e'
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
    },
    viewMoreBtn:{
      width:150,
      height:40,
      backgroundColor:'#f7941e',
      margin:0,
      borderRadius:20,
      alignItems:'center',
      marginTop:25
    },
    viewMoreBtnDone:{
      width:150,
      height:40,
      backgroundColor:'transparent',
      margin:0,
      borderRadius:20,
      alignItems:'center',
      marginTop:25,
      borderColor: '#f7941e',
      borderWidth: 2,
    },
    viewMoreText:{
      color:'#FFFFFF',
      paddingHorizontal:5,
      marginTop:13,
      width:130,
      textAlign:'center',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
    },
    viewMoreTextDone:{
      color:'#444444',
      paddingHorizontal:5,
      marginTop:10,
      width:130,
      textAlign:'center',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
    }
});

module.exports = subjectview;
