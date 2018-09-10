import {POPUP_EMAIL, POPUP_ERROR, setPageParams} from "./Page"
import L from "../lang/L"

const initState = {
	email: '',
	loading: false,
	error: '',
}

const SET_PAYMENT = "PaymentModule.SET_PAYMENT"

const PaymentModule = (state = initState, action) => {
	switch (action.type) {
		case SET_PAYMENT:
			return Object.assign({}, state, action.update)
		default:
			return state
	}
}

export function setLoading(loading) {
	return dispatch => dispatch(setPayment({loading}))
}

export function setError(text) {
	return dispatch => dispatch(setPayment({error: text}))
}

export function setPayment(update) {
	return {
		type: SET_PAYMENT,
		update: update,
	}
}

export function sendEmail(email) {
	return dispatch => {
		dispatch(setLoading(true))
		setTimeout(() => {
			dispatch(setPageParams({popup: false}))
			dispatch(setLoading(false))
		}, 1000)
	}
}

function getPaymentData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let isSuccess = Math.round(Math.random())
			if (isSuccess) {
				resolve()
			} else {
				reject({message: L.t('server_error')})
			}
		}, 1500)
	})
}

export function handlePayment(game) {
	return dispatch => {
		dispatch(setLoading(true))
			getPaymentData().then(() => {
				dispatch(setLoading(false))
				dispatch(setPageParams({popup: POPUP_EMAIL}))
			}).catch(e => {
				dispatch(setPageParams({popup: POPUP_ERROR}))
				dispatch(setError(e.message))
				dispatch(setLoading(false))
			})
	}
}

export function setEmail(email) {
	return dispatch => dispatch(setPayment({email: email}))
}

export default PaymentModule
