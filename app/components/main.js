import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigationBar,
  Alert,
  // DrawerLayoutAndroid,
  Platform,
  BackAndroid,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import {
	setNavigator,
	pushRoute,
	popRoute,
 } from '../redux/actions'

import Icon from 'react-native-vector-icons/FontAwesome';
import utils from '../utils/utils'

import News from './news/news';
import Menu from './layout/menu';
import Sidebar from './layout/sidebar';
import PostView from './post/post_show';

// let drawer;
class Main extends Component {

  constructor (props, context) {
    super(props, context)
    this.renderScene.bind(this)
  }

  navigationBar () {
    return (
      <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) => {
           if (index > 0){
             return (
               <Icon onPress={navigator.pop}
                style={styles.menuIcon}
                name="arrow-left" size={22} style={{padding: 15}} color="#fff" />);
           }
           return (
             <Image
              source={require('../assets/images/sol_acuario.png')}
              style={styles.sol}
            />
           )
          //  return (Platform.OS === 'android' ? <Icon onPress={this.openDrawer} style={styles.menuIcon} name="bars" size={22} style={{padding: 15}} color="#fff" /> : <View/>)
           return (<View/>)
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

  // openDrawer() {
  //   drawer.openDrawer()
  // }

  initialRoute () {
    return { title: 'Menu', index: 0 }
  }

  allRoutes () {
    return [
      { title: 'Menu', index: 0 },
      { title: 'News', index: 1 },
      { title: 'PostView', index: 2, post: null },
    ]
  }

  componentDidMount(){
    // add nav to redux
    this.props.setNavigator({navigator: this.nav, route: this.initialRoute()})
  }

  render() {

    return true ?
    // return Platform.OS !== 'android' ?
    (
      <Navigator
        ref={(nav) => {this.nav = nav}}
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

  renderScene (route, navigator, dis) {
    var navigator;

    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {
          if (navigator && navigator.getCurrentRoutes().length > 1) {
              // navigator.pop();
              this.props.popRoute()
              return true;
          }
          return false;
      });
    }


    switch(route.title) {
      case 'News':
        return (
          <News style={styles.scene} title={route.title} />
        )
      case 'Menu':
        return (
          <Menu/>
        )
      case 'PostView':
        return (
          <PostView style={styles.scene} navigator={navigator} post={route.post}/>
        )
      default:
      return (
        <Text>Error render scene</Text>
      )
    }
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
  },
  sol: {
    marginTop: 2,
    marginLeft: 2,
    height: 53,
    width: 53
  }
})

// const stateToProps = (state, props) => {
//   return {
//
//   }
// }

const dispatchToProps = (dispatch, props) => {
  return {
    setNavigator: (obj) => {dispatch(setNavigator(obj))},
    popRoute: () => {dispatch(popRoute())}
  }
}

export default connect(null, dispatchToProps)(Main)
