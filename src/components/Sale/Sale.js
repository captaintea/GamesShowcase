import React, {Component} from "react"
import "./Sale.css"
import L from "../../lang/L"

export default class Sale extends Component {

	render() {
		let {startAt, finishAt} = this.props
		return <div className="Sale">
			{L.t('sale_period', {startAt, finishAt})}
		</div>
	}
}
