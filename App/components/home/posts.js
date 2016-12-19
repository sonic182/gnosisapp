
import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ListView,
	WebView,

	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
} from 'react-native';

import {XmlEntities} from 'html-entities';
const entities = new XmlEntities();
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity


import Http from '../../services/http';


class PostItem extends Component {

	render () {
		let post = this.props.post;
		return (
			<Touchable
				onPress={this.props.onPress}
				accessibilityComponentType="button">
				<View style={styles.Post}>
					{!post.featured_image ? false:
						<Image
							source={{uri: post.featured_image}}
							style={styles.logo}
							/>}
					<Text style={styles.postTitle}>
						{entities.decode(post.title)}
					</Text>
				</View>
			</Touchable>
		)
	}
}

export default class PostContainer extends Component {

	constructor (props) {
			super(props)
			// console.log('props')
			// console.log(props)
			const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.state = {
				posts: ds.cloneWithRows([{
					title: 'Loading...',
				}])
			};
			Http.get(Http.urlParams('posts', {pretty: true}))
			.then((r) => r.json())
			.then((rJson) => {
				// console.log('rJson')
				// console.log(rJson)
				// rJson.posts.forEach((p) => {
				//   console.log('p.title')
				//   console.log(p.title)
				// })
				this.setState({posts: ds.cloneWithRows(rJson.posts)})
			})
		}

	render () {
		return (
			<ListView
				style={styles.homeList}
				contentContainerStyle={styles.homeListContainer}
				dataSource={this.state.posts}
				renderRow={(post) => {
					return (
						<PostItem post={post} onPress={ () => {
							this.props.navigator.push({title: 'PostView', post: post, back: true, my_title: post.title})
						}}/>
					)
				}}
				/>
		)
	}

}

const styles = StyleSheet.create({
	Post: {
		alignSelf: 'stretch',
		borderColor: 'black',
		backgroundColor: '#fff',
		borderBottomWidth: 5,
		padding: 5,
		marginVertical: 5
	},
	postTitle: {
		fontSize: 22,
		textAlign: 'center'
	},
	logo: {
    alignSelf: 'stretch',
    // width: 200,
    height: 200,
  },
	homeList: {
    // backgroundColor: 'red',
    alignSelf: 'stretch',
  },
  homeListContainer: {
    // backgroundColor: 'blue',
    // alignItems: 'center',
  },
})
