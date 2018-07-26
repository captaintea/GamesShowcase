import {nToBr} from "../tools/helpers"

export class CommonInfoListItem {

	_text = null

	static fromRaw(raw) {
		let item = new CommonInfoListItem()

		item._text = raw.text

		return item
	}

	get text() {
		return nToBr(this._text)
	}
}

export class CommonInfoItem {

	_title = null
	_list = null
	_isBulleted = false

	static fromRaw(raw) {
		let item = new CommonInfoItem()

		item._title = raw.title
		item._list = raw.list.map(rawItem => CommonInfoListItem.fromRaw(rawItem))
		item._isBulleted = !!raw.is_bulleted

		return item
	}

	get title() {
		return this._title
	}

	get list() {
		return this._list
	}

	get isBulleted() {
		return this._isBulleted
	}
}

const SET_LIST = "CommonInfoList.SET_LIST"
const SET_TITLE = "CommonInfoList.SET_SET_TITLE"

const initState = {
	list: [],
	title: '',
}

const CommonInfoList = (state = initState, action) => {
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

export function initCommonInfoList(title, rawList) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setList(rawList.map(rawItem => CommonInfoItem.fromRaw(rawItem))))
	}
}

export default CommonInfoList
