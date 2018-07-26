import React, {Component} from "react"
import "./TabListMobile.css"

export default class TabListMobile extends Component {

	onSelect(key) {
		this.props.onSelect(key)
	}

	render() {
		let {tabList, selectedKey, marginTop} = this.props
		let style = {}
		if (marginTop) {
			style.marginTop = marginTop
		}
		return <div className="TabListMobile" style={style}>
			<div className="TabListMobile__list">
				{tabList.map((tab, key) => {
					let tabClassList = ['TabListMobile__item']
					if (key === selectedKey) {
						tabClassList.push('TabListMobile__item--selected')
					}
					return <div className={tabClassList.join(' ')} key={key} onClick={() => this.onSelect(key)}>
						{tab}
					</div>
				})}
			</div>
		</div>
	}
}
