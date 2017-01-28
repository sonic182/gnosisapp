import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
} from 'react-native'

import MenuItem from './menu-item'


export default class Menu extends Component{
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.optionsContainer}>
					<MenuItem icon='newspaper-o' text='Noticias' route={{title: 'News', index: 1}}/>
					<MenuItem icon='globe' text='Sedes' />
				</View>
				<View style={styles.optionsContainer}>
					<MenuItem icon='microphone' text='Conferencias'/>
					<MenuItem icon='book' text='Libros'/>
				</View>
				<View style={styles.optionsContainer}>
					<MenuItem icon='headphones' text='Audios'/>
					<MenuItem icon='commenting' text='Chat'/>
				</View>
				<View style={styles.optionsContainer}>
					<MenuItem icon='facebook-square' text='Facebook'/>
					<MenuItem icon='twitter-square' text='Twitter'/>
				</View>
				<View style={styles.optionsContainer}>
					<MenuItem icon='cog' text='Configuración'/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
		// flexDirection: 'column',
		flexDirection: 'column',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // backgroundColor: '#dddddd',
		// paddingVertical: 15,
  },
	optionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		// backgroundColor: '#bbb',
		paddingVertical: 10,
	}
});
