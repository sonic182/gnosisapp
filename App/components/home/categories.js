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

class Category extends Component {

	render () {
		const categoryStyle = [styles.category]
		const categoryTextStyle = [styles.categoryText]
		const categoryTextSelectedStyle = [styles.categoryTextSelected]
		const categorySelectedStyle = [styles.categorySelected]

		return (
			<Touchable
				accessibilityComponentType="button"
				onPress={this.props.onPress}
				style={styles.category}>
				<View style={this.props.selected ? categorySelectedStyle : categoryStyle}>
          <Text style={this.props.selected ? categoryTextSelectedStyle: categoryTextStyle}>{this.props.name}</Text>
        </View>
			</Touchable>
		)
	}
}

export default class CategoriesList extends Component {

	categoriesFilter (c) {
		return c.post_count !== 0
	}

	constructor (props) {
		super(props)
		let ALL_CATEGORY = {name: 'All', ID: 0, selected: true};
		this.state = {
			categories: [ALL_CATEGORY]
		}
		Http.get('categories')
		.then((r) => r.json())
		.then((rJson) => {
			// console.log('rJson')
			// console.log(rJson)
			this.setState({categories: [ALL_CATEGORY, ... rJson.categories.filter(this.categoriesFilter)]})
		})
		this.focusCategory.bind(this);
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
			this.props.selectedCategory(c)
			this.setState({categories: this.state.categories})
		}
	}
}

const styles = StyleSheet.create({
	category: {
		backgroundColor: 'blue',
		height: 40,
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	categoriesContent: {
		// alignSelf: 'stretch',
		// alignItems: 'center',
	},
	categories: {
		height: 35,
		backgroundColor: 'white',
	},
	category: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#ffffff',
      // borderRadius: 2,
			paddingHorizontal: 7
    },
  }),
	categorySelected: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#ffffff',
			backgroundColor: '#444',
      // color: '#ffffff',
      // borderRadius: 2,
			paddingHorizontal: 7
    },
  }),
  categoryText: Platform.select({
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
  categoryTextSelected: Platform.select({
    ios: {
      color: '#444',
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
    },
    android: {
      textAlign: 'center',
      color: 'white',
      padding: 8,
      fontWeight: '500',
    },
  }),
})
