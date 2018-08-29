import React, {Component} from "react"
import {connect} from "react-redux"
import "./PageAdditionMobile.css"
import HeaderMobile from "../HeaderMobile/HeaderMobile"
import {popPage} from "../../modules/Page"
import TabletListMobile from "../TabletListMobile/TabletListMobile"
import ProductItemMobile from "../ProductItemMobile/ProductItemMobile"

class PageAdditionMobile extends Component {

	renderItem(item) {
		return <ProductItemMobile product={item}/>
	}

	render() {
		let {title, list} = this.props
		return <div className="PageAdditionMobile">
			<HeaderMobile title={title} onBack={() => this.props.popPage()}/>
			<TabletListMobile list={list}
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

export default connect(map, {popPage})(PageAdditionMobile)
