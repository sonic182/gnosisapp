import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import gnosisApp from './redux/reducers';
import Main from './components/main'

let store = createStore(
	gnosisApp,
	applyMiddleware(thunk),
)


export default class App extends Component{
	render () {
		return (
			<Provider store={store}>
				<Main/>
			</Provider>
		)
	}
}
