import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
} from 'react-native'

import { connect } from 'react-redux';
import {
	pushRoute,
} from '../../redux/actions'

import Icon from 'react-native-vector-icons/FontAwesome'


class MenuItem extends Component{
	render () {
		const {icon, size, color, text} = this.props
		return (
			<TouchableHighlight onPress={() => {
				this.props.route ? this.props.pushRoute() : alert('Esta sección no está disponible')
			}}>
			<View style={styles.content}>

				<Icon onPress={navigator.pop}
				 style={styles.menuIcon}
				 name={icon}
				 size={size || 30}
				 style={styles.icon}
				 color={color || '#444444'} />

				<Text style={styles.text}>
					{text}
				</Text>
			</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: 'white',
		width: 140,
		padding: 15,
	},
	icon: {
		padding: 5,
		textAlign: 'center'
	},
	text: {
		fontSize: 18,
		textAlign: 'center',
		color: '#444444'
	}
})

// const stateToProps = (state, props) => {
//   return {
//
//   }
// }

const dispatchToProps = (dispatch, props) => {
  return {
    pushRoute: () => {dispatch(pushRoute(props.route))}
  }
}

export default connect(null, dispatchToProps)(MenuItem)
