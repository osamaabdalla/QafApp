import {observable} from 'mobx';
import { create, persist } from 'mobx-persist';
import {
  AsyncStorage,
} from 'react-native';

class ObservableListStore {
  @persist @observable languages = 'null';
  @persist @observable userName = 'null';
  @persist @observable id = 'null';
  @persist @observable name = 'null';
  @persist @observable city = 'null';
  @persist @observable mobile = 'null';
  @persist @observable avatar = 'null';
  @persist @observable hastruck = false;
  @persist @observable favorites = JSON.stringify([]);
  @persist @observable addedeventsarray = JSON.stringify([]);
  @persist @observable productscart = JSON.stringify([]);

  getName(){
    return this.name;
  };

  getUserCity(){
    return this.city;
  };

  getMobile(){
    return this.mobile;
  };

  setUserCity(city){
    this.city = city;
  };

  setMobile(mobile){
    this.mobile = mobile;
  };

  changelanguages(lang){
    ////console.log('languages = '+this.languages);
    this.languages = lang;
    ////console.log('languages changed to = '+this.languages);
  }

  addFavior(id){
    var favoritesarray = JSON.parse(this.favorites);
    //console.log(favoritesarray);
    if(favoritesarray.indexOf(id) < 0){
      favoritesarray.push(id);
      this.favorites = JSON.stringify(favoritesarray);
      //console.log(this.favorites);
    }
  };

  addProductToCart(id){
    var productscartarray = JSON.parse(this.productscart);
    //console.log(productscartarray);
    productscartarray.push(id);
    //console.log(productscartarray);
    this.productscart = JSON.stringify(productscartarray);
  };

  removeProductFromCart(id){
    var productscartarray = JSON.parse(this.productscart);
    if(productscartarray.indexOf(id) > -1){
      productscartarray.splice(productscartarray.indexOf(id), 1);
    }
    this.productscart = JSON.stringify(productscartarray);
  };

  getCart(){
    var productscart = JSON.parse(this.productscart);
    if(productscart.length > 0){
      return productscart;
    }else{
      return [];
    }
  };

  emptyCart(){
    this.productscart = JSON.stringify([]);
  };

  removeProduct(id){
    var emptyArray = [];
    var productscart = JSON.parse(this.productscart);
    for (var i = 0; i < productscart.length; i++) {
      if(productscart[i] !== id){
        emptyArray.push(productscart[i]);
      }
      this.productscart = JSON.stringify(emptyArray);
    }
  };

  addedEvent(id, savedID){
    var addedeventarray = JSON.parse(this.addedeventsarray);
    addedeventarray[id] = savedID;
    this.addedeventsarray = JSON.stringify(addedeventarray);
  };

  getFaviors(){
    var favoritesarray = JSON.parse(this.favorites);
    if(favoritesarray.length > 0){
      return favoritesarray;
    }else{
      return [];
    }
  };

  removeFavior(id){
    var favoritesarray = JSON.parse(this.favorites);
    //console.log(favoritesarray);
    if(favoritesarray.indexOf(id) > -1){
      favoritesarray.splice(favoritesarray.indexOf(id), 1);
      this.favorites = JSON.stringify(favoritesarray);
      //console.log(this.favorites);
    }
  };

  isFaviored(id){
    var favoritesarray = JSON.parse(this.favorites);
    //console.log(favoritesarray);
    if(favoritesarray.indexOf(id) > -1){
      return true;
    }else{
      return false;
    }
  };

  isSavedEvent(id){
    var addedeventarray = JSON.parse(this.addedeventsarray);
    //console.log(addedeventarray);
    if(addedeventarray[id]){
      return true;
    }else{
      return false;
    }
  };

  setPhoneNumber(id){
    this.id = id;
  };

  getUserNumber(){
    return this.id;
  };

  setAvatar(url){
    this.avatar = url;
  };

  getAvatar(){
    return this.avatar;
  };

  setName(name){
    this.name = name;
  };

  setHastruck(hastruck){
    this.hastruck = hastruck;
  };

  setUserName(email){
    this.userName = email;
  };

  getUserName(){
    return this.userName;
  };

  getLanguage(){
    return this.languages;
  }
}

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})

const observableListStore = new ObservableListStore()
export default observableListStore

hydrate('store', observableListStore)
    // post hydration
    .then(() => console.log('some hydrated'))
