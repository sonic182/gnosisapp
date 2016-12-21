
import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ListView,
	WebView,
	RefreshControl,
	Share,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/es';
import utils from '../../utils/utils';
const Touchable = utils.Touchable;




import Http from '../../services/http';


class PostItem extends Component {

	constructor (props) {
		super(props)
		this.CALENDAR_FORMAT = {
		    // sameDay: '[Today]',
		    // nextDay: '[Tomorrow]',
		    // nextWeek: 'dddd',
		    // lastDay: '[Yesterday]',
		    // lastWeek: '[Last] dddd',
		    sameElse: 'LL'
		}
		this.SANITIZE_OPTIONS = {
			allowedTags: [],
		  allowedAttributes: {
		    // 'a': [ 'href' ]
		  }
		}
	}

	_share(post) {
		let $this = this;
		return () => {
			// console.log('post')
			// console.log(post)
			Share.share({
				message: `Hey, mira esta publicación, puedes encontrarla interesante
					${post.URL}
				`,
				title: utils.entities.decode(post.title),
				url: post.URL,
			})
			.then($this._showResult)
		}
	}

	_showResult(result) {
		if (result.action === Share.sharedAction) {
			if (result.activityType) {
				// this.setState({result: 'shared with an activityType: ' + result.activityType});
				alert('shared with an activityType: ' + result.activityType);
			} else {
				// this.setState({result: 'shared'});
				alert('shared')
			}
		} else if (result.action === Share.dismissedAction) {
			// this.setState({result: 'dismissed'});
			alert('dismissed')
		}
	}

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
					<View style={styles.PostInfo}>
						<Text style={styles.postTitle}>
							{post.title ? utils.entities.decode(post.title) : ''}
						</Text>
						<Text style={styles.postResume}>
							{post.content ?
								utils.truncatewords(utils.entities.decode(post.content).replace(/<(?:.|\n)*?>/gm, ''), 25) :
								''}
						</Text>
					</View>
					<View style={styles.PostFooter}>
						<Text style={styles.PostFooterElement}>
							{post.date ? moment(post.date).calendar(moment(),this.CALENDAR_FORMAT) : ''}
						</Text>
						<Icon onPress={this._share(post)} style={styles.shareIcon} name="share-alt"  />
					</View>
				</View>
			</Touchable>
		)
		// <Touchable
		// 	onPress={() => {alert('share')}}
		// 	>
		// 	<Text>
		// 		Share
		// 	</Text>
		// </Touchable>
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
	PostInfo: {
		padding: 15
	},
	Post: {
		alignSelf: 'stretch',
		borderColor: '#eee',
		backgroundColor: '#fff',
		borderTopWidth: 5,
		borderBottomWidth: 5,
		marginVertical: 10,
	},
	PostFooter: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
		marginHorizontal: 15
	},
	postTitle: {
		fontSize: 18,
		marginVertical: 5,
		alignSelf: 'stretch',
		fontWeight: 'bold',
		color: '#222222',
	},
	logo: {
    alignSelf: 'stretch',
    height: 350,
  },
	homeList: {
    alignSelf: 'stretch',
  },
	PostFooterElement: {
		fontSize: 12,
		color: '#aaaaaa',
		paddingTop: 3,
		paddingBottom: 3,
	},
  shareIcon: {
    // backgroundColor: '#eee',
		paddingLeft: 15,
		paddingTop: 3,
		paddingBottom: 3,
		fontSize: 16,
		color: '#444',
  },
})
