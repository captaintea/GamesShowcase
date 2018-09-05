import React, {Component} from "react"
import {connect} from "react-redux"
import "./DescriptionMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"
import L from "../../lang/L"
import {setDescriptionExtended} from "../../modules/DescriptionModule"

class DescriptionMobile extends Component {

	render() {
		let {title, code, codeShort, extended} = this.props
		return <div className="DescriptionMobile">
			<PanelMobile title={title}>
				{codeShort && !extended ? codeShort : code}
				{codeShort && !extended ? <div className="DescriptionMobile__extend"
											   onClick={() => this.props.setDescriptionExtended(true)}>
					{L.t('extend')}
				</div> : extended ? <div className="DescriptionMobile__extend"
										 onClick={() => this.props.setDescriptionExtended(false)}>
					{L.t('hide')}
				</div> : null}
			</PanelMobile>
		</div>
	}
}

function map(state) {
	return {
		title: state.DescriptionModule.title,
		code: state.DescriptionModule.code,
		codeShort: state.DescriptionModule.code_short,
		extended: state.DescriptionModule.extended,
	}
}

export default connect(map, {setDescriptionExtended})(DescriptionMobile)
