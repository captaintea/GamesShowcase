import React, {Component} from "react"
import {connect} from "react-redux"
import "./RequirementList.css"
import L from "../../lang/L"
import {setExtended} from "../../modules/RequirementList"

const MAX_RETRACTED_HEIGHT = 85
const PADDING_HEIGHT = 20

class RequirementList extends Component {

	extendable = null

	componentDidMount() {
		if (this.extendable) {
			if ((this.extendable.clientHeight - PADDING_HEIGHT) > MAX_RETRACTED_HEIGHT) {
				this.props.setExtended(false)
			}
		}
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
		let {title, list, extended} = this.props
		let listStyle = !extended ? {maxHeight: MAX_RETRACTED_HEIGHT} : {}
		let itemStyle = !extended ? {paddingBottom: 0} : {}
		return <div className="RequirementList">
			<div className="RequirementList__title">
				{title}
			</div>
			<div className="RequirementList__list"
				 style={listStyle}
				 ref={extendable => this.extendable = extendable}>
				{list.map((item, key) => {
					return <div className="RequirementList__item" key={key} style={itemStyle}>
						<div className="RequirementList__item-title">
							{item.title}
						</div>
						<div className="RequirementList__item-description">
							{item.description}
						</div>
					</div>
				})}
			</div>
			{!extended ?
				<div className="RequirementList__extend"
					 onClick={() => this.props.setExtended(true)}>
					{L.t('extend_no_dots')}
				</div>
			: null}
		</div>
	}
}

function map(state) {
	return {
		title: state.RequirementList.title,
		list: state.RequirementList.list,
		extended: state.RequirementList.extended,
	}
}

export default connect(map, {setExtended})(RequirementList)
