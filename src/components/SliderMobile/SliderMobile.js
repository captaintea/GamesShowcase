import React, {Component} from "react"
import "./SliderMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"

export default class SliderMobile extends Component {

	render() {
		let {list, title} = this.props
		return <div className="SliderMobile" style={{maxWidth: this.props.deviceWidth}}>
			<PanelMobile title={title}
						 slider={true}
						 noRightPadding={true}
						 noPaddingBottom={true}
						 showAll={() => this.props.showAll()}>
				<div className="SliderMobile__list">
					{list.map((videoItem, key) => {
						return <div className="SliderMobile__item" key={key}>
							{this.props.renderItem(videoItem, key)}
						</div>
					})}
				</div>
				<div className="SliderMobile__scroll-hide">
				</div>
			</PanelMobile>
		</div>
	}
}
