const SET_PAGE = "Page.SET_PAGE"
const POP_PAGE = "Page.POP_PAGE"
const SET_PARAMS = 'Page.SET_PARAMS'

export const PAGE_MAIN = "PAGE_MAIN"
export const PAGE_VIDEO = "PAGE_VIDEO"
export const PAGE_ADDITION = "PAGE_ADDITION"

export const POPUP_EMAIL = "Popup.POPUP_EMAIL"
export const POPUP_ERROR = "Popup.POPUP_ERROR"

const initState = {
	path: [],
	name: PAGE_MAIN,
	params: {
		display_name: null,
	}
}

const Page = (state = initState, action) => {
	switch (action.type) {
		case SET_PAGE:
			state.path.push({name: state.name, params: state.params})
			return Object.assign({}, state, {name: action.name}, {params: action.params})
		case POP_PAGE:
			let page = state.path.pop()
			if (page) {
				return Object.assign({}, state, page)
			} else {
				return Object.assign({}, initState)
			}
		case SET_PARAMS:
			return {...state, params: action.params}
		default:
			return state
	}
}

export function pushPage(name, params = {}) {
	pushHistoryState(name, params)
	return {
		type: SET_PAGE,
		name: name,
		params: params
	}
}

export function popPage(direct = false) {
	if (window.history && window.history.go && direct === false) {
		window.history.go(-1)
		return {type: ""}
	}
	return {
		type: POP_PAGE
	}
}

function pushHistoryState(name, params) {
	try {
		if (window.history && window.history.pushState) {
			window.history.pushState({params, name}, name, name + '.html')
		}
	} catch (e) {

	}
}

export function initHistory(storage) {
	window.onpopstate = function () {
		storage.dispatch(popPage(true))
	}
}

export function setPageParams(params) {
	return {type:SET_PARAMS, params}
}

export default Page
