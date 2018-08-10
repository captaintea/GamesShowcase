import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameSingleMobile.css"
import L from "../../lang/L"
import {setDescriptionExtended} from "../../modules/GameList"
import ShareButtonMobile from "../ShareButtonMobile/ShareButtonMobile"
import {nToBr} from "../../tools/helpers"

const MAX_RETRACTED_HEIGHT = 63

class GameSingleMobile extends Component {

	extendable = null

	state = {
		isImageLoaded: false,
	}

	onImageLoad() {
		this.setState({isImageLoaded: true})
	}

	componentDidMount() {
		if (this.extendable) {
			if (this.extendable.clientHeight > MAX_RETRACTED_HEIGHT) {
				this.props.setDescriptionExtended(false)
			}
		}
	}

	render() {
		let {list, description, isDescriptionExtended, shareText, shareImageUrl} = this.props
		let game = list[0]
		if (!game) {
			return null
		}
		let listDescriptionStyle = !isDescriptionExtended ? {maxHeight: MAX_RETRACTED_HEIGHT} : {}
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
				<button className="Button Button--green mobile">
					{game.buttonTextMobile}
				</button>
				<ShareButtonMobile imageUrl={shareImageUrl} shareText={shareText} marginTop={8}/>
			</div>
			<div className="GameSingleMobile__description"
				 ref={extendable => this.extendable = extendable}
				 style={listDescriptionStyle}>
				{nToBr(description)}
			</div>
			{!isDescriptionExtended ?
				<div className="GameSingleMobile__extend"
					 onClick={() => this.props.setDescriptionExtended(true)}>
				{L.t('extend')}
			</div> : null}
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

export default connect(map, {setDescriptionExtended})(GameSingleMobile)
