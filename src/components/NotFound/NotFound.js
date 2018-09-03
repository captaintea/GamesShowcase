import React, {Component} from "react"
import "./NotFound.css"
import L from "../../lang/L"

export default class NotFound extends Component {

	componentDidMount() {
		this.afterUpdate()
	}

	componentDidUpdate() {
		this.afterUpdate()
	}

	afterUpdate() {
		if (window.onChangeHeight) {
			window.onChangeHeight(true)
		}
	}

	onClick() {
		window.location.reload()
	}

	render() {
		return <div className="NotFound">
			<div className="NotFound__wrapper">
				<div className="NotFound__warning">
				</div>
				<div className="NotFound__title">
					{L.t('not_found')}
				</div>
				<div className="NotFound__controls">
					<button className="Button Button--primary" onClick={() => this.onClick()}>
						{L.t('to_catalog')}
					</button>
				</div>
			</div>
		</div>
	}
}
