export class RequirementBlockItem {

	_feature = null
	_requirement = null

	static fromRaw(raw) {
		let item = new RequirementBlockItem()
		item._feature = raw.feature
		item._requirement = raw.requirement

		return item
	}

	get feature() {
		return this._feature
	}

	get requirement() {
		return this._requirement
	}
}


export class RequirementBlock {

	_title = null
	_list = null

	static fromRaw(raw) {
		let block = new RequirementBlock()

		block._title = raw.title
		block._list = raw.list.map(item => RequirementBlockItem.fromRaw(item))
		return block
	}

	get title() {
		return this._title
	}

	get list() {
		return this._list
	}
}

export class RequirementTab {

	_platform = null
	_blockList = null

	static fromRaw(raw) {
		let tab = new RequirementTab()
		tab._platform = raw.platform
		tab._blockList = raw.block_list.map(item => RequirementBlock.fromRaw(item))

		return tab
	}

	get platform() {
		return this._platform
	}

	get blockList() {
		return this._blockList
	}
}

const SET_TAB_LIST = "RequirementList.SET_TAB_LIST"
const SET_TITLE = "RequirementList.SET_SET_TITLE"
const SET_EXTENDED = "RequirementList.SET_EXTENDED"
const SET_SELECTED_TAB_KEY = "RequirementList.SET_SELECTED_TAB_KEY"

const initState = {
	tabList: [],
	title: '',
	extended: true,
	selectedTabKey: 0,
}

const RequirementList = (state = initState, action) => {
	switch (action.type) {
		case SET_TAB_LIST:
			return {...state, tabList: action.tabList}
		case SET_TITLE:
			return {...state, title: action.title}
		case SET_EXTENDED:
			return {...state, extended: action.isExtended}
		case SET_SELECTED_TAB_KEY:
			return {...state, selectedTabKey: action.selectedTabKey}
		default:
			return state
	}
}

export function setTabList(tabList) {
	return {
		type: SET_TAB_LIST,
		tabList: tabList,
	}
}

export function setTitle(title) {
	return {
		type: SET_TITLE,
		title: title,
	}
}

export function setExtended(isExtended) {
	return {
		type: SET_EXTENDED,
		isExtended: isExtended,
	}
}

export function setSelectedTabKey(selectedTabKey) {
	return {
		type: SET_SELECTED_TAB_KEY,
		selectedTabKey: selectedTabKey,
	}
}

export function initRequirementList(title, rawTabList) {
	return dispatch => {
		dispatch(setTitle(title))
		dispatch(setTabList(rawTabList.map(rawItem => RequirementTab.fromRaw(rawItem))))
	}
}

export default RequirementList
