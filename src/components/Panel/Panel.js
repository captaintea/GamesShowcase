import React, {Component} from "react"
import "./Panel.css"
import L from "../../lang/L"

export default class Panel extends Component {

	render() {
		let {title, noMargin, count, showAll, noShadow} = this.props
		let style = {}
		if (noMargin) {
			style.marginBottom = 0
		}
		if (noShadow) {
			style.boxShadow = 'none'
		}
		return <div className="Panel" style={style}>
			<div className="Panel__header">
				<div className="Panel__header-left">
					<div className="Panel__title">
						{title}
					</div>
					{count !== undefined ? <div className="Panel__count">
						{count}
					</div> : null}
				</div>
				<div>
					{typeof showAll === "function" ? <div className="Panel__link href" onClick={() => this.props.showAll()}>
						{L.t('show_all')}
					</div> : null}
				</div>
			</div>
			{this.props.children ? this.props.children : null}
		</div>
	}
}
