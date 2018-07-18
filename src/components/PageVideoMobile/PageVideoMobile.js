import React, {Component} from "react"
import {connect} from "react-redux"
import "./PageVideoMobile.css"
import HeaderMobile from "../HeaderMobile/HeaderMobile"
import {popPage} from "../../modules/Page"

class PageVideoMobile extends Component {

	render() {
		let {title, list} = this.props
		return <div className="PageVideoMobile">
			<HeaderMobile title={title} onBack={() => this.props.popPage()}/>
			<div className="PageVideoMobile__wrapper">
				<table cellSpacing={0} cellPadding={0}>
					<tbody>
					{list.map((videoItem, key) => {
						let imageStyle = {
							background: `url(${videoItem.previewImageUrl}) no-repeat center center`,
							backgroundSize: 'cover',
						}
						return <tr className="PageVideoMobile__item" key={key}>
							<td className="PageVideoMobile__image-wrapper">
								<a target="_blank" href={videoItem.url}>
									<div className="PageVideoMobile__item-image" style={imageStyle}>
										<div className="PageVideoMobile__duration">
											<div className="PageVideoMobile__duration-text">
												{videoItem.duration}
											</div>
										</div>
									</div>
								</a>
							</td>
							<td>
								<a target="_blank" href={videoItem.url}>
									<div className="PageVideoMobile__item-title">
										{videoItem.title}
									</div>
								</a>
							</td>
						</tr>
					})}
					</tbody>
				</table>
			</div>
		</div>
	}
}

function map(state) {
	return {
		list: state.VideoList.list,
		title: state.VideoList.title,
	}
}

export default connect(map, {popPage})(PageVideoMobile)
