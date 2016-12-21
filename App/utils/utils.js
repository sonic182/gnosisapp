import React from 'react';
import { XmlEntities } from 'html-entities';

	// moment.locale('es');

import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
} from 'react-native';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
const entities = new XmlEntities();

export default {
	entities: entities,
	Touchable: Touchable,
	truncatechars: (str, limit, delimiter) => {
		delimiter = delimiter ? delimiter : '...'
		return str.length <= limit ? str : `${str.substr(0, limit)}...`;
	},
	truncatewords: function (str, limit, delimiter) {
		delimiter = delimiter ? delimiter : '...'
		let match = str.match(/\S+/g);
		// console.log('match')
		// console.log(match)
		return match.length > limit ? this.getWords(match, limit, delimiter) : str;
	},
	getWords: (str, limit, delimiter) => {
		let res = '';
		for (var i = 0; i < limit; i++) {
			str[i]
			res = `${res} ${str[i]}`;
		}
		return res.substr(1, res.length) + delimiter;
	}
}
