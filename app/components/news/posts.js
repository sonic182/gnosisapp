
import React, {Component} from 'react';
import {
	StyleSheet,
	ListView,
	RefreshControl,
} from 'react-native';

import Http from '../../services/http';
import PostItem from './post';

import {connect} from 'react-redux'
import {
	pushRoute,
	fetchPosts,
	setListViewPosts,
} from '../../redux/actions'

class Posts extends Component {

	constructor (props) {
		super(props)
	}

	componentDidMount () {
		this.props.setListViewPosts(this.lv)
		this.props.fetchPosts()
	}


	_onRefresh() {
		// this.offset = this.INITIAL_OFFSET;
    // this.getPosts({scroll: true})
		this.props.fetchPosts({offset: 0 })
  }

	render () {
		return (
			<ListView
				ref={(lv) => { this.lv = lv }}
				refreshControl={
					<RefreshControl
						refreshing={this.props.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>}
				style={styles.homeList}
				dataSource={this.props.posts}
				enableEmptySections={true}
				onEndReached={() => {
					// return alert('onEndReached')
					if (this.props.last_response_count == this.props.posts_pagination && !this.props.refreshing ){
					// 	this.offset = this.offset + this.NUMBER;
					// 	// this.setState({offset: offset });
						// alert('more posts')
						this.props.fetchPosts({offset: '+'})
					}
				}}
				renderRow={(post) => {
					return (
						<PostItem post={post} onPress={() => {
							this.props.pushRoute({title: 'PostView', post: post, back: true, my_title: post.title})
						}}/>
					)
				}}
				/>
		)
	}

	postShow = (post) => {
		return () => {
			post.URL ? this.props.navigator.push() : false;
		}
	}

}

const styles = StyleSheet.create({
	homeList: {
    alignSelf: 'stretch',
  }
})

const stateToProps = (state) => {
	return {
		route: state.newsApp.current,
		posts_pagination: state.newsApp.posts_pagination,
		last_response_count: state.newsApp.last_response_count,
		posts: state.newsApp.posts,
		refreshing: state.newsApp.refreshing
	}
}

const dispatchToProps = (dispatch, props) => {
  return {
    pushRoute: (route) => {dispatch(pushRoute(route))},
    fetchPosts: (opts) => {dispatch(fetchPosts(opts))},
    setListViewPosts: (lv) => {dispatch(setListViewPosts(lv))},
  }
}

export default connect(stateToProps, dispatchToProps)(Posts)
