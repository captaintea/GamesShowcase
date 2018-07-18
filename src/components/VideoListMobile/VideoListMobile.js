import React, {Component} from "react"
import {connect} from "react-redux"
import "./VideoListMobile.css"
import SliderMobile from "../SliderMobile/SliderMobile"
import {PAGE_VIDEO, pushPage} from "../../modules/Page"

class VideoListMobile extends Component {

	renderItem(videoItem) {
		let imageStyle = {
			background: `url(${videoItem.previewImageUrl}) no-repeat center center`,
			backgroundSize: 'cover',
		}
		return <div className="VideoListMobile__item">
			<div className="VideoListMobile__image-wrapper">
				<a target="_blank" href={videoItem.url}>
					<div className="VideoListMobile__item-image" style={imageStyle}>
						<div className="VideoListMobile__duration">
							<div className="VideoListMobile__duration-text">
								{videoItem.duration}
							</div>
						</div>
					</div>
				</a>
			</div>
			<div className="VideoListMobile__item-title-wrapper">
				<a target="_blank" href={videoItem.url}>
					<div className="VideoListMobile__item-title">
						{videoItem.title}
					</div>
				</a>
			</div>
		</div>
	}

	toVideoPage() {
		if (typeof this.props.scrollTop === 'function') {
			this.props.scrollTop()
		}
		this.props.pushPage(PAGE_VIDEO)
	}

	render() {
		let {list, title} = this.props
		return <div className="VideoListMobile">
			<SliderMobile deviceWidth={this.props.deviceWidth}
						  showAll={() => this.toVideoPage()}
						  title={title}
						  list={list}
						  renderItem={(item) => this.renderItem(item)}/>
		</div>
	}
}

function map(state) {
	return {
		list: state.VideoList.list,
		title: state.VideoList.title,
	}
}

export default connect(map, {pushPage})(VideoListMobile)
