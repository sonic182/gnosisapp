import { combineReducers } from 'redux'
import {
	ListView,
} from 'react-native'
import {
	PUSH_ROUTE,
	POP_ROUTE,

	SET_NAVIGATOR,
	SET_CATEGORY,
	SET_CATEGORIES,

	SET_LIST_VIEW_POSTS,
	GET_POSTS,
	GET_POSTS_SUCCES,
	GET_POSTS_FAIL,

 } from './actions'


const initialStateNavigation = {
	navigator: null,
	stack: [],
	current: null
}

function navigationApp(state = initialStateNavigation, action) {
  switch(action.type){
		case PUSH_ROUTE:
		state.navigator.push(action.route)
		let stack = state.stack; stack.push(action.route)
		return Object.assign({}, state, {
			// navigator: state.navigator.push(action.route)
			stack: stack,
			current: action.route
		})

		case POP_ROUTE:
		state.stack.pop()
		state.navigator.pop()
		return Object.assign({}, state, {
			// navigator: state.navigator.pop(),
			navigator: state.navigator,
			stack: state.stack,
			current: state.stack[state.stack.length - 1]
		})

		case SET_NAVIGATOR:
		return Object.assign({}, state, {
			navigator: action.navigator,
			stack: [action.route],
			current: action.route
		})

		default:
		return state;
	}
}

const initialStateNews = () => {
	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.ID !== r2.ID})
	let all_categories = {name: 'Todo', ID: 0};

	return {
		categories: [all_categories],
		posts: ds.cloneWithRows([{
			title: 'Cargando...',
		}]),
		lv: null, // list view component, to scroll to top if required
		_posts: [],
		category: all_categories,
		refreshing: false,
		last_response_count: 0,
		error: false,
		ds: ds
	}

}

function newsApp(state = initialStateNews(), action) {
  switch(action.type){

		case SET_CATEGORY:
		return Object.assign({}, state, {
			category: action.category
		})

		case SET_CATEGORIES:
		return Object.assign({}, state, {
			categories: action.categories,
		})

		case SET_LIST_VIEW_POSTS:
		return Object.assign({}, state, {
			lv: action.lv,
		})

		case GET_POSTS:
		let category = action.opts.category
		return Object.assign({}, state, {
			refreshing: true,
			error: false,
			category: category ? category : state.category
		})

		case GET_POSTS_SUCCES:
		let res_posts = action.data.res.posts;
		let _posts = action.data.opts.scroll ? res_posts : [...state._posts, ...res_posts]
		let postsDS = state.ds.cloneWithRows(_posts)
		if (action.data.opts.scroll)
			state.lv.scrollTo({y: 0, animated: true})

		return Object.assign({}, state, {
			last_response_count: _posts.length,
			refreshing: false,
			posts: postsDS,
			_posts: _posts,
			error: false,
		})

		case GET_POSTS_FAIL:
		return Object.assign({}, state, {
			refreshing: false,
			error: true,
		})

		default:
		return state;
	}
}

export default combineReducers({
	navigationApp,
	newsApp,
})
