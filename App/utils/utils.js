import React from 'react';
import { XmlEntities } from 'html-entities';
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
	}
}
