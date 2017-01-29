import React, {Component} from 'react'
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	Image,
} from 'react-native'

import MenuItem from './menu-item'


export default class Menu extends Component{
	render () {
		return (
			<ScrollView style={styles.container}>

				<View style={styles.optionsContainer}>
					<MenuItem icon='newspaper-o' text='Noticias' route={{title: 'News', index: 1}}/>
					{
						//<MenuItem icon='globe' text='Sedes' route={{title: 'Sedes', index: 1}}/>
					}
					<MenuItem icon='globe' text='Sedes'/>
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
					<MenuItem icon='facebook-square' text='Facebook' onClick={() => {
						Linking.openURL('https://www.facebook.com/gnosis.es/')
						.catch(err => console.error('An error occurred', err));
					}}/>
					<MenuItem icon='twitter-square' text='Twitter' onClick={() => {
						Linking.openURL('https://twitter.com/gnosis_es')
						.catch(err => console.error('An error occurred', err));
					}}/>
				</View>

				<View style={styles.optionsContainer}>
					<MenuItem icon='instagram' text='Instagram' onClick={() => {
						Linking.openURL('https://www.instagram.com/gnosis_es/')
						.catch(err => console.error('An error occurred', err));
					}}/>
					<MenuItem icon='cog' text='Configuración'/>
				</View>

			</ScrollView>
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
