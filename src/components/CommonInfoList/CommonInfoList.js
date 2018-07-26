import React, {Component} from "react"
import {connect} from "react-redux"
import "./CommonInfoList.css"
import Panel from "../Panel/Panel"

const BLOCK_WIDTH = 326

class CommonInfoList extends Component {

	render() {
		let {title, list} = this.props
		let itemStyle = {}
		if (list.length !== 1) {
			itemStyle.width = BLOCK_WIDTH
		}
		return <div className="CommonInfoList">
			<Panel title={title}>
				<div className="CommonInfoList__list">
					{list.map((infoItem, infoItemKey) => {
						let ulStyle = {}
						if (infoItem.isBulleted) {
							ulStyle.listStyleType = 'initial'
						}
						return <div className="CommonInfoList__item" key={infoItemKey} style={itemStyle}>
							<div className="CommonInfoList__item-title">
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
			</Panel>
		</div>
	}
}

function map(state) {
	return {
		title: state.CommonInfoList.title,
		list: state.CommonInfoList.list,
	}
}

export default connect(map, {})(CommonInfoList)
