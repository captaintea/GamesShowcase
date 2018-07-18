import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameListMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"
import ShareButtonMobile from "../ShareButtonMobile/ShareButtonMobile"

class GameListMobile extends Component {

	state = {
		loadedImageKeys: [],
	}

	getItemInfoMaxWidth() {
		const padding = 16
		const imageWidth = 80
		return this.props.deviceWidth - imageWidth - padding * 3
	}

	isSmallScreen() {
		return this.props.deviceWidth <= 320
	}

	onImageLoad(key) {
		this.setState({loadedImageKeys: this.state.loadedImageKeys.concat([key])})
	}

	render() {
		let {title, description, list, shareText, shareImageUrl} = this.props.gameList
		return <div className="GameListMobile">
			<PanelMobile title={title}>
				<div className="GameListMobile__description">
					{description}
				</div>
				<div className="GameListMobile__list">
					{list.map((game, key) => {
						return <div className="GameListMobile__item" key={key}>
							<table cellPadding={0} cellSpacing={0}>
								<tbody>
								<tr>
									<td className="GameListMobile__item-image-wrapper">
										<img className="GameListMobile__item-image"
											 alt={game.name}
											 onLoad={() => this.onImageLoad(key)}
											 src={game.imageUrl}/>
										{game.discount && this.state.loadedImageKeys.indexOf(key) !== -1 ?
											<div className="GameListMobile__discount-badge">
											{game.getPercentDiscount()}
										</div> : null}
									</td>
									<td className="GameListMobile__item-info" style={{width: this.getItemInfoMaxWidth()}}>
										<div className="GameListMobile__item-title">
											<span style={{maxWidth: this.getItemInfoMaxWidth()}}>
												{game.name}
											</span>
										</div>
										<div className="GameListMobile__item-bottom">
											<div className={"GameListMobile__item-price" +
											(game.discount ? ' GameListMobile__item-price--discounted' : '')}>
												<span>
													{game.discount ? game.getDiscountedPrice() : game.price}
												</span>
											</div>
											{game.discount ?
												<div className="GameListMobile__item-price GameListMobile__item-price--old">
													{game.price}
												</div>
											: null}
											<div className="GameListMobile__controls">

												<button className={"Button Button--green mobile" +
														(this.isSmallScreen() ? ' small' : '')}>
													{!this.isSmallScreen() ? game.buttonTextMobile : null}
												</button>
											</div>
										</div>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					})}
				</div>
				<ShareButtonMobile imageUrl={shareImageUrl} shareText={shareText} marginTop={20}/>
			</PanelMobile>
		</div>
	}
}


function map(state) {
	return {
		gameList: state.GameList,
	}
}

export default connect(map, {})(GameListMobile)
