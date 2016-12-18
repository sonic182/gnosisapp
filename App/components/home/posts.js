
import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native';



export default class PostItem extends Component {

	render () {
		let post = this.props.post;
		return (
			<View style={{alignSelf: 'stretch'}}>
				{!post.featured_image ? false:
					<Image
						source={{uri: post.featured_image}}
						style={styles.logo}
						/> }
				<Text>
					{post.title}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	logo: {
    alignSelf: 'stretch',
    // width: 200,
    height: 200,
  }
})
