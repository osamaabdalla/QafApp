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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
class cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      isLoading: true
    }
    self = this;
  }

  continue(){
    if(this.props.store.userName !== 'null'){
      Actions.order();
    }else{
      setTimeout(function () {
        Alert.alert(
          'عفوا',
          'الرجاء تسجيل الدخول اولا',
          [{text: 'تسجيل الدخول ', onPress: () => Actions.login() }, {text: 'لاحقا' }]
        );
      }, 100);
    }
  }

  removeMore(id, quant){
    if(quant == 1){
      Alert.alert(
        'اقل كمية يمكن طلبها 1',
        'هل تريد حذف المنتج من السلة ؟',
        [{text: 'حذف من السلة', onPress: () => this.removeProduct(id) }, {text: 'تراجع' }]
      );
    }else{
      this.props.store.removeProductFromCart(id);
      this.getProducts();
    }
  }

  addMore(id){
    this.props.store.addProductToCart(id);
    this.getProducts();
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

  countItems(id){
    var count = 0;
    var ids = self.props.store.getCart();
    for(var i = 0; i < ids.length; ++i){
      if(ids[i] == id){
        count++;
      }
    }
    return count;
  }

  componentWillMount(){
    I18nManager.forceRTL(true);
    this.getProducts();
  }

  removeProduct(id){
    Alert.alert(
      'تاكيد',
      'هل تريد فعلا حذف المنتج من السلة ؟ ',
      [
        {text: 'تاكيد الحذف ', onPress: () => {self.setState({ isLoading: true }), this.props.store.removeProduct(id), this.getProducts() }},
        {text: 'تراجع'},
      ]
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

    if((!this.state.isLoading) && (this.state.products.length == 0)){
      return (
        <View style={{flex:1,backgroundColor: '#eceff1',paddingTop: 0,paddingBottom: 0}} >
          <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
          <View style={{flex:1,backgroundColor: '#eceff1',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
              <Text style={[styles.text]}>{' سلة المنتجات فارغة '}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{flex:1,backgroundColor: '#eceff1'}} >
        <Image style={{width:width,height:IXORANDORPHONE}} source={require('../images/headerBg.png')} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}} >

          {this.state.products.map((product, i) => {
            return (
              <View key={'product'+i} style={{padding:10,width:width-20, margin: 10, height: 90, marginBottom: 5, marginTop:5, paddingTop: 12, backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >

                  <TouchableOpacity onPress={()=> this.removeProduct(product.id)} style={{width:30, height:60, backgroundColor:'transparent' }} >
                    <Ionicons name="ios-close-circle-outline" size={25} color="#333" style={styles.closeMenubtn} />
                  </TouchableOpacity>

                  <Image style={styles.image} source={{uri:product.image}} />

                  <TouchableOpacity onPress={()=> this.addMore(product.id)} style={styles.updateCuantity} >
                    <EvilIcons name="plus" size={25} color="#731872" style={styles.updateCuantityIcon} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> this.removeMore(product.id, self.countItems(product.id))} style={[styles.updateCuantity,styles.updateCuantityB]} >
                    <EvilIcons name="minus" size={25} color="#731872" style={styles.updateCuantityIcon} />
                  </TouchableOpacity>

                  <Text numberOfLines={1} style={[styles.text,{width:180}]}>{product.title}</Text>
                  <View style={[styles.price,{flexDirection:'column',alignItems:'center',justifyContent:'center'}]} >
                    <Text numberOfLines={1} style={[styles.text,{color: '#FFFFFF', fontSize: 14}]}>{product.price}</Text>
                  </View>
                  <View style={[styles.count,{flexDirection:'column',alignItems:'center',justifyContent:'center'}]} >
                    <Text numberOfLines={1} style={[styles.text,{color: '#FFFFFF', fontSize: 12}]}>{' X '}{this.countItems(product.id)}</Text>
                  </View>

              </View>
            );
          })}


            <View style={{padding:10,width:width-20, margin: 10, height: 80, marginBottom: 5, marginTop:5,backgroundColor: '#FFFFFF', flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >

                <Text numberOfLines={1} style={[styles.text]}>{' الإجمالي '}</Text>

                <Text numberOfLines={1} style={[styles.text]}>{this.getFinalPrice()}{' دولار '}</Text>

            </View>

            <View style={{width:width, margin: 25}}></View>

            <TouchableOpacity onPress={()=> this.continue()} style={styles.viewMoreBtn} >
              <Text style={styles.viewMoreText} >{'إستمرار'}</Text>
            </TouchableOpacity>

            <View style={{width:width, margin: 55}}></View>

        </ScrollView>
    </View>
    )
  }

  getProducts(){
    var ids = self.props.store.getCart();
    var idses = ids.join(',');
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var products = JSON.parse(this.response);
        console.log(products);
        self.setState({
            isLoading: false,
            products: products,
        });
      }
    });
    xhr.open("GET", "https://website.com/ajax.php?service=get_products_cart&ids="+idses);
    xhr.send(data);
  }
}

const styles = StyleSheet.create({
    updateCuantity:{
      backgroundColor:'transparent',
      width: 30,
      height: 30,
      position:'absolute',
      top: 6,
      right: 60,
      zIndex:999999999
    },
    updateCuantityB:{
      top: 64,
    },
    updateCuantityIcon:{

    },
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
      top: 20,
      right: 8
    },
    price:{
      backgroundColor:'#731872',
      width: 54,
      height: 50,
      borderRadius: 25,
      position:'absolute',
      top: 20,
      right: 8
    },
    count:{
      backgroundColor:'#731872',
      width: 45,
      height: 30,
      borderRadius: 15,
      position:'absolute',
      top: 30,
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

module.exports = cart;
