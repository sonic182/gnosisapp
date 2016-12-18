import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
} from 'react-native'

import ToolbarAndroid from 'ToolbarAndroid'
import CategoriesList from './categories';
import PostItem from './posts';

import Http from '../../services/http';


export default class Home extends Component{

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      posts: ds.cloneWithRows([{
        title: 'Loading...',
      }])
    };
    Http.get('posts')
    .then((r) => r.json())
    .then((rJson) => {
      console.log('rJson')
      console.log(rJson)
      // rJson.posts.forEach((p) => {
      //   console.log('p.featured_image')
      //   console.log(p.featured_image)
      // })
      this.setState({posts: ds.cloneWithRows(rJson.posts)})
    })

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
            dataSource={this.state.posts}
            renderRow={(post) => {
              return (
                <PostItem post={post}/>
              )
            }}
            />
        </View>
      </View>
    )
    // <Image
    // source={require('../../assets/images/sol_acuario.png')}
    // style={styles.logo}
    // ></Image>
  }
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
    backgroundColor: 'red',
    alignSelf: 'stretch',
  },
  homeListContainer: {
    backgroundColor: 'blue',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
})
