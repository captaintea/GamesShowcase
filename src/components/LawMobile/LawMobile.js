import React, {Component} from "react"
import {connect} from "react-redux"
import "./LawMobile.css"

class LawMobile extends Component {

	render() {
		let {law} = this.props
		if (!law) {
			return null
		}
		return <div className="LawMobile">
			<div className="LawMobile__text">
				{law.text}
			</div>
		</div>
	}
}

function map(state) {
	return {
		law: state.LawModule.law
	}
}

export default connect(map, {})(LawMobile)
