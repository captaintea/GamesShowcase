import React, {Component} from "react"
import "./ServerError.css"

export default class ServerError extends Component {

	render() {
		let {message} = this.props
		return <div className="ServerError">
			<div className="ServerError__body">
				<div className="ServerError__icon">
				</div>
				<div className="ServerError__message">
					{message}
				</div>
			</div>
		</div>
	}
}
