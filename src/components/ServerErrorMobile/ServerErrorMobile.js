import React, {Component} from "react"
import "./ServerErrorMobile.css"

export default class ServerErrorMobile extends Component {

	render() {
		let {message} = this.props
		return <div className="ServerErrorMobile">
			<div className="ServerErrorMobile__body">
				<div className="ServerErrorMobile__icon">
				</div>
				<div className="ServerErrorMobile__message">
					{message}
				</div>
			</div>
		</div>
	}
}
