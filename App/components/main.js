
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigationBar,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer'

import Home from './home';
import Sidebar from './layout/sidebar';

let drawer;
export default class Main extends Component {
  constructor (props, context) {
    super(props, context)
    this.renderScene.bind(this)
    this.openControlPanel.bind(this)
    this.closeControlPanel.bind(this)
  }

  navigationBar () {
    return (
      <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) => {
          //  return (<Text style={styles.navigatorText}>Cancel</Text>)
           return (<Icon onPress={this.openControlPanel} style={styles.menuIcon} name="bars" size={30} color="#fff" />)
         },
         RightButton: (route, navigator, index, navState) =>{

           return true ? '' :(<Icon style={styles.menuIcon} name="check" size={30} color="#fff" />)
         },
         Title: (route, navigator, index, navState) => {
           return (<Text style={styles.navigatorText}>Awesome Nav Bar</Text>)
         },
       }}
       style={styles.navigatorBar}
      />)
  }

  closeControlPanel () {
    drawer.close()
  }

  openControlPanel () {
    drawer.open()
  }

  render() {
    return (
      <Drawer
        type='static'
        openDrawerOffset={100}
        ref={(ref) => drawer = ref}
        styles={{
          drawer: {
            shadowColor: '#6e1d1d',
            shadowOpacity: 0.8,
            shadowRadius: 3
          },
          main: {
            paddingLeft: 0
          }
        }}
        tweenHandler={Drawer.tweenPresets.parallax}
        content={<Sidebar />}
        >
        <Navigator
          initialRoute={this.initialRoute()}
          renderScene={this.renderScene}
          navigationBar={this.navigationBar()}
          style={styles.navigator}
          />
      </Drawer>
    );
  }

  initialRoute () {
    return { title: 'My Initial Scene', index: 0 }
  }

  renderScene (route, navigator) {
    // return <Home title={route.title} />
    return <Home />
  }
}

const styles = StyleSheet.create({
  navigatorBar: {
    backgroundColor: 'rgb(31, 102, 198)',
  },
  menuIcon: {
    padding: 10
  },
  navigatorText: {
    paddingVertical: 14,
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  }
})
