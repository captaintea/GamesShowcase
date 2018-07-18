import React, {Component} from "react"
import {connect} from "react-redux"
import "./CommunityList.css"
import Panel from "../Panel/Panel"

class CommunityList extends Component {


	renderList(list) {
		return <div className="CommunityList__list">
			{list.map((community, key) => {
				let imageStyle = {
					background: `url(${community.imageUrl}) no-repeat center center`,
					backgroundSize: 'cover',
				}
				return <div className="CommunityList__item" key={key}>
					<div>
						<a href={community.url} target="_blank">
							<div className="CommunityList__item-image" style={imageStyle}>
							</div>
						</a>
					</div>
					<div>
						<a href={community.url} target="_blank">
							<div className="CommunityList__item-title">
								<span className="href">
									{community.title}
								</span>
							</div>
						</a>
						<div className="CommunityList__item-description">
							<span>
								{community.description}
							</span>
						</div>
					</div>
				</div>
			})}
		</div>
	}

	render() {
		let {title, list} = this.props
		return <div className="CommunityList">
			<Panel title={title}>
				{this.renderList(list)}
			</Panel>
		</div>
	}
}

function map(state) {
	return {
		title: state.CommunityList.title,
		list: state.CommunityList.list,
	}
}

export default connect(map, {})(CommunityList)
