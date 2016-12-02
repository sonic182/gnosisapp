import React, {Component} from 'react'
import {
  Text,
  View,
  Button,
  Alert
} from 'react-native'

export default class Sidebar extends Component {

  render () {
    return (
      <View>
        <Text>This is the sidebar </Text>
        <Button title="alert" onPress={this.alert}/>
      </View>
    )
  }

  alert () {
    Alert.alert('some alert')
  }
}
