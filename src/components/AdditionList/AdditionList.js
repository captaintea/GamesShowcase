import React, {Component} from "react"
import {connect} from "react-redux"
import "./AdditionList.css"
import VkSdk from "@happysanta/vk-sdk/index"
import {PAGE_ADDITION, pushPage} from "../../modules/Page"
import Slider from "../Slider/Slider"
import ProductItem from "../ProductItem/ProductItem"

const ITEM_WIDTH = 145

class AdditionList extends Component {

	renderItem(item) {
		return <ProductItem product={item} width={ITEM_WIDTH}/>
	}

	onShowAll() {
		VkSdk.scrollTop(() => {}, 500)
		this.props.pushPage(PAGE_ADDITION, {display_name: this.props.title})
	}

	render() {
		let {list, title} = this.props
		return <div className="AdditionList">
			<Slider deviceWidth={this.props.deviceWidth}
					itemWidth={ITEM_WIDTH}
					showAll={() => this.onShowAll()}
					title={title}
					list={list}
					renderItem={(item) => this.renderItem(item)}/>
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
