import React, {Component} from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native';

import utils from '../../utils/utils';
import Icon from 'react-native-vector-icons/FontAwesome';

const Touchable = utils.Touchable;

export default class SidebarItem extends Component {

	render () {
		const {icon, text, active, iconColor} = this.props;
		var icon_color = iconColor || "#2b6bc3";
		return (
			<Touchable>
				<View
					style={active ? styles.active: styles.item}
					>
					<Icon name={icon} size={22} color={icon_color}/>
					<Text style={styles.textStyle}>
						{text}
					</Text>
				</View>
			</Touchable>
		)
	}
}

const styles = StyleSheet.create({
	item: {
		// flex: 1,
		// alignItems: 'flex-start',
		// justifyContent: 'space-between',
		// backgroundColor: 'red',

		flexDirection: 'row',
		padding: 10,
		paddingHorizontal: 20,
		marginVertical: 5,
	},
	active: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		padding: 10,
		paddingHorizontal: 20,
		marginVertical: 5,
	},
	textStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 30,
	}
})
