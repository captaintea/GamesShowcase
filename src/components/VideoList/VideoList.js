import React, {Component} from "react"
import {connect} from "react-redux"
import "./VideoList.css"
import Panel from "../Panel/Panel"
import {PAGE_VIDEO, pushPage} from "../../modules/Page"
import VkSdk from "@happysanta/vk-sdk"

class VideoList extends Component {

	renderItem(videoItem) {
		let imageStyle = {
			background: `url(${videoItem.previewImageUrl}) no-repeat center center`,
			backgroundSize: 'cover',
		}
		return <div className="VideoList__item">
			<div className="VideoList__image-wrapper">
				<a target="_blank" href={videoItem.url}>
					<div className="VideoList__item-image" style={imageStyle}>
						<div className="VideoList__duration">
							<div className="VideoList__duration-text">
								{videoItem.duration}
							</div>
						</div>
					</div>
				</a>
			</div>
			<div className="VideoList__item-title-wrapper">
				<a target="_blank" href={videoItem.url}>
					<div className="VideoList__item-title href">
						{videoItem.title}
					</div>
				</a>
			</div>
		</div>
	}

	onShowAll() {
		VkSdk.scrollTop(() => {}, 500)
		this.props.pushPage(PAGE_VIDEO, {display_name: this.props.title})
	}

	render() {
		let {list, title} = this.props
		let shortList = list.slice(0, 3)
		return <div className="VideoList">
			<Panel title={title} showAll={() => this.onShowAll()} count={list.length}>
				<div className="VideoList__list">
					{shortList.map((videoItem, key) => {
						return <div className="VideoList__item" key={key}>
							{this.renderItem(videoItem, key)}
						</div>
					})}
				</div>
			</Panel>
		</div>
	}
}

function map(state) {
	return {
		list: state.VideoList.list,
		title: state.VideoList.title,
	}
}

export default connect(map, {pushPage})(VideoList)
