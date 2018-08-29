import React, {Component} from "react"
import "./TabletList.css"

export default class TabletList extends Component {

	componentDidMount() {
		this.afterUpdate()
	}

	componentDidUpdate() {
		this.afterUpdate()
	}

	afterUpdate() {
		if (window.onChangeHeight) {
			window.onChangeHeight(true)
		}
	}


	renderItem(item, key) {
		return this.props.renderItem(item, key)
	}

	render() {
		let {list, itemMargin} = this.props
		return <div className="TabletList">
			{list.map((item, key) => {
				let itemStyle = {}
				if (itemMargin) {
					itemStyle.margin = itemMargin
				}
				return <div className="TabletList__item" style={itemStyle} key={key}>
					{this.renderItem(item, key)}
				</div>
			})}
		</div>
	}
}
