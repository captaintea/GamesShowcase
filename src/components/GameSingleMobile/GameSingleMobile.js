import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameSingleMobile.css"
import L from "../../lang/L"
import {setDescriptionExtended} from "../../modules/GameList"
import ShareButtonMobile from "../ShareButtonMobile/ShareButtonMobile"
import {nToBr} from "../../tools/helpers"
import Dotdotdot from 'react-dotdotdot'
import WarningMobile from "../WarningMobile/WarningMobile"
import {handlePayment} from "../../modules/PaymentModule"
import SaleMobile from "../SaleMobile/SaleMobile"

class GameSingleMobile extends Component {

	state = {
		isImageLoaded: false,
	}

	onImageLoad() {
		this.setState({isImageLoaded: true})
	}

	onButtonClick(game) {
		this.props.handlePayment(game)
	}

	render() {
		let {list, description, shareText, shareImageUrl} = this.props
		let game = list[0]
		if (!game) {
			return null
		}
		return <div className="GameSingleMobile">
			<table cellPadding={0} cellSpacing={0}>
				<tbody>
					<tr>
						<td className="GameSingleMobile__item-image-wrapper">
							<img className="GameSingleMobile__item-image"
								 onLoad={() => this.onImageLoad()}
								 alt={game.name}
								 src={game.imageUrl}/>
							{game.discount && this.state.isImageLoaded ?
								<div className="GameSingleMobile__discount-badge">
									{game.getPercentDiscount()}
							</div> : null}
						</td>
						<td className="GameSingleMobile__item-info">
							<div className="GameSingleMobile__item-title">
								{game.name}
							</div>
							<div className="GameSingleMobile__item-description">
								{game.description}
							</div>
							<div className="GameSingleMobile__item-bottom">
								<div className={"GameSingleMobile__item-price" +
								(game.discount ? ' GameSingleMobile__item-price--discounted' : '')}>
									{game.discount ? game.getDiscountedPrice() : game.price}
								</div>
								{game.discount ?
									<div className="GameSingleMobile__item-price GameSingleMobile__item-price--old">
										{game.price}
									</div>
									: null}
								{game.cashback ? <div className="GameSingleMobile__cashback">
									{game.getCashbackView()}{' '}{L.t('cashback')}
								</div> : null}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="GameSingleMobile__controls">
				<button className="Button Button--green mobile" onClick={() => this.onButtonClick(game)}>
					{game.buttonTextMobile}
				</button>
				<ShareButtonMobile imageUrl={shareImageUrl} shareText={shareText} marginTop={8}/>
			</div>
			{game.saleStartAt && game.saleFinishAt ?
				<SaleMobile startAt={game.saleStartAt} finishAt={game.saleFinishAt}/> : null}
			<div className="GameSingleMobile__description">
				<Dotdotdot clamp={10}>
					{nToBr(description)}
				</Dotdotdot>
			</div>
			<WarningMobile/>
		</div>
	}
}

function map(state) {
	return {
		list: state.GameList.list,
		description: state.GameList.description,
		isDescriptionExtended: state.GameList.isDescriptionExtended,
		shareText: state.GameList.shareText,
		shareImageUrl: state.GameList.shareImageUrl,
		gameList: state.GameList,
	}
}

export default connect(map, {setDescriptionExtended, handlePayment})(GameSingleMobile)
