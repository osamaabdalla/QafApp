import React, { Component } from 'react';
import {
  I18nManager,
} from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import ListStore from './listStore';
import I18n from 'react-native-i18n';
import {inject, observer} from 'mobx-react/native';

@inject(['store']) @observer
class NavigationDrawer extends Component {
  constructor(props){
    super(props);
    console.log("NavigationDrawer");

  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
        <Drawer
            ref={(ref) => this._drawer = ref}
            open={state.open}
            onOpen={()=>Actions.refresh({key:state.key, open: true})}
            onClose={()=>Actions.refresh({key:state.key, open: false})}
            type="overlay"
            content={<SideMenu closer={()=> this._drawer.close()} store={ListStore} style={{left:0}} />}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
            main: { opacity:Math.max(0.54,1-ratio) }
            })}>
            <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </Drawer>
    );
  }
}

module.exports = NavigationDrawer;
