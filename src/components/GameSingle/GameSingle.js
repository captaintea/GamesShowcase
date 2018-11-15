import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameSingle.css"
import {setDescriptionExtended} from "../../modules/GameList"
import {nToBr} from "../../tools/helpers"
import Cashback from "../Cashback/Cashback"
import Dotdotdot from 'react-dotdotdot'
import {handlePayment} from "../../modules/PaymentModule"
import Sale from "../Sale/Sale"

class GameSingle extends Component {

	state = {
		isImageLoaded: false,
	}

	componentDidMount() {
		this.afterUpdate()
	}

	onImageLoad() {
		this.setState({isImageLoaded: true})
	}

	componentDidUpdate() {
		this.afterUpdate()
	}

	afterUpdate() {
		if (window.onChangeHeight) {
			window.onChangeHeight(true)
		}
	}

	onButtonClick(game) {
		this.props.handlePayment(game)
	}

	render() {
		let {list, description} = this.props
		let game = list[0]
		if (!game) {
			return null
		}
		return <div className="GameSingle">
			<table cellPadding={0} cellSpacing={0}>
				<tbody>
					<tr>
						<td className="GameSingle__item-image-wrapper">
							<img className="GameSingle__item-image"
								 alt={game.name}
								 onLoad={() => this.onImageLoad()}
								 src={game.imageUrl}/>
							{game.discount && this.state.isImageLoaded ? <div className="GameSingle__discount-badge">
								{game.getPercentDiscount()}
							</div> : null}
						</td>
						<td className="GameSingle__item-info">
							<div className="GameSingle__item-info-top">
								<div className="GameSingle__item-title">
									{game.name}
								</div>
								<div className="GameSingle__item-description">
									{game.description}
								</div>
							</div>
							<div className="GameSingle__item-info-bottom">
								<div className="GameSingle__bottom-left">
									<div className="GameSingle__controls">
										<button className="Button Button--green" onClick={() => this.onButtonClick(game)}>
											{game.buttonText}
										</button>
									</div>
									<div className={"GameSingle__item-price" +
									(game.discount ? ' GameSingle__item-price--discounted' : '')}>
										{game.discount ? game.getDiscountedPrice() : game.price}
									</div>
									{game.discount ?
										<div className="GameSingle__item-price GameSingle__item-price--old">
											{game.price}
										</div>
									: null}
									{game.cashback ? <Cashback dotBefore={true} cashback={game.getCashbackView()}/> : null}
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			{game.saleStartAt && game.saleFinishAt ?
				<Sale startAt={game.saleStartAt} finishAt={game.saleFinishAt}/> : null}
			<div className="GameSingle__description">
				<Dotdotdot clamp={5}>
					{nToBr(description)}
				</Dotdotdot>
			</div>
		</div>
	}
}

function map(state) {
	return {
		list: state.GameList.list,
		description: state.GameList.description,
		isDescriptionExtended: state.GameList.isDescriptionExtended,
	}
}

export default connect(map, {setDescriptionExtended, handlePayment})(GameSingle)
