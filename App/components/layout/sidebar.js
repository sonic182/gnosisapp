import React, {Component} from 'react'
import {
	View,
	Image,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';

import SidebarItem from './sidebar-item';

export default class Sidebar extends Component {

  render () {

    return (
      <View style={styles.sidebar}>
				<Image source={{uri: 'http://gnosiscolombia.org/images/inicio/socrates4.jpg' || 'https://placekitten.com/201/301'}} style={styles.sidebarImg}>
					<Text style={styles.imgText}>
						Gnosis España
					</Text>
				</Image>
				<ScrollView>
					<SidebarItem text="Publicaciones" icon="pencil" active={true} />
					<SidebarItem text="Conferencias" icon="bookmark" />
					<SidebarItem text="Libros" icon="book" />
					<SidebarItem text="Audios" icon="headphones" />
					<SidebarItem text="Sedes" icon="globe" />
					<SidebarItem text="Chat" icon="comments" />
					<SidebarItem text="Ayuda" icon="info-circle" />
				</ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
	sidebar: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'space-between'
	},
	sidebarImg: {
		height: 200,
		// padding: 15,
		justifyContent: 'flex-end',
	},
	imgText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		// flex: 1,
		// alignItems: 'center',
		// alignSelf: 'center',
		// justifyContent: 'center'
	}
})
