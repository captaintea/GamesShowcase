import React, {Component} from "react"
import {connect} from "react-redux"
import "./CommonInfoList.css"
import Panel from "../Panel/Panel"

class CommonInfoList extends Component {

	render() {
		let {title, list} = this.props
		return <div className="CommonInfoList">
			<Panel title={title}>
				<div className="CommonInfoList__list">
					{list.map((infoItem, infoItemKey) => {
						return <div className="CommonInfoList__item" key={infoItemKey}>
							<div className="CommonInfoList__item-title">
								{infoItem.title}
							</div>
							<ul>
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
