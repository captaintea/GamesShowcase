export class CoverItem {

	_url = null

	get url() {
		return this._url
	}

	static fromRaw(raw) {
		let item = new CoverItem()

		item._url = raw.url
		return item
	}

}

const SET_LIST = "CoverList.SET_LIST"

const initState = {
	list: [],
}

const CoverList = (state = initState, action) => {
	switch (action.type) {
		case SET_LIST:
			return {...state, list: action.list}
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

export function initCoverList(rawList) {
	return dispatch => {
		dispatch(setList(rawList.map(rawItem => CoverItem.fromRaw(rawItem))))
	}
}

export default CoverList
