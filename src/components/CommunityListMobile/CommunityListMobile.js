import React, {Component} from "react"
import {connect} from "react-redux"
import "./CommunityListMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"

class CommunityListMobile extends Component {

	getItemTextMaxWidth() {
		const imageWidth = 48
		const padding = 16
		return this.props.deviceWidth - imageWidth - padding * 3
	}

	renderList(list) {
		return <div className="CommunityListMobile__list">
			<table cellPadding={0} cellSpacing={0}>
				<tbody>
				{list.map((community, key) => {
					let imageStyle = {
						background: `url(${community.imageUrl}) no-repeat center center`,
						backgroundSize: 'cover',
					}
					let textStyle = {
						maxWidth: this.getItemTextMaxWidth()
					}
					return <tr className="CommunityListMobile__item" key={key}>
						<td>
							<a href={community.url} target="_blank">
								<div className="CommunityListMobile__item-image" style={imageStyle}>
								</div>
							</a>
						</td>
						<td className="CommunityListMobile__item-info">
							<a href={community.url} target="_blank">
								<div className="CommunityListMobile__item-title">
								<span className="href mobile" style={textStyle}>
									{community.title}
								</span>
								</div>
								<div className="CommunityListMobile__item-description">
								<span style={textStyle}>
									{community.description}
								</span>
								</div>
							</a>
						</td>
					</tr>
				})}
				</tbody>
			</table>
		</div>
	}

	render() {
		let {title, list} = this.props
		return <div className="CommunityListMobile">
			<PanelMobile noMargin={true} title={title}>
				{this.renderList(list)}
			</PanelMobile>
		</div>
	}
}

function map(state) {
	return {
		title: state.CommunityList.title,
		list: state.CommunityList.list,
	}
}

export default connect(map, {})(CommunityListMobile)
