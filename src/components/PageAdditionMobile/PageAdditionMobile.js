import React, {Component} from "react"
import {connect} from "react-redux"
import "./PageAdditionMobile.css"
import HeaderMobile from "../HeaderMobile/HeaderMobile"
import {popPage} from "../../modules/Page"

class PageAdditionMobile extends Component {

	groupItemsByPair(list) {
		let grouped = []
		let groupedItem = []
		list.forEach((item, key) => {
			if (!((key + 1) % 2)) {
				groupedItem.push(item)
				grouped.push(groupedItem)
				groupedItem = []
			} else {
				groupedItem.push(item)
			}
		})
		if (groupedItem.length) {
			grouped.push(groupedItem)
		}
		return grouped
	}

	render() {
		let {title, list} = this.props
		let grouped = this.groupItemsByPair(list)
		return <div className="PageAdditionMobile">
			<HeaderMobile title={title} onBack={() => this.props.popPage()}/>
			<div className="PageAdditionMobile__wrapper">
				<table cellSpacing={0} cellPadding={0}>
					<tbody>
					{grouped.map((additionGroup, groupKey) => {
						return <tr key={groupKey}>
							{additionGroup.map((additionItem, key) => {
								let imageStyle = {
									background: `url(${additionItem.imageUrl}) no-repeat center center`,
									backgroundSize: 'cover',
								}
								return <td className="PageAdditionMobile__item" key={key}>
									<div className="PageAdditionMobile__image-wrapper">
										<a target="_blank" href={additionItem.url}>
											<div className="PageAdditionMobile__item-image" style={imageStyle}>
											</div>
										</a>
									</div>
									<div className="PageAdditionMobile__item-title-wrapper">
										<a target="_blank" href={additionItem.url}>
											<div className="PageAdditionMobile__item-title">
												{additionItem.title}
											</div>
										</a>
									</div>
									<div className="PageAdditionMobile__item-price">
										{additionItem.price}
									</div>
								</td>
							})}
						</tr>
					})}
					</tbody>
				</table>
			</div>
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
