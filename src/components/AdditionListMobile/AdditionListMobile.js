import React, {Component} from "react"
import {connect} from "react-redux"
import "./AdditionListMobile.css"
import SliderMobile from "../SliderMobile/SliderMobile"
import {PAGE_ADDITION, pushPage} from "../../modules/Page"

class AdditionListMobile extends Component {

	toAdditionPage() {
		if (typeof this.props.scrollTop === 'function') {
			this.props.scrollTop()
		}
		this.props.pushPage(PAGE_ADDITION)
	}

	renderItem(additionItem) {
		let imageStyle = {
			background: `url(${additionItem.imageUrl}) no-repeat center center`,
			backgroundSize: 'cover',
		}
		return <div className="AdditionListMobile__item">
			<div className="AdditionListMobile__image-wrapper">
				<a target="_blank" href={additionItem.url}>
					<div className="AdditionListMobile__item-image" style={imageStyle}>
					</div>
				</a>
			</div>
			<div className="AdditionListMobile__item-title-wrapper">
				<a target="_blank" href={additionItem.url}>
					<div className="AdditionListMobile__item-title">
						{additionItem.title}
					</div>
				</a>
			</div>
			<div className="AdditionListMobile__item-price">
				{additionItem.price}
			</div>
		</div>
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
