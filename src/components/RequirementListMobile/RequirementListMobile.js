import React, {Component} from "react"
import {connect} from "react-redux"
import "./RequirementListMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"
import L from "../../lang/L"
import {setExtended} from "../../modules/RequirementList"

const MAX_RETRACTED_HEIGHT = 105

class RequirementListMobile extends Component {

	extendable = null

	componentDidMount() {
		if (this.extendable) {
			if (this.extendable.clientHeight > MAX_RETRACTED_HEIGHT) {
				this.props.setExtended(false)
			}
		}
	}

	render() {
		let {title, list, extended} = this.props
		let listStyle = !extended ? {maxHeight: MAX_RETRACTED_HEIGHT} : {}
		let itemStyle = !extended ? {paddingBottom: 0} : {}
		return <div className="RequirementListMobile">
			<PanelMobile title={title}>
				<div className="RequirementListMobile__list"
					 style={listStyle}
					 ref={extendable => this.extendable = extendable}>
					{list.map((item, key) => {
						return <div className="RequirementListMobile__item" key={key} style={itemStyle}>
							<div className="RequirementListMobile__title">
								{item.title}
							</div>
							<div className="RequirementListMobile__description">
								{item.description}
							</div>
						</div>
					})}
				</div>
				{!extended ?
					<div className="RequirementListMobile__extend"
						 onClick={() => this.props.setExtended(true)}>
						{L.t('extend')}
					</div> : null}
			</PanelMobile>
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

export default connect(map, {setExtended})(RequirementListMobile)
