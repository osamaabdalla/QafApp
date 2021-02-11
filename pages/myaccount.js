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
  Alert,
  I18nManager,
  Platform,
  ListView,
  NativeModules,
  Image
} from 'react-native';
import { Actions,ActionConst } from 'react-native-router-flux';
var UpdateAccount = require('./updateaccount');
import HTMLView from 'react-native-htmlview';
import {inject, observer} from 'mobx-react/native';
import RNRestart from 'react-native-restart';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Spinner from 'react-native-loading-spinner-overlay';
var ImagePicker = require('react-native-image-picker');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var RNUploader = NativeModules.RNUploader;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en:{
    sendthecomment:"Send comment",
    languagespagse:"Languages",
    skip:"Continue",
    favorite:"Favorites",
    calendar:"Calendar",
    myevents:"My events",
    mytrucks:"My Products",
    myaccount:"My account",
    loading:"loading...",
    titleste:"All Events",
    oursuggestions:"Our suggestions",
    calenders:"Comming events calender",
    empty:"Empty",
    emptyday:"This is empty date!",
    areyousure:"Are you sure ?",
    delproduct:"Delete Product",
    yes:"Yes",
    cancel:"Cancel",
    delproductdone:"Product deleted",
    ok:"OK",
    addproduct:"Add Product",
  },
  ar: {
    delproductdone:"تم حذف المنتج ",
    sendthecomment:"إرسال التعليق",
    languagespagse:"اللغات",
    skip:"إستمرار",
    favorite:"المفضلة",
    calendar:"التقويم",
    myevents:"فعالياتي",
    mytrucks:"منتجاتي",
    myaccount:"حسابي",
    loading:"جاري التحميل ...",
    emptyday:"لاتوجد فعاليات لهذا اليوم",
    titleste:"الفعاليات",
    oursuggestions:"إقتراحاتنا",
    calenders:"تقويم فعالياتك القادمة",
    empty:"لاتوجد فعاليات في التقويم",
    areyousure:"هل انت متأكد ؟",
    delproduct:"حذف منتج",
    yes:"نعم",
    cancel:"لا",
    ok:"حسنا",
    addproduct:"اضافة منتج",
  }
});
strings.setLanguage('ar');

