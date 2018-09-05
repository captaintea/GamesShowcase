import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameInfo.css"
import ShareButton from "../ShareButton/ShareButton"
import Warning from "../Warning/Warning"

class GameInfo extends Component {

	keysWidthList = []

	state = {
		minTitleWidth: 0,
	}

	componentDidMount() {
		this.setState({minTitleWidth: Math.max(...this.keysWidthList)})
	}

	rememberKeyWidth(el) {
		if (el && el.clientWidth && this.keysWidthList.length < this.props.list.length) {
			this.keysWidthList.push(el.clientWidth)
		}
	}

	render() {
		let {list, shareImageUrl, shareText} = this.props
		let titleStyle = {minWidth: this.state.minTitleWidth}
		let hasItems = list && list.length
		return <div className="GameInfo" style={hasItems ? {} : {paddingTop: 0}}>
			<div className="GameInfo__list">
				{list.map((item, key) => {
					return <div className="GameInfo__item" key={key}>
						<div className="GameInfo__key" style={titleStyle}
							 ref={el => this.rememberKeyWidth(el)}>
							{item.title}
						</div>
						<div className="GameInfo__value">
							{item.description}
						</div>
					</div>
				})}
			</div>
			<Warning borderTop={hasItems}/>
			<ShareButton imageUrl={shareImageUrl} shareText={shareText}/>
		</div>
	}
}

function map(state) {
	return {
		title: state.GameInfoList.title,
		list: state.GameInfoList.list,
		shareImageUrl: state.GameList.shareImageUrl,
		shareText: state.GameList.shareText,
	}
}

export default connect(map, {})(GameInfo)
