import React, {Component} from "react"
import {connect} from "react-redux"
import "./WarningMobile.css"

export class WarningMobile extends Component {

	render() {
		let {text} = this.props
		if (!text || !text.length) {
			return null
		}
		return <div className="WarningMobile">
			<table cellPadding={0} cellSpacing={0}>
				<tbody>
					<tr>
						<td>
							<div className="WarningMobile__icon">
							</div>
						</td>
						<td>
							<div className="WarningMobile__text">
								{text}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	}
}

function map(state) {
	return {
		text: state.WarningModule.text,
	}
}

export default connect(map, {})(WarningMobile)
