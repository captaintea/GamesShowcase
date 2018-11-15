import React, {Component} from "react"
import "./SaleMobile.css"
import L from "../../lang/L"

export default class SaleMobile extends Component {

	render() {
		let {startAt, finishAt} = this.props
		return <div className="SaleMobile">
			{L.t('sale_period', {startAt, finishAt})}
		</div>
	}
}
