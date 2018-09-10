import React, {Component} from 'react'
import {connect} from "react-redux"
import './PopupMobile.css'

class PopupMobile extends Component {

	onClose() {
		this.props.onClose()
	}

	render() {
		return <div style={this.props.style || {}} className="PopupMobile">
			<div className="PopupMobile__close" onClick={() => this.onClose()}>
			</div>
			{this.props.children}
		</div>
	}

}

function mapStateToProps(state) {
	return {

	}
}

export default connect(mapStateToProps, {})(PopupMobile)
