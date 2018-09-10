import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameListMobile.css"
import PanelMobile from "../PanelMobile/PanelMobile"
import ShareButtonMobile from "../ShareButtonMobile/ShareButtonMobile"
import {nToBr} from "../../tools/helpers"
import L from "../../lang/L"
import {setDescriptionExtended} from "../../modules/GameList"
import Dotdotdot from 'react-dotdotdot'
import WarningMobile from "../WarningMobile/WarningMobile"
import {handlePayment} from "../../modules/PaymentModule"

const ITEM_TITLE_ONE_ROW_HEIGHT = 18

class GameListMobile extends Component {

	state = {
		loadedImageKeys: [],
		titleHeightList: [],
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

	rememberTitleHeight(titleRef, key) {
		if (titleRef && !this.state.titleHeightList[key]) {
			let newList = this.state.titleHeightList.concat([])
			newList[key] = titleRef.clientHeight
			this.setState({titleHeightList: newList})
		}
	}

	onButtonClick(game) {
		this.props.handlePayment(game)
	}

	render() {
		let {title, description, list, shareText, shareImageUrl} = this.props.gameList
		return <div className="GameListMobile">
			<PanelMobile title={title}>
				<div className="GameListMobile__description-wrapper">
					<div className="GameListMobile__description">
						<Dotdotdot clamp={10}>
							{nToBr(description)}
						</Dotdotdot>
					</div>
				</div>
				<div className="GameListMobile__list">
					{list.map((game, key) => {
						let titleHeight = this.state.titleHeightList[key]
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
										<div className="GameListMobile__item-title"
											 ref={ref => this.rememberTitleHeight(ref, key)}>
											<span style={{maxWidth: this.getItemInfoMaxWidth()}}>
												{game.name}
											</span>
										</div>
										{game.getInitialDescription() && game.getInitialDescription().length &&
										titleHeight && titleHeight <= ITEM_TITLE_ONE_ROW_HEIGHT ?
											<div className="GameListMobile__item-description">
												<span style={{maxWidth: this.getItemInfoMaxWidth()}}>
													{game.description}
												</span>
											</div>
										: null}
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
														(this.isSmallScreen() ? ' small' : '')}
														onClick={() => this.onButtonClick(game)}>
													{!this.isSmallScreen() ? game.buttonTextMobile : null}
												</button>
											</div>
										</div>
										{game.cashback ? <div className="GameListMobile__cashback">
											{game.getCashbackView()}{' '}{L.t('cashback')}
										</div> : null}
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					})}
				</div>
				<ShareButtonMobile imageUrl={shareImageUrl} shareText={shareText} marginTop={20}/>
				<WarningMobile/>
			</PanelMobile>
		</div>
	}
}


function map(state) {
	return {
		gameList: state.GameList,
		isDescriptionExtended: state.GameList.isDescriptionExtended,
	}
}

export default connect(map, {setDescriptionExtended, handlePayment})(GameListMobile)
