import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const IXORANDORPHONE = (() => {if(Platform.OS === 'ios'){ if((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)){ return 87 }else{ return 67 }}else{ return 46 }})();

var self;
@inject(['store']) @observer
class orderPayments extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      payments: [],
      paymentsettedtitle: '',
      paymentsetted: '',
      isLoading: true
    }
    self = this;
  }

  getFinalPrice(){
    var price = 0;
    var products = self.state.products;
    var ids = self.props.store.getCart();
    for(var i = 0; i < products.length; ++i){
      for (var x = 0; x < ids.length; x++) {
        if(products[i].id == ids[x]){
          price = parseInt(price) + parseInt(products[i].price);
        }
      }
    }
    return price;
  }

  componentDidMount(){
    console.log("data :", this.props);
  }

  componentWillMount(){
    I18nManager.forceRTL(true);
    this.getProducts();
    this.getPayment();
  }

  sendOrder(){
    if(this.state.paymentsetted.length > 0){
      self.setState({
          isLoading: true,
      });

      var address_1 = this.props.data.address_1;
      var city = this.props.data.city;
      var country = this.props.data.country;
      var email = this.props.data.email;
      var firstName = this.props.data.firstName;
      var last_name = this.props.data.last_name;
      var mobile = this.props.data.mobile;
      var notes = this.props.data.notes;
      var username = this.props.data.username;

      var userid = this.props.store.id;
      var idses = self.props.store.getCart();

      var payment_method_title = this.state.paymentsettedtitle;
      var payment_method = this.state.paymentsetted;
      var products = idses.join(',');

      var data = new FormData();
      data.append("address_1", address_1);
      data.append("city", city);
      data.append("country", country);
      data.append("email", email);
      data.append("firstName", firstName);
      data.append("last_name", last_name);
      data.append("mobile", mobile);
      data.append("notes", notes);

      data.append("payment_method_title", payment_method_title);
      data.append("payment_method", payment_method);
      data.append("userid", userid);
      data.append("products", products);

      console.log("data", JSON.stringify(data));

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log("response", this.response);
          var response = JSON.parse(this.response);
          console.log(response);
          self.setState({
              isLoading: false,
          });
          Actions.orderSent({payment_method:self.state.paymentsetted, response:response});
        }
      });
      xhr.open("POST", "https://website.com/ajax.php?service=get_cart_order_now");
      xhr.send(data);
    }else{
      Alert.alert(
        'عفوا',
        ' الرجاء إختيار طريقة الدفع ',
        [
          {text: 'حسنا'},
        ]
      );
    }
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}} >

          {this.state.payments.map((payment, i) => {
            return (
              <View key={'payment'+i}  >
                {(payment.enabled) &&
                <View style={{padding:10,width:width-20, margin: 10, minHeight: 50, marginBottom: 5, marginTop:5,backgroundColor: '#FFFFFF', flexDirection:'column',alignItems:'center',justifyContent:'center'}} >

                    {(this.state.paymentsetted == payment.id) &&
                      <TouchableOpacity onPress={()=> this.setState({'paymentsetted': payment.id, paymentsettedtitle: payment.title})} style={{width:width-50, margin: 0, minHeight: 80, flexDirection:'row',alignItems:'center',justifyContent:'flex-start',paddingLeft: 40}} >
                        <MaterialCommunityIcons name="checkbox-marked" size={32} color="#731872" style={styles.closeMenubtn} />

                        <Text numberOfLines={1} style={[styles.text]}>{payment.title}</Text>

                      </TouchableOpacity>
                    }
                    {((this.state.paymentsetted == payment.id) && (this.state.paymentsetted == "bacs")) &&
                      <View style={{padding:8,paddingTop:0,width:width-50, margin: 0, minHeight: 50, backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >
                        <HTMLView stylesheet={htmlstyles} value={'<p>'+payment.description+'</p>'} />
                      </View>
                    }

                    {(this.state.paymentsetted !== payment.id) &&
                      <TouchableOpacity onPress={()=> this.setState({'paymentsetted': payment.id, paymentsettedtitle: payment.title})} style={{width:width-50, margin: 0, height: 80, flexDirection:'row',alignItems:'center',justifyContent:'flex-start',paddingLeft: 40}} >
                        <MaterialCommunityIcons name="checkbox-blank" size={32} color="#731872" style={styles.closeMenubtn} />
                        <Text numberOfLines={1} style={[styles.text]}>{payment.title}</Text>
                      </TouchableOpacity>
                    }

                </View>
              }
              </View>
            );
          })}


            <View style={{padding:10,width:width-20, margin: 10, height: 80, marginBottom: 5, marginTop:5,backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >

                <Text numberOfLines={1} style={[styles.text]}>{' الإجمالي '}</Text>

                <Text numberOfLines={1} style={[styles.text]}>{this.getFinalPrice()}{' دولار '}</Text>

            </View>

            <View style={{width:width, margin: 25}}></View>

            <TouchableOpacity onPress={()=> this.sendOrder()} style={styles.viewMoreBtn} >
              <Text style={styles.viewMoreText} >{'إدفع الآن'}</Text>
            </TouchableOpacity>

        </ScrollView>
    </View>
    )
  }
}

  getProducts(){
    var ids = self.props.store.getCart();
    var idses = ids.join(',');
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("response", this.response);
        var products = JSON.parse(this.response);
        console.log(products);
        self.setState({
            products: products,
        });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_products_cart&ids="+idses);
    xhr.send(data);
  }

  getPayment(){
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var payments = JSON.parse(this.response);
        console.log(payments);
        self.setState({
            isLoading: false,
            payments: payments,
        });
      }
    });
    xhr.open("GET", "https://website.com/wp-json/wc/v2/payment_gateways/?consumer_key=ck_2eb9d3d285f2422f83fefd7d8ec6332f3a50d878&consumer_secret=cs_bc87aa4f895ee94f45cbebfe202676962e0cb636");
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
      textAlign:'left',
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#5a5a5a',
      fontSize:13,
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
      maxWidth: width-20,
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

});

const styles = StyleSheet.create({
    text: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#333333',
      fontSize:13,
      fontFamily: 'JFFlat-regular',
      backgroundColor:'transparent',
    },
    textdescription: {
      textAlign:'justify',
      paddingHorizontal:10,
      writingDirection:'rtl',
      lineHeight: 22,
      color:'#333333',
      fontSize:12,
      fontFamily: 'JFFlat-regular',
      backgroundColor:'transparent',
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    closeMenubtn:{
      backgroundColor:'transparent',
      width: 30,
      height: 60,
      position:'absolute',
      top: 22,
      left: 8
    },
    price:{
      backgroundColor:'#731872',
      width: 54,
      height: 50,
      borderRadius: 25,
      position:'absolute',
      top: 15,
      right: 8
    },
    count:{
      backgroundColor:'#731872',
      width: 45,
      height: 30,
      borderRadius: 15,
      position:'absolute',
      top: 25,
      right: 45
    },
    textTitle: {
      fontSize:13,
      paddingBottom: 5,
      color:'#000',
    },
    viewMoreBtn:{
      width:140,
      height:45,
      backgroundColor:'#f7941e',
      margin:0,
      borderRadius:20,
      alignItems:'center',
      marginTop:-20
    },
    viewMoreText:{
      color:'#FFFFFF',
      paddingHorizontal:5,
      marginTop:14,
      width:130,
      textAlign:'center',
      fontSize:13,
      fontFamily: 'JFFlat-regular' ,
    }
});

module.exports = orderPayments;
