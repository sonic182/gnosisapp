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
export default class News extends Component{

  constructor (props) {
    super(props)
  }

  selectedCategory = (cat) => {
      category = cat
      console.log('PostsContainerComponent')
      console.log(PostsContainerComponent)
      PostsContainerComponent ? PostsContainerComponent.setCategory(cat, {scroll: true}) : false;
  }

  // selectCategory(){
  //
  // }

  render () {
    return (
      <View style={styles.content}>
        <CategoriesList
          selectedCategory={this.selectedCategory}
          style={styles.categories} />
        <View style={styles.container}>
          <PostContainer ref={(postContainer) => { PostsContainerComponent = postContainer}}/>
        </View>
      </View>
    )
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
