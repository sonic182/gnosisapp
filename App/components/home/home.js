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
import PostContainer from './posts';

// import Http from '../../services/http';

let category = null;
let PostsContainerComponent = null;
export default class Home extends Component{

  constructor (props) {
    super(props)
    this.setCategory.bind(this)
  }

  setCategory () {

  }

  render () {
    return (
      <View style={styles.content}>
        <CategoriesList
          selectedCategory={(cat) => {
            category = cat
            PostsContainerComponent.setCategory(cat)
          }}
          style={styles.categories} />
        <View style={styles.container}>
          <PostContainer ref={(postContainer) => { PostsContainerComponent = postContainer}} navigator={this.props.navigator}/>
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
  }
})
