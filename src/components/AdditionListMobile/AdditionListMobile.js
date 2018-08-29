import React, {Component} from "react"
import {connect} from "react-redux"
import "./AdditionListMobile.css"
import SliderMobile from "../SliderMobile/SliderMobile"
import {PAGE_ADDITION, pushPage} from "../../modules/Page"
import ProductItemMobile from "../ProductItemMobile/ProductItemMobile"

const ITEM_WIDTH = 145

class AdditionListMobile extends Component {

	toAdditionPage() {
		if (typeof this.props.scrollTop === 'function') {
			this.props.scrollTop()
		}
		this.props.pushPage(PAGE_ADDITION)
	}

	renderItem(item) {
		return <ProductItemMobile product={item} width={ITEM_WIDTH}/>
	}

	render() {
		let {list, title} = this.props
		return <div className="AdditionListMobile">
			<SliderMobile deviceWidth={this.props.deviceWidth}
						  showAll={() => this.toAdditionPage()}
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

export default connect(map, {pushPage})(AdditionListMobile)
