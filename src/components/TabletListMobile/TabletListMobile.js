import React, {Component} from "react"
import "./TabletListMobile.css"

export default class TabletListMobile extends Component {

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

	renderItem(item, key) {
		return this.props.renderItem(item, key)
	}

	render() {
		let {list} = this.props
		let grouped = this.groupItemsByPair(list)
		return <div className="TabletListMobile">
			<table cellSpacing={0} cellPadding={0}>
				<tbody>
				{grouped.map((group, groupKey) => {
					return <tr key={groupKey}>
						{group.map((item, key) => {
							return <td className="TabletListMobile__item" key={key}>
								{this.renderItem(item, key)}
							</td>
						})}
					</tr>
				})}
				</tbody>
			</table>
		</div>
	}
}
