import React, { Component } from 'react'

import {
	View,
	Text,

	WebView,
	StyleSheet,
	Linking,
} from 'react-native';

import utils from '../../utils/utils';

function BASE_HTML (content, img) {
	return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style>
		html, body{
			color: #444;
		}
		.content{
			background-color: #fff;
			position: relative;
			display: block;
			width: 100%;
			height: auto;
			padding: 15px;
			word-wrap: break-word;
			box-sizing: border-box;
		}
		pre, code{
			word-wrap: break-word;
		}
		figure {
			padding: 0px;
			margin: 0px;
			display: block;
			width: 100%;
		}
		img {
			display: block;
			width: 100%;
			height: auto;
		}
		li {
			margin-top: 10px;
		}
		</style>
	</head>
	<body>
		<div class="content">
			${img ? '<img src="'+img+'"style="width: 100%; height: auto;">' : ''}
			${content}
		</div>
		<script
		  src="http://code.jquery.com/jquery-2.2.4.min.js"
		  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
		  crossorigin="anonymous"></script>
		<script>
			$('img').each(function(ind, img) {
				img = $(img);
				img.attr('class', '');
			});
			$('figure').each(function(ind, fig) {
				fig = $(fig);
				fig.attr('class', '');
				fig.attr('style', '');
			});
			$('a').each(function(ind, a) {
				a = $(a);
				a.attr('target', '_blank');
			});
		</script>
	</body>
</html>
`
}

export default class PostView extends Component {

	render () {
		let post = this.props.post
		// console.log('post')
		// console.log(post)
		// console.log('post.content')
		// console.log(post.content)

		// Maybe a component to show title besides navbar
		// <Text style={styles.title}>{utils.entities.decode(post.title)}</Text>
		return (
			<View style={styles.content}>
				<WebView
					ref={(ref) => { this.webview = ref; }}
          style={styles.webview}
          source={{html: BASE_HTML(post.content, post.featured_image)}}
          scalesPageToFit={true}
					onNavigationStateChange={(event) => {
						// check if url is diferent from data:text/html If so, opens browser
						let match = event.url ? event.url.match('data:text') : true;
	          if (!match) {
	            this.webview.stopLoading();
	            Linking.openURL(event.url);
	          }
	        }}
        />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingTop: 15,
		// alignSelf: 'stretch',
	},
	title: {
		fontSize: 22,
		alignSelf: 'stretch',
		textAlign: 'center',
		paddingVertical: 3,
		backgroundColor: 'white',
	},
	webview: {
		flex: 1,
		alignSelf: 'stretch',
		// backgroundColor: 'purple',
		// height: 100,
	}
})
