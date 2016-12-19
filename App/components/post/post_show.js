import React, { Component } from 'react'

import {
	View,
	Text,

	WebView,
	StyleSheet,
} from 'react-native';

export default class PostView extends Component {

	render () {
		let post = this.props.post
		// console.log('post')
		// console.log(post)
		return (
			<View style={styles.content}>
				<Text style={styles.title}>{post.title}</Text>
				<WebView
          style={styles.webview}
          source={{html: post.content}}
          scalesPageToFit={true}
        />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		// alignSelf: 'stretch',
	},
	title: {
		fontSize: 22,
		alignSelf: 'center',
		paddingVertical: 3,
	},
	webview: {
		flex: 1,
		alignSelf: 'stretch',
		// backgroundColor: 'purple',
		height: 100,
	}
})
