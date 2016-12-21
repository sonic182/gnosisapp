import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigationBar,
  Alert,
  DrawerLayoutAndroid,
  Platform,
  BackAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import utils from '../utils/utils'

import Home from './home/home';
import Sidebar from './layout/sidebar';
import PostView from './post/post_show';

let drawer;
export default class Main extends Component {
  constructor (props, context) {
    super(props, context)
    this.renderScene.bind(this)
  }

  navigationBar () {
    return (
      <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) => {
           if (route.back){
             return (
               <Icon onPress={navigator.pop}
                style={styles.menuIcon}
                name="arrow-left" size={22} style={{padding: 15}} color="#fff" />);
           }
           return (drawer ? <Icon onPress={this.openDrawer} style={styles.menuIcon} name="bars" size={22} style={{padding: 15}} color="#fff" /> : <View/>)
         },
         RightButton: (route, navigator, index, navState) =>{
           return true ? '' :(<Icon style={styles.menuIcon} name="check" size={30} color="#fff" />)
         },
         Title: (route, navigator, index, navState) => {
           return (
             <Text style={styles.navigatorText}>{route.my_title ?
               utils.truncatechars(utils.entities.decode(route.my_title), 30) :
               'Gnosis España'}
             </Text>)
         },
       }}
       style={styles.navigatorBar}
      />)
  }

  openDrawer() {
    drawer.openDrawer()
  }

  render() {

    // return Platform.OS !== 'android' ?
    return true ?
    (
      <Navigator
        initialRoute={this.initialRoute()}
        renderScene={(router, navigator) => {
          return this.renderScene(router, navigator, this)
        }}
        navigationBar={this.navigationBar()}
        style={styles.navigator}
      />
    ) :
    (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(_drawer) => { drawer = _drawer  }}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <Sidebar />}>
          <Navigator
            initialRoute={this.initialRoute()}
            renderScene={(router, navigator) => {
              return this.renderScene(router, navigator, this)
            }}
            navigationBar={this.navigationBar()}
            style={styles.navigator}
          />
      </DrawerLayoutAndroid>
    );
  }

  initialRoute () {
    return { title: 'Home', index: 0 }
  }

  renderScene (route, navigator, dis) {
    var navigator;

    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {
          if (navigator && navigator.getCurrentRoutes().length > 1) {
              navigator.pop();
              return true;
          }
          return false;
      });
    }

    switch(route.title) {
      case 'Home':
        return (
          <Home navigator={navigator} style={styles.scene} title={route.title} />
        )
      break;
      case 'PostView':
        return (
          <PostView style={styles.scene} navigator={navigator} post={route.post}/>
        )
      break;
    };
    return (
      <Text>Error render scene</Text>
    );
  }
}

const styles = StyleSheet.create({
  navigatorBar: {
    backgroundColor: '#2b6bc3',
    height: 55
  },
  navigator: {
    // app background!
    backgroundColor: '#ddd',
    paddingTop: 55
  },
  navigatorText: {
    paddingVertical: 17,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  scene: {
    flex: 1,
    // marginTop: 55,
  }
})
