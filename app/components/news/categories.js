import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,

	Platform,
} from 'react-native';
import {connect} from 'react-redux'
import {
	setCategory,
	setCategories,
	fetchPosts,
} from '../../redux/actions'

import utils from '../../utils/utils';
import Http from '../../services/http';
const Touchable = utils.Touchable;

import Category from './category';

class CategoriesList extends Component {

	categoriesFilter (c) {
		// BUSINESS LOGIC

		// No conferencias posts
		if (c.slug.match('conferencia')){
			return false;
		}
		return c.post_count > 0
	}

	constructor (props) {
		super(props)
		this.ALL_CATEGORY = {name: 'Todo', ID: 0};
		// this.state = {
		// 	categories: [this.ALL_CATEGORY]
		// }
		// this.focusCategory.bind(this);
		this.getCategories.bind(this);
	}

	componentDidMount(){
		this.getCategories()
	}

	getCategories(){
		Http.get('categories')
		.then((r) => r.json())
		.then((rJson) => {
			this.props.setCategories([this.ALL_CATEGORY, ... rJson.categories.filter(this.categoriesFilter)])
			// this.setState({categories: [this.ALL_CATEGORY, ... rJson.categories.filter(this.categoriesFilter)]})
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
				{this.props.categories.map((c) =>
					<Category onPress={()=>{this.setCategory(c)}} key={c.ID.toString()} name={c.name} selected={ this.props.category.ID == c.ID} />
				)}
			</ScrollView>
		)
	}

	setCategory (c) {
		this.props.setCategory(c)
		this.props.fetchPosts({category: c, scroll: true})
	}

	// focusCategory (c) {
	// 	return () => {
	// 		this.state.categories.forEach((cat) => {
	// 			cat.selected = false;
	// 		})
	// 		c.selected = true;
	// 		this.setState({categories: this.state.categories})
	// 		this.props.selectedCategory(c)
	// 	}
	// }
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

const mapStateToProps = (state, props) => {
	return {
		categories: state.newsApp.categories,
		category: state.newsApp.category,
	}
}

const dispatchToProps = (dispatch, props) => {
	return {
		setCategory: (cat) => {dispatch(setCategory(cat))},
		setCategories: (cat) => {dispatch(setCategories(cat))},
		fetchPosts: (opts) => {dispatch(fetchPosts(opts))}
	}
}

export default connect(mapStateToProps, dispatchToProps)(CategoriesList)
