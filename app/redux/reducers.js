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

	GET_POSTS,
	GET_POSTS_SUCCES,
	GET_POSTS_FAIL,

 } from './actions'


const initialStateNavigation = {
	navigator: null,
	stack: []
}

function navigationApp(state = initialStateNavigation, action) {
  switch(action.type){
		case PUSH_ROUTE:
		state.navigator.push(action.route)
		let stack = state.stack; stack.push(action.route)
		return Object.assign({}, state, {
			// navigator: state.navigator.push(action.route)
			stack: stack
		})

		case POP_ROUTE:
		state.stack.pop()
		state.navigator.pop()
		return Object.assign({}, state, {
			// navigator: state.navigator.pop(),
			navigator: state.navigator,
			stack: state.stack,
		})

		case SET_NAVIGATOR:
		return Object.assign({}, state, {
			navigator: action.navigator,
			stack: [action.route]
		})

		default:
		return state;
	}
}

const initialStateNews = () => {
	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.ID !== r2.ID})
	return {
		categories: [{name: 'Todo', ID: 0, selected: true}],
		posts: ds.cloneWithRows([{
			title: 'Cargando...',
		}]),
		refreshing: false,
		error: false,
		ds: ds
	}
}

function newsApp(state = initialStateNews(), action) {
  switch(action.type){

		case SET_CATEGORY:
		return Object.assign({}, state, {
			categories: state.categories.map((c) => {
				c.selected = false
				if (c.ID == action.category.ID)
					c.selected = true
				return c
			})
		})

		case SET_CATEGORIES:
		return Object.assign({}, state, {
			categories: action.categories,
		})

		case GET_POSTS:
		return Object.assign({}, state, {
			refreshing: true,
			error: false,
		})

		case GET_POSTS_SUCCES:
		let posts = state.ds.cloneWithRows(action.res.posts.posts)
		return Object.assign({}, state, {
			refreshing: false,
			posts: posts,
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
