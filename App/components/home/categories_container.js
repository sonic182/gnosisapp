import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
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
		return (
			<View style={styles.category}>
				<Text>
					{this.props.name}
				</Text>
			</View>
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
			<ScrollView horizontal={true} style={styles.categories}>
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
		height: 40
	}
})
