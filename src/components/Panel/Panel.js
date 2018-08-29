import React, {Component} from "react"
import "./Panel.css"
import L from "../../lang/L"

export default class Panel extends Component {

	render() {
		let {title, noMargin, count, showAll, noShadow, noPaddingRight} = this.props
		let style = {}
		if (noMargin) {
			style.marginBottom = 0
		}
		let linkStyle = {}
		if (noPaddingRight) {
			style.paddingRight = 0
			linkStyle.paddingRight = 25
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
					{typeof showAll === "function" ? <div className="Panel__link href"
														  style={linkStyle}
														  onClick={() => this.props.showAll()}>
						{L.t('show_all')}
					</div> : null}
				</div>
			</div>
			{this.props.children ? this.props.children : null}
		</div>
	}
}
