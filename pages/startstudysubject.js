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
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
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
class startstudysubject extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: '',
      comments: [],
      subjects: [],
      isLoading: true,
      completeingCourse: false,
      gotoNextCourse: false,
      isModalVisible: false,
      registered: false,
      completeingCourseTemp: false,
    }
    self = this;
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'iframe') {
      const a = node.attribs;
      const iframeHtml = `<iframe src="${a.src}"></iframe>`;
      return (
        <View key={index} style={{width: width-20, height: 220}}>
          <WebView
            style={{flex:1,height:220, width:width-20}}
            javaScriptEnabled={true}
            source={{uri: a.src}}
          />
        </View>
      );
    }
  }

  nextCourse(){
    self.setState({
      completeingCourse: false,
      completeingCourseTemp: true,
      //isLoading: true,
      //completeingCourse: false,
      //gotoNextCourse: false,
      //isModalVisible: false,
    });
    this.getBlogdetails();
  }

  completedtunit(lastunit){
    self.setState({
      completeingCourseTemp: true,
      gotoNextCourse: true,
    });

    var obCourseId = self.props.id;
    console.log("lastunit", lastunit);
    console.log("obCourseId", obCourseId);

    var data = new FormData();
    data.append("action", 'completedtunit');
    data.append("obCourseId", obCourseId);
    data.append("last_unit", lastunit);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var content = JSON.parse(this.response);
        console.log(content);
        self.setState({
          completeingCourseTemp: false,
        });
      }
    });
    xhr.open("POST", "https://website.com/wp-admin/admin-ajax.php");
    xhr.send(data);
  }

  componentWillMount(){
    self.getBlogdetails();
    I18nManager.forceRTL(true);
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
    }else{
      return (
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>

            <View
              style={styles.latestTouchableOpacityStyle}
            >
            <Image
              source={{uri: this.state.content.image}}
              style={styles.latestImageTouchableOpacityStyle}
            />

            <View
              style={styles.subjectDetails}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.avatarName,{color:'#FFFFFF'}]}
              >
                {this.state.content.title}
              </Text>

              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'transparent',padding:2}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.content.rating}
                  starColor={'#ffca0c'}
                  emptyStarColor={'#ffca0c'}
                  starSize={18}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.avatarName,{color:'#FFFFFF',fontSize:11}]}
                >
                  {this.state.content.countstudent}{' طالب '}{' '}{' ( '}{this.state.content.rating}{' تقييمات ) '}
                </Text>
              </View>

              <View style={{width:220,height:1,marginTop:4,backgroundColor:'#f5f5f5'}}></View>

              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'transparent',padding:3}}>
                <Image
                  source={{uri: this.state.content.author_avatar}}
                  style={styles.avatarImage}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.avatarName}
                >
                  {this.state.content.author_name}
                </Text>
              </View>

              <View   style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'transparent',padding:3,paddingBottom:6,width: 220 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.avatarName,{color:'#FFFFFF',fontSize:11}]}
                >
                  {this.state.content.startdate}
                </Text>
              </View>
            </View>
            </View>

            <View style={{width:width, margin: 5}}></View>

            {(self.state.content.curriculumempty) &&
              <Text style={[styles.text, styles.textTitle,{textAlign:'center', paddingTop: 100, width:width}]} >{'لا توجد دروس متوفرة حاليا للمادة'}</Text>
            }


            {(this.state.content.last_unit.type == "stopped") &&
                <View style={{width:width-20, margin: 10, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
                    <View style={{width:width-40, padding: 10, backgroundColor: '#ffffff', flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
                        <HTMLView stylesheet={htmlstyles} value={this.state.content.last_unit.content} style={{ width: width-40, overflow:'hidden'}} />
                    </View>
                </View>
            }

            {this.state.subjects.map((title, x) => {
              if(this.state.content.last_unit.type == "stopped"){
                return ;
              }else{
                return (
                  <View key={'coment'+x} style={{width:width-20, margin: 10, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
                      <View style={{width:width-20, padding: 10, backgroundColor: '#fbab00', height: 80, flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
                          <Text style={[styles.text, styles.textTitle,{color:'#FFFFFF'}]}>{title}</Text>
                          <Text style={[styles.text,{color:'#FFFFFF'}]}>{'('} {this.state.subjearray[x].length} {'دروس'} {')'}</Text>
                      </View>

                      {this.state.subjearray[x].map((subject, i) => {
                        return (
                          <View key={'coment'+i} style={{padding:10,width:width-20, height: 55, backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start', borderBottomColor:'#f2f3f5', borderBottomWidth: 1, paddingLeft: 40, paddingTop: 14}} >
                              <Icon name="play-circle-outline" size={22} color="#333" style={styles.closeMenubtn} />
                              <Text numberOfLines={1} style={[styles.text]}>{subject.name}</Text>

                              {(subject.id < this.state.content.last_unit.id) &&
                                <Icon name="check-circle" size={22} color="#fcab00" style={styles.statusbtn} />
                              }

                              {(subject.id == this.state.content.last_unit.id) &&
                                <TouchableOpacity onPress={()=> this.setState({ isModalVisible: true})} style={{width:30, height:30, position: 'absolute', top: 0, right: 0,transform:[{'scale': -1}]}} >
                                  <Iconm name="skip-next-circle-outline" size={22} color="#641876" style={{width:30, height:30, position: 'absolute', bottom: 8, left: 8,}} />
                                </TouchableOpacity>
                              }

                              {(subject.id > this.state.content.last_unit.id) &&
                                <Icon name="radio-button-unchecked" size={22} color="#fcab00" style={styles.statusbtn} />
                              }

                          </View>
                        );
                      })}
                  </View>
                );
              }
            })}

            <View style={{width:width, margin: 25}}></View>


            <Modal isVisible={this.state.isModalVisible} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <View style={{ width: width, height: height-50, top: 50, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' , paddingTop: 10}} >
                <TouchableOpacity
                  style={{position:'absolute', top:8, left: 8, zIndex: 9999999}}
                  onPress={()=>self.setState({ isModalVisible: false })}
                  >
                  <Ionicons name="md-close-circle" size={22} color="#faaa0d" style={{position:'absolute', zIndex: 9999999, top:0, left: 8}} />
                </TouchableOpacity>

                    {(this.state.completeingCourse) &&
                      <View style={{width:width, margin: 300,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <ActivityIndicator size="large" color="#711773" />
                      </View>
                    }

                    {(!this.state.completeingCourse) &&
                        <View style={{ width: width, height: height-50, top: 50, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' , paddingTop: 10}} >
                          <HTMLView stylesheet={htmlstyles} value={this.state.content.last_unit.content} renderNode={this.renderNode} style={{ width: width, height: 350}} />

                          {(this.state.content.last_unit.type !== 'stopped') &&
                            <View style={{width:width, height: 50,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 125,}}>

                                {(this.state.completeingCourseTemp) &&
                                  <View style={{width:width, margin: 100,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                      <ActivityIndicator size="large" color="#711773" />
                                  </View>
                                }

                                {((this.state.content.last_unit.state) && (this.state.content.last_unit.state != 'pendding') && (this.state.content.last_unit.state != 'finished') && (!this.state.gotoNextCourse) && (!this.state.completeingCourseTemp)) &&
                                  <View style={{ width: width, height: 100, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                                    <TouchableOpacity onPress={()=> this.completedtunit(this.state.content.last_unit.id)} style={styles.viewMoreBtn} >
                                      <Text style={styles.viewMoreText} >{'أنهيت هذا الدرس'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>self.setState({ isModalVisible: false })} style={[styles.viewMoreBtn,{backgroundColor: 'transparent'}]} >
                                      <Text style={[styles.viewMoreText,{color:'#731772'}]} >{'إغلاق'}</Text>
                                    </TouchableOpacity>
                                  </View>
                                }

                                {((this.state.content.last_unit.state) && (this.state.content.last_unit.state != 'pendding') && (this.state.content.last_unit.state != 'finished') && (this.state.gotoNextCourse) && (!this.state.completeingCourseTemp)) &&
                                  <View style={{ width: width, height: 100, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                                    <TouchableOpacity onPress={()=> this.nextCourse()} style={styles.viewMoreBtn} >
                                      <Text style={styles.viewMoreText} >{'الدرس التالي '}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>self.setState({ isModalVisible: false })} style={[styles.viewMoreBtn,{backgroundColor: 'transparent'}]} >
                                      <Text style={[styles.viewMoreText,{color:'#731772'}]} >{'إغلاق'}</Text>
                                    </TouchableOpacity>
                                  </View>

                                }
                            </View>
                          }

                          {(this.state.content.last_unit.type == 'stopped') &&
                            <TouchableOpacity onPress={()=> self.setState({ isModalVisible: false })} style={styles.viewMoreBtn} >
                              <Text style={styles.viewMoreText} >{' إغلاق '}</Text>
                            </TouchableOpacity>
                          }
                      </View>
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
        var content = JSON.parse(this.response);
        console.log(content);

        if(content.registered !== false && content.registered !== null && typeof content.registered === 'object'){

          var subje = Object.keys(content.curriculum);
          var subjearray = [];
          for (var i = 0; i < subje.length; i++) {
            subjearray.push(content.curriculum[subje[i]]);
          }

          self.setState({
              isLoading: false,
              registered: true,
              content: content,
              subjects: Object.keys(content.curriculum),
              subjearray: subjearray,
              comments: content.comments,
              completeingCourse: false,
              completeingCourseTemp: false,
              gotoNextCourse: false,
          });
        }else{
          self.setState({
              isLoading: false,
              registered: false,
              content: content,
              comments: content.comments,
              completeingCourse: false,
              completeingCourseTemp: false,
              gotoNextCourse: false,
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
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:15,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    p: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    h3: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    a: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    strong: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    div: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    h2: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
      fontFamily: 'JFFlat-regular',
      padding: 0,
      margin:0,
    },
    span: {
      textAlign:'center',
      writingDirection:'rtl',
      lineHeight: 20,
      color:'#5a5a5a',
      fontSize:14,
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
    closeMenubtn :{
      width:30,
      height:30,
      position: 'absolute',
      top: 7,
      left: 15,
      transform:[{'scale': -1}]
    },
    statusbtn :{
      width:30,
      height:30,
      position: 'absolute',
      top: 15,
      right: 15,
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
    viewMoreTextDone:{
      color:'#444444',
      paddingHorizontal:5,
      marginTop:10,
      width:130,
      textAlign:'center',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
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
    latestTouchableOpacityStyle: {
      backgroundColor:'#fff',
      borderColor:'#f6f8fd',
      overflow: 'hidden',
      borderRadius:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      width: width,
      height: width / 3 + 15,
      padding: 10,
      backgroundColor: '#741873',
    },
    latestImageTouchableOpacityStyle: {
      width: width / 3 - 30,
      height: width / 3 - 30,
      padding: 5,
      margin: 8,
      borderRadius: 8,
      backgroundColor:'transparent',
      overflow: 'hidden',
    },
    subjectDetails: {
      width: (width-(width / 3)) + 25,
      height: width / 3 - 20,
      paddingTop: 4,
      backgroundColor:'transparent',
      overflow: 'hidden',
    },
    avatarName: {
      color:'#FFFFFF',
      paddingHorizontal:5,
      paddingTop:5,
      textAlign:'left',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
    },
    avatarImage:{
      width:22,
      height:22,
      borderRadius: 12,
      borderWidth:1,
      borderColor:'#f7941e'
    },
});

module.exports = startstudysubject;
