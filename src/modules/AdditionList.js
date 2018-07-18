import {getMoneyFormat} from "../tools/money"

export class AdditionItem {

	_imageUrl = null
	_title = null
	_price = null
	_url = null

	static fromRaw(raw) {
		let item = new AdditionItem()

		item._imageUrl = raw.image_url
		item._title = raw.title
		item._price = raw.price
		item._url = raw.url
		return item
	}

	get imageUrl() {
		return this._imageUrl
	}

	get title() {
		return this._title
	}

	get price() {
		return getMoneyFormat(this._price, '0 ₽')
	}

	get url() {
		return this._url
	}
}

const SET_LIST = "AdditionList.SET_LIST"
const SET_TITLE = "AdditionList.SET_TITLE"

const initState = {
	list: [],
	title: '',
}

const AdditionList = (state = initState, action) => {
	switch (action.type) {
		case SET_LIST:
			return {...state, list: action.list}
		case SET_TITLE:
			return {...state, title: action.title}
		default:
			return state
	}
}

export function setTitle(title) {
	return {
		type: SET_TITLE,
		title: title,
	}
}

export function setList(list) {
	return {
		type: SET_LIST,
		list: list,
	}
}


export function initAdditionList(title, rawList) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setList(rawList.map(rawItem => AdditionItem.fromRaw(rawItem))))
	}
}

export default AdditionList
