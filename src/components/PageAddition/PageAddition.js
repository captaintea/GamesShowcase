import React, {Component} from "react"
import {connect} from "react-redux"
import "./PageAddition.css"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import ProductItem from "../ProductItem/ProductItem"
import TabletList from "../TabletList/TabletList"

const ITEM_WIDTH = 160

class PageAddition extends Component {

	renderItem(item) {
		return <ProductItem product={item} width={ITEM_WIDTH}/>
	}

	render() {
		let {list} = this.props
		return <div className="PageAddition">
			<Breadcrumbs/>
			<div className="PageAddition__list">
				<TabletList list={list} renderItem={(item) => this.renderItem(item)}/>
			</div>
		</div>
	}
}

function map(state) {
	return {
		list: state.AdditionList.list,
	}
}

export default connect(map, {})(PageAddition)
