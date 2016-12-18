import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
} from 'react-native'

import ToolbarAndroid from 'ToolbarAndroid'
import CategoriesList from './categories_container';

export default class Home extends Component{

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  render () {
    return (
      <View style={styles.content}>
        <CategoriesList style={styles.categories} />
        <View style={styles.container}>
          <Text style={styles.title}>
            Gnosis España
          </Text>
          <ListView
            style={styles.homeList}
            contentContainerStyle={styles.homeListContainer}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              return (
                <Image
                  source={require('../../assets/images/sol_acuario.png')}
                  style={styles.logo}
                  ></Image>
              )
            }}
            />
        </View>
      </View>
    )
  }

  // <View style={styles.container}>
  //   <Text style={styles.title}>
  //     Gnosis España
  //   </Text>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Image
  //     source={require('../../assets/images/sol_acuario.png')}
  //     style={styles.logo}
  //     ></Image>
  //   <Text>
  //     This is Home component
  //   </Text>
  // </View>
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  categories: {
    flex: 1
  },
  container: {
    flex: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  redBg: {
    backgroundColor: 'red'
  },
  title: {
    fontSize: 22,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'red',
  },
  homeList: {
    alignSelf: 'stretch',
  },
  homeListContainer: {
    // alignSelf: 'stretch',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  }
})
