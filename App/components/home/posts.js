
import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ListView,
	WebView,
	RefreshControl,
} from 'react-native';

import utils from '../../utils/utils';
const Touchable = utils.Touchable;


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
						{post.title ? utils.entities.decode(post.title) : ''}
					</Text>
				</View>
			</Touchable>
		)
	}
}

export default class PostContainer extends Component {

	constructor (props) {
		super(props)
		this.INITIAL_OFFSET = 0;
		this.offset = 0;
		this.NUMBER = 20; // posts per page

		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.ID !== r2.ID});
		this.state = {
			refreshing: false,
			posts: this.ds.cloneWithRows([{
				title: 'Loading...',
			}]),
		};

		this.posts = this.state.posts;
		this.setCategory.bind(this);
		this.getPosts.bind(this);
	}

	componentDidMount () {
		this.getPosts()

	}

	getPosts(opts) {
		this.setState({refreshing: true});

		opts = opts || {};
		let {scroll} = opts
		let cat = this.category;
		this.offset = scroll ? 0 : this.offset;

		let params = {pretty: true, offset: this.offset};
		// console.log('params')
		// console.log(params)

		if ( cat && cat.ID !== 0)
			params.category = cat.slug

		let $promise = Http.get(Http.urlParams('posts', params))
		$promise.then((r) => r.json())
		.then((rJson) => {
			let posts = scroll ? rJson.posts : [...this.posts, ...rJson.posts];
			this.posts = posts

			this.lastResponse = rJson.posts;
			params.category ?
				this.setState({posts: this.ds.cloneWithRows(this.posts.filter(this.hasCategory(cat)))}) :
				this.setState({posts: this.ds.cloneWithRows(this.posts)});

			this.setState({refreshing: false});
			if (scroll)
				this.lv.scrollTo({y: 0, animated: true})
		})
		return $promise
	}

	setCategory (cat, opts) {
		this.category = cat;
		this.getPosts(opts);
	}

	hasCategory(cat){
		return (post) => {
			let res = Object.keys(post.categories).filter((c) => c === cat.name)
			return res.length
		}
	}

	_onRefresh() {
		this.offset = this.INITIAL_OFFSET;
    this.getPosts({scroll: true})
  }

	render () {
		return (
			<ListView
				ref={(lv) => {
					this.lv = lv
				}}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>}
				style={styles.homeList}
				contentContainerStyle={styles.homeListContainer}
				dataSource={this.state.posts}
				enableEmptySections={true}
				onEndReached={() => {
					// return alert('onEndReached')
					if (this.lastResponse.length == 20){
						this.offset = this.offset + this.NUMBER;
						// this.setState({offset: offset });
						this.getPosts()
					}
				}}
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
		borderColor: '#eee',
		backgroundColor: '#fff',
		// backgroundColor: 'red',
		// borderBottomWidth: 5,
		// borderRightWidth: 5,
		// borderWidth: 2,
		borderTopWidth: 5,
		borderBottomWidth: 5,
		padding: 5,
		marginVertical: 10,
		// marginHorizontal: 5
	},
	postTitle: {
		fontSize: 22,
		margin: -5,
		padding: 5,
		alignSelf: 'stretch',
		textAlign: 'center',
		// backgroundColor: 'red',
		backgroundColor: '#eee',
	},
	logo: {
    alignSelf: 'stretch',
    // width: 200,
    height: 350,
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
