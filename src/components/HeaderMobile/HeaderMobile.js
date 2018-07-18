import React, {Component} from "react"
import "./HeaderMobile.css"

export default class HeaderMobile extends Component {

	back() {
		this.props.onBack()
	}

	render() {
		let {title} = this.props
		return <div className="HeaderMobile">
			<div className="HeaderMobile__header">
				<span className="HeaderMobile__back" onClick={() => this.back()}>
				</span>
				<span>
					{title}
				</span>
			</div>
		</div>
	}
}
