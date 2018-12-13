import {getMoneyFormat} from "../tools/money"
import L from "../lang/L"

export class AdditionItem {

	_name = null
	_price = null
	_discount = null
	_imageUrl = null
	_cashback = null
	_url = null
	_showPrice = true
	_insteadOfPrice = null
	_platform = null
	_downloadForWindows = true

	static fromRaw(raw) {
		let item = new AdditionItem()

		item._name = raw.name
		item._description = raw.description
		item._price = raw.price
		item._discount = raw.discount
		item._imageUrl = raw.image_url
		item._cashback = raw.cashback
		item._url = raw.url
		item._showPrice = raw.show_price
		item._insteadOfPrice = raw.instead_of_price
		item._platform = raw.platform
		item._downloadForWindows = raw.download_for_windows
		return item
	}

	get name() {
		return this._name
	}

	get price() {
		return getMoneyFormat(this._price, '0 ₽')
	}

	get discount() {
		return this._discount
	}

	get imageUrl() {
		return this._imageUrl
	}

	originalPrice() {
		return this._price
	}

	getPercentDiscount() {
		return '-' + this._discount + '%'
	}

	getNumericDiscountPrice() {
		return this._discount ? Math.ceil(this._price - this._price * this._discount * 0.01) : this._price
	}

	getDiscountedPrice() {
		return getMoneyFormat(this.getNumericDiscountPrice(), '0 ₽')
	}

	get cashback() {
		return this._cashback
	}

	get url() {
		return this._url
	}

	getCalculatedCashback() {
		return L.t('cashback_value', {
			cashback: getMoneyFormat(this.getNumericDiscountPrice() * this._cashback * 0.01, '0 ₽')
		})
	}

	get showPrice() {
		return this._showPrice
	}

	get insteadOfPrice() {
		return this._insteadOfPrice
	}

	get platform() {
		return this._platform
	}

	get downloadForWindows() {
		return this._downloadForWindows
	}

	static getPlatformList() {
		return [
			'pc',
			'ps3',
			'ps4',
			'xbox',
		]
	}

	static getInsteadOfPriceList() {
		return [
			'payment_code',
			'fill_code',
		]
	}

	getInsteadOfPriceView() {
		return L.t(this._insteadOfPrice)
	}

	getPlatformView() {
		return L.t(this._platform)
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
