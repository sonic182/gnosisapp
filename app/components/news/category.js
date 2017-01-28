import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,

	Platform,
} from 'react-native';

import utils from '../../utils/utils';
const Touchable = utils.Touchable;


export default class Category extends Component {

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

const styles = StyleSheet.create({
	category: {
		backgroundColor: 'blue',
		height: 40,
		paddingVertical: 10,
		paddingHorizontal: 30,
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
