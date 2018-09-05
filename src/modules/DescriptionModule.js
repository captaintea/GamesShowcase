const initState = {
	title: null,
	code: null,
	code_short: null,
	extended: false,
}

const SET_DESCRIPTION = "Law.SET_DESCRIPTION"

const Description = (state = initState, action) => {
	switch (action.type) {
		case SET_DESCRIPTION:
			return Object.assign({}, state, action.update)
		default:
			return state
	}
}

export function setDescription(update) {
	return {
		type: SET_DESCRIPTION,
		update: update,
	}
}

export function setDescriptionExtended(isExtended) {
	return dispatch => dispatch(setDescription({extended: isExtended}))
}

export function initDescription(description) {
	return dispatch => {
		dispatch(setDescription(description))
	}
}

export default Description
