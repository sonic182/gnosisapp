import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,

	Platform,
} from 'react-native';

import utils from '../../utils/utils';
import Http from '../../services/http';
const Touchable = utils.Touchable;

import Category from './category';

export default class CategoriesList extends Component {

	categoriesFilter (c) {
		// BUSINESS LOGIC
		// console.log('c.slug')
		// console.log(c.slug)
		
		// No conferencias posts
		if (c.slug.match('conferencia')){
			return false;
		}
		return c.post_count > 0
	}

	constructor (props) {
		super(props)
		this.ALL_CATEGORY = {name: 'Todo', ID: 0, selected: true};
		this.state = {
			categories: [this.ALL_CATEGORY]
		}
		this.focusCategory.bind(this);
		this.getCategories.bind(this);
	}

	componentDidMount(){
		this.getCategories()
	}

	getCategories(){
		Http.get('categories')
		.then((r) => r.json())
		.then((rJson) => {
			// console.log('rJson')
			// console.log(rJson)
			this.setState({categories: [this.ALL_CATEGORY, ... rJson.categories.filter(this.categoriesFilter)]})
		})
	}

	render () {
		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.categories}
				contentContainerStyle={styles.categoriesContent}
				>
				{this.state.categories.map((c) =>
					<Category onPress={this.focusCategory(c)} key={c.ID.toString()} name={c.name} selected={c.selected} />
				)}
			</ScrollView>
		)
	}

	focusCategory (c) {
		return () => {
			this.state.categories.forEach((cat) => {
				cat.selected = false;
			})
			c.selected = true;
			this.setState({categories: this.state.categories})
			this.props.selectedCategory(c)
		}
	}
}

const styles = StyleSheet.create({
	categoriesContent: {
		// alignSelf: 'stretch',
		// alignItems: 'center',
	},
	categories: {
		height: 35,
		backgroundColor: 'white',
	},
})
