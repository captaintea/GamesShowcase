import React, {Component} from "react"
import {connect} from "react-redux"
import "./PageVideo.css"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"

class PageVideo extends Component {

	render() {
		let {list} = this.props
		return <div className="PageVideo">
			<Breadcrumbs/>
			<div className="PageVideo__list">
				{list.map((videoItem, key) => {
					let imageStyle = {
						background: `url(${videoItem.previewImageUrl}) no-repeat center center`,
						backgroundSize: 'cover',
					}
					return <div className="PageVideo__item" key={key}>
						<a target="_blank" href={videoItem.url}>
							<div className="PageVideo__item-image" style={imageStyle}>
								<div className="PageVideo__duration">
									<div className="PageVideo__duration-text">
										{videoItem.duration}
									</div>
								</div>
							</div>
						</a>
						<div className="PageVideo__item-title-wrapper">
							<a target="_blank" href={videoItem.url}>
								<div className="PageVideo__item-title">
									{videoItem.title}
								</div>
							</a>
						</div>
					</div>
				})}
			</div>
		</div>
	}
}

function map(state) {
	return {
		list: state.VideoList.list,
	}
}

export default connect(map, {})(PageVideo)
