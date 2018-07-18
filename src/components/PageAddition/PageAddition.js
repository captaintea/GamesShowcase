import React, {Component} from "react"
import {connect} from "react-redux"
import "./PageAddition.css"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"

class PageAddition extends Component {

	render() {
		let {list} = this.props
		return <div className="PageAddition">
			<Breadcrumbs/>
			<div className="PageAddition__list">
				{list.map((additionItem, key) => {
					let imageStyle = {
						background: `url(${additionItem.imageUrl}) no-repeat center center`,
						backgroundSize: 'cover',
					}
					return <div className="PageAddition__item" key={key}>
						<div className="PageAddition__image-wrapper">
							<a target="_blank" href={additionItem.url}>
								<div className="PageAddition__item-image" style={imageStyle}>
								</div>
							</a>
						</div>
						<div className="PageAddition__item-title-wrapper">
							<a target="_blank" href={additionItem.url}>
								<div className="PageAddition__item-title">
									{additionItem.title}
								</div>
							</a>
						</div>
						<div className="PageAddition__item-price">
							{additionItem.price}
						</div>
					</div>
				})}
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
