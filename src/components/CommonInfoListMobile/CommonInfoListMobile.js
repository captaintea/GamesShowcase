import React, {Component} from "react"
import {connect} from "react-redux"
import "./CommonInfoListMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"

class CommonInfoListMobile extends Component {

	render() {
		let {title, list} = this.props
		return <div className="CommonInfoListMobile">
			<PanelMobile title={title}>
				<div className="CommonInfoListMobile__list">
					{list.map((infoItem, infoItemKey) => {
						let ulStyle = {}
						if (infoItem.isBulleted) {
							ulStyle.listStyleType = 'initial'
						}
						return <div className="CommonInfoListMobile__item" key={infoItemKey}>
							<div className="CommonInfoListMobile__item-title">
								{infoItem.title}
							</div>
							<ul style={ulStyle}>
								{infoItem.list.map((item, key) => {
									return <li key={key}>
										{item.text}
									</li>
								})}
							</ul>
						</div>
					})}
				</div>
			</PanelMobile>
		</div>
	}
}

function map(state) {
	return {
		title: state.CommonInfoList.title,
		list: state.CommonInfoList.list,
	}
}

export default connect(map, {})(CommonInfoListMobile)
