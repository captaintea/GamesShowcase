import {getTimeForUser} from "../tools/helpers"

export class VideoItem {

	_url = null
	_previewImageUrl = null
	_title = null
	_duration = null

	static fromRaw(raw) {
		let item = new VideoItem()

		item._url = raw.url
		item._previewImageUrl = raw.preview_image_url
		item._title = raw.title
		item._duration = raw.duration
		return item
	}

	get url() {
		return this._url
	}

	get previewImageUrl() {
		return this._previewImageUrl
	}

	get title() {
		return this._title
	}

	get duration() {
		return getTimeForUser(this._duration, true)
	}
}

const SET_LIST = "VideoList.SET_LIST"
const SET_TITLE = "VideoList.SET_TITLE"

const initState = {
	list: [],
	title: '',
}

const VideoList = (state = initState, action) => {
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


export function initVideoList(title, rawList) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setList(rawList.map(rawItem => VideoItem.fromRaw(rawItem))))
	}
}

export default VideoList
