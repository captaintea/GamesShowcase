import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameInfoMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"

class GameInfoMobile extends Component {

	render() {
		let {title, list} = this.props
		return <div className="GameInfoMobile">
			<PanelMobile title={title}>
				<div className="GameInfoMobile__list">
					{list.map((item, key) => {
						return <div className="GameInfoMobile__item" key={key}>
							<div className="GameInfoMobile__key">
								{item.title}
							</div>
							<div className="GameInfoMobile__value">
								{item.description}
							</div>
						</div>
					})}
				</div>
			</PanelMobile>
		</div>
	}
}

function map(state) {
	return {
		title: state.GameInfoList.title,
		list: state.GameInfoList.list
	}
}

export default connect(map, {})(GameInfoMobile)
