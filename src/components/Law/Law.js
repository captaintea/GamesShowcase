import React, {Component} from "react"
import {connect} from "react-redux"
import "./Law.css"

class Law extends Component {

	render() {
		let {law} = this.props
		if (!law) {
			return null
		}
		return <div className="Law">
			<div className="Law__text">
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

export default connect(map, {})(Law)
