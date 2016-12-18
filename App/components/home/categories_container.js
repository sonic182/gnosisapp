import React, { Component } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,

	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
	Text,
} from 'react-native';

let site = 'blog.mogollon.com.ve'
// let site = 'gnosisespaña.es'
let url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}/`

var http = {
	url: url,
	get: function(path, options){
		return fetch(`${url}${path}`, options)
	}
}

class Category extends Component {

	render () {
		const buttonStyle = [styles.button]
		const textStyle = [styles.text]
		const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

		return (
			<Touchable
				accessibilityComponentType="button"
				style={styles.category}>
				<View style={buttonStyle}>
          <Text style={textStyle}>{this.props.name}</Text>
        </View>
			</Touchable>
		)
	}
}

export default class CategoriesList extends Component {

	constructor (props) {
		super(props)
		http.get('categories')
		.then((r) => r.json())
		.then((rJson) => {
			console.log('rJson')
			console.log(rJson)
		})
	}

	render () {
		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.categories}
				>
				<Category name="C1"/>
				<Category name="C2"/>
				<Category name="C3"/>
				<Category name="C3"/>
				<Category name="C3"/>
				<Category name="C3"/>
				<Category name="C3"/>
				<Category name="C3"/>
				<Category name="C3"/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	category: {
		backgroundColor: 'blue',
		height: 40,
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	categories: {
		height: 35
	},
	button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#ffffff',
      // borderRadius: 2,
			paddingHorizontal: 7
    },
  }),
  text: Platform.select({
    ios: {
      color: '#444',
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
    },
    android: {
      textAlign: 'center',
      color: '#444',
      padding: 8,
      fontWeight: '500',
    },
  }),
})
