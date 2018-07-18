import {nToBr} from "../tools/helpers"

export class GameInfoItem {

	_title = null
	_description = null

	static fromRaw(raw) {
		let item = new GameInfoItem()

		item._title = raw.title
		item._description = raw.description
		return item
	}

	get title() {
		return this._title
	}

	get description() {
		return nToBr(this._description)
	}
}

const SET_LIST = "GameInfoList.SET_LIST"
const SET_TITLE = "GameInfoList.SET_SET_TITLE"

const initState = {
	list: [],
	title: '',
}

const GameInfoList = (state = initState, action) => {
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

export function initGameInfoList(title, rawList) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setList(rawList.map(rawItem => GameInfoItem.fromRaw(rawItem))))
	}
}

export default GameInfoList
