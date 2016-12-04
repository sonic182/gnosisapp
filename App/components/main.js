import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigationBar,
  Alert,
  DrawerLayoutAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import Home from './home';
import Sidebar from './layout/sidebar';

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
           return (<Icon onPress={this.openDrawer} style={styles.menuIcon} name="bars" size={22} style={{padding: 15}} color="#fff" />)
         },
         RightButton: (route, navigator, index, navState) =>{
           return true ? '' :(<Icon style={styles.menuIcon} name="check" size={30} color="#fff" />)
         },
         Title: (route, navigator, index, navState) => {
           return (<Text style={styles.navigatorText}>Gnosis España</Text>)
         },
       }}
       style={styles.navigatorBar}
      />)
  }

  openDrawer() {
    drawer.openDrawer()
  }

  render() {
    return (
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
    return { title: 'My Initial Scene', index: 0 }
  }

  renderScene (route, navigator, dis) {
    return <Home title={route.title} />
  }
}

const styles = StyleSheet.create({
  navigatorBar: {
    backgroundColor: 'rgb(31, 102, 198)',
  },
  navigatorText: {
    paddingVertical: 15,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  }
})
