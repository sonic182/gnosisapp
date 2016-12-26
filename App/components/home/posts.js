
import React, {Component} from 'react';
import {
	StyleSheet,
	ListView,
	RefreshControl,
} from 'react-native';

import Http from '../../services/http';
import PostItem from './post';


export default class PostContainer extends Component {

	constructor (props) {
		super(props)
		this.INITIAL_OFFSET = 0;
		this.NUMBER = 20; // posts per page
		this.offset = 0;

		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.ID !== r2.ID});
		this.state = {
			refreshing: false,
			posts: this.ds.cloneWithRows([{
				title: 'Cargando...',
			}]),
		};

		this.posts = this.state.posts;
	}

	componentDidMount () {
		this.getPosts()
	}

	customPostsFilter (post) {
		return post.title.toLowerCase().match(/conferencia/g) ? false : true;
	}

	getPosts = (opts) => {
		this.setState({refreshing: true});

		opts = opts || {};
		let {scroll} = opts
		let cat = this.category;
		this.offset = scroll ? 0 : this.offset;

		let params = {pretty: true, offset: this.offset, number: this.NUMBER};
		// console.log('params')
		// console.log(params)

		if ( cat && cat.ID !== 0)
			params.category = cat.slug

		let $promise = Http.get(Http.urlParams('posts', params))
		$promise.then((r) => r.json())
		.then((rJson) => {
			let responsePosts = rJson.posts;
			responsePosts.filter(this.customPostsFilter);

			let posts = scroll ? responsePosts : [...this.posts, ...responsePosts];
			this.posts = posts

			this.lastResponse = responsePosts;
			params.category ?
				this.setState({posts: this.ds.cloneWithRows(this.posts.filter(this.hasCategory(cat)))}) :
				this.setState({posts: this.ds.cloneWithRows(this.posts)});

			this.setState({refreshing: false});
			if (scroll)
				this.lv.scrollTo({y: 0, animated: true})
		})
		return $promise
	}

	setCategory = (cat, opts) => {
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
						<PostItem post={post} onPress={this.postShow(post)}/>
					)
				}}
				/>
		)
	}

	postShow = (post) => {
		return () => {
			post.URL ? this.props.navigator.push({title: 'PostView', post: post, back: true, my_title: post.title}) : false;
		}
	}

}

const styles = StyleSheet.create({
	homeList: {
    alignSelf: 'stretch',
  }
})
