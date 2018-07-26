import React, {Component} from "react"
import {connect} from "react-redux"
import "./RequirementList.css"
import L from "../../lang/L"
import {setExtended, setSelectedTabKey} from "../../modules/RequirementList"
import TabList from "../TabList/TabList"

const MAX_RETRACTED_HEIGHT = 150
const PADDING_HEIGHT = 20
const BLOCK_WIDTH = 326

class RequirementList extends Component {

	extendable = null

	componentDidMount() {
		if (this.extendable) {
			if ((this.extendable.clientHeight - PADDING_HEIGHT) > MAX_RETRACTED_HEIGHT) {
				this.props.setExtended(false)
			}
		}
		this.afterUpdate()
	}

	componentDidUpdate() {
		this.afterUpdate()
	}

	afterUpdate() {
		if (window.onChangeHeight) {
			window.onChangeHeight(true)
		}
	}

	onTabSelect(key) {
		this.props.setExtended(true)
		this.props.setSelectedTabKey(key)
	}

	render() {
		let {title, extended, selectedTabKey, tabList} = this.props
		let listStyle = !extended ? {maxHeight: MAX_RETRACTED_HEIGHT} : {}
		let itemStyle = !extended ? {paddingBottom: 0} : {}
		return <div className="RequirementList">
			<div className="RequirementList__title">
				{title}
			</div>
			<TabList selectedKey={selectedTabKey}
					 tabList={tabList.map(tab => tab.platform)}
					 onSelect={(key) => this.onTabSelect(key)}/>
			<div className="RequirementList__list"
				 style={listStyle}
				 ref={extendable => this.extendable = extendable}>
				{tabList.length && tabList[selectedTabKey] ? tabList[selectedTabKey].blockList.map((block, blockKey) => {
					if (tabList[selectedTabKey].blockList.length !== 1) {
						itemStyle.width = BLOCK_WIDTH
					}
					return <div className="RequirementList__item" key={blockKey} style={itemStyle}>
						<div className="RequirementList__item-title">
							{block.title}
						</div>
						{block.list && block.list.length ? block.list.map((item, key) => {
							return <div className="RequirementList__item-description"
										key={key}>
								<div className="RequirementList__feature">
									{item.feature}
								</div>
								<div>
									{item.requirement}
								</div>
							</div>
						}) : null}
					</div>
				}) : null}
			</div>
			{!extended ?
				<div className="RequirementList__extend"
					 onClick={() => this.props.setExtended(true)}>
					{L.t('extend_no_dots')}
				</div>
			: null}
		</div>
	}
}

function map(state) {
	return {
		title: state.RequirementList.title,
		tabList: state.RequirementList.tabList,
		extended: state.RequirementList.extended,
		selectedTabKey: state.RequirementList.selectedTabKey,
	}
}

export default connect(map, {setExtended, setSelectedTabKey})(RequirementList)
