const initState = {
	text: null
}

const SET_WARNING = "Law.SET_WARNING"

const Description = (state = initState, action) => {
	switch (action.type) {
		case SET_WARNING:
			return Object.assign({}, state, action.update)
		default:
			return state
	}
}

export function setWarning(update) {
	return {
		type: SET_WARNING,
		update: update,
	}
}

export default Description
