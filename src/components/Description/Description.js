import React, {Component} from "react"
import {connect} from "react-redux"
import "./Description.css"
import L from "../../lang/L"
import {setDescriptionExtended} from "../../modules/DescriptionModule"

class Description extends Component {

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

	render() {
		let {title, code, codeShort, extended} = this.props
		return <div className="Description" style={codeShort ? {} : {paddingBottom: 25}}>
			<div className="Description__title">
				{title}
			</div>
			<div className="Description__body">
				{codeShort && !extended ? codeShort : code}
			</div>
			{codeShort && !extended ? <div className="Description__extend"
										   onClick={() => this.props.setDescriptionExtended(true)}>
				{L.t('extend_no_dots')}
			</div> : extended ? <div className="Description__extend"
									 onClick={() => this.props.setDescriptionExtended(false)}>
				{L.t('hide')}
			</div> : null}
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

export default connect(map, {setDescriptionExtended})(Description)
