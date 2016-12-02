import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import ToolbarAndroid from 'ToolbarAndroid'

export default class Home extends Component{

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Gnosis España
        </Text>
        <Image
          source={require('../assets/images/sol_acuario.png')}
          style={styles.logo}
          ></Image>
        <Text>
          This is Home component
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 22,
  },
  logo: {
    width: 200,
    height: 200,
  }
})
