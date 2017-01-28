import React, {Component} from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	WebView,
	Share,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import utils from '../../utils/utils';
import moment from 'moment';
import 'moment/locale/es';

const Touchable = utils.Touchable;


export default class PostItem extends Component {

	constructor (props) {
		super(props)
		this.CALENDAR_FORMAT = {
		    sameElse: 'LL'
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
		// If I want to manage share result...

		// if (result.action === Share.sharedAction) {
		// 	if (result.activityType) {
		// 		// this.setState({result: 'shared with an activityType: ' + result.activityType});
		// 		// alert('shared with an activityType: ' + result.activityType);
		// 	} else {
		// 		// this.setState({result: 'shared'});
		// 		// alert('shared')
		// 	}
		// } else if (result.action === Share.dismissedAction) {
		// 	// this.setState({result: 'dismissed'});
		// 	// alert('dismissed')
		// }
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
						{post.URL ? <Icon onPress={this._share(post)} style={styles.shareIcon} name="share-alt"  /> : <View/>}
					</View>
				</View>
			</Touchable>
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
