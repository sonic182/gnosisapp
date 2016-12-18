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

import Http from '../../services/http';

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

	categoriesFilter (c) {
		return c.post_count !== 0
	}

	constructor (props) {
		super(props)
		this.state = {
			categories: [{name: 'Loading...', ID: 0}]
		}
		Http.get('categories')
		.then((r) => r.json())
		.then((rJson) => {
			// console.log('rJson')
			// console.log(rJson)
			this.setState({categories: rJson.categories.filter(this.categoriesFilter)})
		})
	}

	render () {
		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.categories}
				>
				{this.state.categories.map((c) =>
					<Category key={c.ID.toString()} name={c.name} />
				)}
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