var self;
@inject(['store']) @observer
class myaccount extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      eventsDataSource: this.ds.cloneWithRows([]),
      index: 0,
      file: '',
      isLoading: true,
      filename: '',
      fileName: '',
      avatarUrl: 'https://website.com/wp-content/uploads/2017/09/userlogotransparent.png',
      routes: [
        { key: '1', title: 'المواد المسجل بها', icon: "mortar-board" },
        { key: '2', title: 'بياناتي الشخصية', icon: "user" },
      ],
    }
    self = this;
  }

  renderEventsContent(){
    var ids = this.props.store.getUserNumber();
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var resx = JSON.parse(this.response);
        console.log(resx);
        self.setState({
            eventsDataSource: self.ds.cloneWithRows(resx),
            latestEventsDataSource: resx,
            isLoading: false,
        });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_my_course_list&userid="+ids)
    xhr.send(data);
  }

  _handleIndexChange = index => {
    this.setState({ index });
    this.renderEventsContent();
  };

  _renderIcon = ({ route }: any) => {
      return <Icon name={route.icon} size={16} color={'#6d1874'} />;
  };

  _renderHeader = props => <TabBar {...props} style={{backgroundColor:'#FFFFFF'}} labelStyle={{color:'#333d42',fontSize:12,fontFamily: 'JFFlat-regular'}} indicatorStyle={{backgroundColor:'#6d1874'}} renderIcon={this._renderIcon} />;

  renderEventSeparator(sectionID,rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 0,
        }}
      />
    );
  }

  renderEventRow(rowData){
      return(
        <TouchableOpacity
          onPress={()=>Actions.subjectview({id:rowData.id})}
          style={styles.TouchableOpacityStyle}
        >

          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.TextTouchableOpacityStyle}
          >
            {rowData.title}
          </Text>

          <Image
            source={{uri: rowData.image}}
            style={styles.ImageTouchableOpacityStyle}
          />

          <TouchableOpacity
            onPress={()=>{
              Actions.subjectview({id:rowData.id});
            }}
            style={styles.suggestIconTouchableOpacityStyle}
            >
              <Icon name="eye" size={20} color="#6d1874" />
          </TouchableOpacity>

        </TouchableOpacity>
    );
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <View style={[ styles.container, { backgroundColor: '#eceff1',padding:10 } ]} >
            <ListView
              enableEmptySections={true}
              dataSource={self.state.eventsDataSource}
              renderRow={self.renderEventRow}
              renderSeparator={self.renderEventSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.ListViewStyle}
              removeClippedSubviews={true}
              scrollEnabled={false}
              initialListSize={50}
            />
        </View>
      );
    case '2':
      return (
        <View style={[ styles.container, { backgroundColor: '#eceff1',padding:0 } ]} >
          <UpdateAccount avatar={self.state.avatarUrl} fileName={self.state.fileName} />
        </View>
      );
    default:
      return null;
    }
  }

  componentDidMount(){
    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      Actions.refresh({title: 'حسابي'});
      if(self.props.store.avatar !== 'null'){
        var userAvatar = self.props.store.avatar;
        self.setState({
            avatarUrl: userAvatar,
        });
      }
      I18nManager.forceRTL(true);
    }, 500);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  componentWillMount(){
    setTimeout(function () {
      strings.setLanguage('ar');
      self.setState({});
      Actions.refresh({title: 'حسابي'});
      self.renderEventsContent();
      self.setState({
        routes: [
          { key: '1', title: 'المواد المسجل بها ', icon: "mortar-board" },
          { key: '2', title: 'بياناتي الشخصية', icon: "user" },
        ],
      });
      I18nManager.forceRTL(true);
    }, 500);
  }

  UploadProfilePicture(){
    var options = {
      maxWidth: 250,
      maxHeight: 250,
      quality: 1,
      title: strings.selectprofileimg,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        self.setState({
            tempAvatarUrl : response,
            avatarUrl: response.uri,
            fileName: response.fileName,
        });
      }
    });
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
      <View style={{flex:1,backgroundColor: '#FFFFFF'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'transparent' }}>

          <View
            style={{width:width,height:180, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor: '#333d42',opacity:1,marginBottom:-180}}
          >
          </View>
          <Image
            source={{uri:this.state.avatarUrl}}
            style={{width:width,height:180, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor: '#b0bec5',opacity:0.4,marginBottom:-75}}
          >
          </Image>

            <View
              style={{width:width,height:150, flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor: 'transparent'}}
              >

                <Image
                  source={{uri:this.state.avatarUrl}}
                  style={{width:110,height:110,borderRadius: 55,borderWidth:2,borderColor:'#FFFFFF', backgroundColor: '#FFFFFF'}}
                />

                <TouchableOpacity style={{position:'absolute',width:36,height:36,borderRadius: 18,backgroundColor: '#FFFFFF',flexDirection:'column', justifyContent:'center', alignItems:'center',left:width/2+35,borderWidth:1,borderColor:'#6d1874',}} onPress={()=>this.UploadProfilePicture()}>
                  <Icon name={'edit'} size={20} color={'#6d1874'} />
                </TouchableOpacity>

            </View>

            <View
              style={{width:width,height:50, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: 'transparent',borderBottomWidth:0.5,borderBottomColor:'#b0bec5',paddingBottom:20}}
              >
                <Text style={styles.welcomeText} >{this.props.store.name}</Text>
            </View>

            <TabViewAnimated
              style={styles.container}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderHeader={this._renderHeader}
              onIndexChange={this._handleIndexChange}
            />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  ListViewStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:0
  },
  welcomeText: {
    width: width,
    backgroundColor: 'transparent',
    color:'#263238',
    paddingTop:4,
    textAlign:'center',
    writingDirection:'rtl',
    fontSize:18,
    fontFamily: 'JFFlat-regular',
    marginTop:0,
  },
  TouchableOpacityStyle:{
    width: width-10,
    height: 63,
    padding: 5,
    paddingLeft:80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b0bec5',
    borderRadius:0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor:'#FFFFFF',
  },
  TextTouchableOpacityStyle: {
    color:'#263238',
    fontSize:15,
    fontFamily: 'JFFlat-regular',
  },
  ImageTouchableOpacityStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position:'absolute',
    backgroundColor:'#b0bec5',
    top:10,
    left:15,
  },
  suggestIconTouchableOpacityStyle: {
    position:'absolute',
    top:20,
    right:20,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

module.exports = myaccount;
