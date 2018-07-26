import React, {Component} from "react"
import {connect} from "react-redux"
import "./RequirementListMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"
import L from "../../lang/L"
import {setExtended, setSelectedTabKey} from "../../modules/RequirementList"
import TabListMobile from "../TabListMobile/TabListMobile"

const TITLE_HEIGHT = 29
const ONE_ROW_HEIGHT = 19
const VISIBLE_ITEMS_COUNT = 2

class RequirementListMobile extends Component {

	extendable = null
	retractedVisibleHeight = 0
	itemsHeightCalculated = 0

	setHeightList(ref) {
		if (ref && this.itemsHeightCalculated < VISIBLE_ITEMS_COUNT) {
			this.retractedVisibleHeight += ref.clientHeight
			this.itemsHeightCalculated++
		}
	}

	getRetractedVisibleHeight() {
		return this.retractedVisibleHeight + TITLE_HEIGHT
	}

	componentDidMount() {
		if (this.extendable) {
			if (this.extendable.clientHeight > (this.getRetractedVisibleHeight() + ONE_ROW_HEIGHT)) {
				this.props.setExtended(false)
			}
		}
	}

	onTabSelect(key) {
		this.props.setExtended(true)
		this.props.setSelectedTabKey(key)
	}

	render() {
		let {title, tabList, extended, selectedTabKey} = this.props
		let listStyle = !extended && this.retractedVisibleHeight ? {maxHeight: this.getRetractedVisibleHeight()} : {}
		let itemStyle = !extended ? {paddingBottom: 0} : {}
		return <div className="RequirementListMobile">
			<PanelMobile title={title}>
				<TabListMobile selectedKey={selectedTabKey}
							   marginTop={-8}
							   tabList={tabList.map(tab => tab.platform)}
							   onSelect={(key) => this.onTabSelect(key)}/>
				<div className="RequirementListMobile__list"
					 style={listStyle}
					 ref={extendable => this.extendable = extendable}>
					{tabList.length && tabList[selectedTabKey] ? tabList[selectedTabKey].blockList.map((block, blockKey) => {
						return <div className="RequirementListMobile__item" key={blockKey} style={itemStyle}>
							<div className="RequirementListMobile__title">
								{block.title}
							</div>
							{block.list && block.list.length ? block.list.map((item, key) => {
								return <div className="RequirementListMobile__description"
											ref={(ref) => this.setHeightList(ref)}
											key={key}>
									<span className="RequirementListMobile__feature">{item.feature}{':'}</span>{' '}
									<span>{item.requirement}</span>
								</div>
							}) : null}
						</div>
					}) : null}
				</div>
				{!extended ?
					<div className="RequirementListMobile__extend"
						 onClick={() => this.props.setExtended(true)}>
						{L.t('extend')}
					</div> : null}
			</PanelMobile>
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

export default connect(map, {setExtended, setSelectedTabKey})(RequirementListMobile)
