import React, {Component} from "react"
import "./NotFoundMobile.css"
import L from "../../lang/L"

export default class NotFoundMobile extends Component {

	onClick() {
		window.location.reload()
	}

	render() {
		let {deviceHeight} = this.props
		return <div className="NotFoundMobile" style={{minHeight: deviceHeight}}>
			<div className="NotFoundMobile__wrapper">
				<div className="NotFoundMobile__warning">
				</div>
				<div className="NotFoundMobile__title">
					{L.t('not_found')}
				</div>
				<div className="NotFoundMobile__controls">
					<button className="Button Button--primary mobile" onClick={() => this.onClick()}>
						{L.t('to_catalog')}
					</button>
				</div>
			</div>
		</div>
	}
}
