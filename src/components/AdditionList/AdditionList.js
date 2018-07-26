import React, {Component} from "react"
import {connect} from "react-redux"
import "./AdditionList.css"
import VkSdk from "@happysanta/vk-sdk/index"
import {PAGE_ADDITION, pushPage} from "../../modules/Page"
import Panel from "../Panel/Panel"

class AdditionList extends Component {

	renderItem(additionItem) {
		let imageStyle = {
			background: `url(${additionItem.imageUrl}) no-repeat center center`,
			backgroundSize: 'cover',
		}
		return <div className="AdditionList__item">
			<div className="AdditionList__image-wrapper">
				<a target="_blank" href={additionItem.url}>
					<div className="AdditionList__item-image" style={imageStyle}>
					</div>
				</a>
			</div>
			<div className="AdditionList__item-title-wrapper">
				<a target="_blank" href={additionItem.url}>
					<div className="AdditionList__item-title href">
						{additionItem.title}
					</div>
				</a>
			</div>
			<div className="AdditionList__item-price">
				{additionItem.price}
			</div>
		</div>
	}

	onShowAll() {
		VkSdk.scrollTop(() => {}, 500)
		this.props.pushPage(PAGE_ADDITION, {display_name: this.props.title})
	}

	render() {
		let {list, title} = this.props
		let shortList = list.slice(0, 4)
		return <div className="AdditionList">
			<Panel title={title} showAll={() => this.onShowAll()} count={list.length}>
				<div className="AdditionList__list">
					{shortList.map((videoItem, key) => {
						return <div className="AdditionList__item" key={key}>
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
		list: state.AdditionList.list,
		title: state.AdditionList.title,
	}
}

export default connect(map, {pushPage})(AdditionList)
