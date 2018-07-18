import {nToBr} from "../tools/helpers"

export class Law {

	_text = null

	static fromRaw(raw) {
		let item = new Law()

		item._text = raw.text
		return item
	}

	get text() {
		return nToBr(this._text)
	}
}

const initState = {
	law: null,
}

const SET_LAW = "Law.SET_LAW"

const LawModule = (state = initState, action) => {
	switch (action.type) {
		case SET_LAW:
			return {...state, law: action.law}
		default:
			return state
	}
}

export function setLaw(law) {
	return {
		type: SET_LAW,
		law: law,
	}
}

export function initLaw(raw) {
	return dispatch => {
		dispatch(setLaw(Law.fromRaw(raw)))
	}
}

export default LawModule
