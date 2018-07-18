import {nToBr} from "../tools/helpers"

export class CommunityItem {

	_url = null
	_title = null
	_description = null
	_imageUrl = null

	static fromRaw(raw) {
		let item = new CommunityItem()

		item._url = raw.url
		item._title = raw.title
		item._description = raw.description
		item._imageUrl = raw.image_url
		return item
	}

	get url() {
		return this._url
	}

	get title() {
		return this._title
	}

	get description() {
		return nToBr(this._description)
	}

	get imageUrl() {
		return this._imageUrl
	}
}

const SET_LIST = "CommunityList.SET_LIST"
const SET_TITLE = "CommunityList.SET_SET_TITLE"

const initState = {
	list: [],
	title: '',
}

const CommunityList = (state = initState, action) => {
	switch (action.type) {
		case SET_LIST:
			return {...state, list: action.list}
		case SET_TITLE:
			return {...state, title: action.title}
		default:
			return state
	}
}

export function setList(list) {
	return {
		type: SET_LIST,
		list: list,
	}
}

export function setTitle(title) {
	return {
		type: SET_TITLE,
		title: title,
	}
}

export function initCommunityList(title, rawList) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setList(rawList.map(rawItem => CommunityItem.fromRaw(rawItem))))
	}
}

export default CommunityList
