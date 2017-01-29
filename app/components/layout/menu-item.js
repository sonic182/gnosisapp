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
				this.props.route ?
					this.props.pushRoute() : this.props.onClick ?
						this.props.onClick() : alert('Esta sección no está disponible')
			}}>
			<View style={this.props.route || this.props.onClick ? styles.content : styles.no_available}>

				<Icon onPress={navigator.pop}
				 style={styles.menuIcon}
				 name={icon}
				 size={size || 30}
				 style={this.props.route || this.props.onClick ? styles.icon : styles.icon_no_available}
				 color={color || '#444444'} />

				<Text style={this.props.route || this.props.onClick ? styles.text : styles.text_no_available}>
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
	no_available: {
		backgroundColor: 'white',
		width: 140,
		padding: 15,
	},
	icon: {
		padding: 5,
		textAlign: 'center',
		color: '#444444',
	},
	icon_no_available: {
		padding: 5,
		textAlign: 'center',
		color: 'gray',
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
		// color: '#444444'
		color: '#444444'
	},
	text_no_available: {
		fontSize: 16,
		textAlign: 'center',
		// color: '#444444'
		color: 'gray'
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
