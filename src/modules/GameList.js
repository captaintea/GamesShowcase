import {getMoneyFormat} from "../tools/money"
import {nToBr} from "../tools/helpers"

export class GameItem {

	_name = null
	_description = null
	_price = null
	_discount = null
	_imageUrl = null
	_buttonText = null
	_buttonTextMobile = null
	_cashback = null
	_isCashbackInPercent = false
	_saleStartAt = null
	_saleFinishAt = null


	static fromRaw(raw) {
		let item = new GameItem()

		item._name = raw.name
		item._description = raw.description
		item._price = raw.price
		item._discount = raw.discount
		item._imageUrl = raw.image_url
		item._buttonText = raw.button_text
		item._buttonTextMobile = raw.button_text_mobile
		item._cashback = raw.cashback
		item._isCashbackInPercent = raw.is_cashback_in_percent ? raw.is_cashback_in_percent : false
		item._saleStartAt = raw.sale_start_at
		item._saleFinishAt = raw.sale_finish_at
		return item
	}

	get name() {
		return this._name
	}

	get description() {
		return nToBr(this._description)
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

	get buttonText() {
		return this._buttonText
	}

	get buttonTextMobile() {
		return this._buttonTextMobile
	}

	getPercentDiscount() {
		return '-' + this._discount + '%'
	}

	getDiscountedPrice() {
		return getMoneyFormat(Math.ceil(this._price - this._price * this._discount * 0.01), '0 ₽')
	}

	getInitialDescription() {
		return this._description
	}

	getCashbackView() {
		return this.isCashbackInPercent ? this._cashback + '%' : getMoneyFormat(this._cashback, '0 ₽')
	}

	get cashback() {
		return this._cashback
	}

	get isCashbackInPercent() {
		return this._isCashbackInPercent
	}

	get saleStartAt() {
		return this._saleStartAt
	}

	get saleFinishAt() {
		return this._saleFinishAt
	}
}

const SET_LIST = "GameList.SET_LIST"
const SET_TITLE = "GameList.SET_TITLE"
const SET_DESCRIPTION = "GameList.SET_DESCRIPTION"
const SET_SHARE_TEXT = "GameList.SET_SHARE_TEXT"
const SET_SHARE_IMAGE_URL = "GameList.SET_SHARE_IMAGE_URL"
const SET_DESCRIPTION_EXTENDED = "GameList.SET_DESCRIPTION_EXTENDED"

const initState = {
	list: [],
	description: '',
	title: '',
	isDescriptionExtended: true,
	shareText: '',
	shareImageUrl: '',
}

const GameList = (state = initState, action) => {
	switch (action.type) {
		case SET_LIST:
			return {...state, list: action.list}
		case SET_DESCRIPTION:
			return {...state, description: action.description}
		case SET_DESCRIPTION_EXTENDED:
			return {...state, isDescriptionExtended: action.isExtended}
		case SET_TITLE:
			return {...state, title: action.title}
		case SET_SHARE_TEXT:
			return {...state, shareText: action.shareText}
		case SET_SHARE_IMAGE_URL:
			return {...state, shareImageUrl: action.shareImageUrl}
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

export function setDescriptionExtended(isExtended) {
	return {
		type: SET_DESCRIPTION_EXTENDED,
		isExtended: isExtended,
	}
}

export function setDescription(description) {
	return {
		type: SET_DESCRIPTION,
		description: description,
	}
}

export function setTitle(title) {
	return {
		type: SET_TITLE,
		title: title,
	}
}

export function setShareText(shareText) {
	return {
		type: SET_SHARE_TEXT,
		shareText: shareText,
	}
}

export function setShareImageUrl(shareImageUrl) {
	return {
		type: SET_SHARE_IMAGE_URL,
		shareImageUrl: shareImageUrl,
	}
}

export function initGameList(title, description, rawList, shareText, shareImageUrl) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setDescription(description))
		dispatch(setShareText(shareText))
		dispatch(setShareImageUrl(shareImageUrl))
		dispatch(setList(rawList.map(rawItem => GameItem.fromRaw(rawItem))))
	}
}

export default GameList
