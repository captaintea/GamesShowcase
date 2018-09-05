import React, {Component} from "react"
import {connect} from "react-redux"
import "./Warning.css"

export class Warning extends Component {

	render() {
		let {text, borderTop} = this.props
		if (!text || !text.length) {
			return null
		}
		let classList = ["Warning"]
		if (borderTop) {
			classList.push("Warning--border-top")
		}
		return <div className={classList.join(' ')}>
			<div className="Warning__icon">
			</div>
			<div className="Warning__text">
				{text}
			</div>
		</div>
	}
}

function map(state) {
	return {
		text: state.WarningModule.text,
	}
}

export default connect(map, {})(Warning)
