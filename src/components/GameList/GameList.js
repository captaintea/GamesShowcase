import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameList.css"
import Panel from "../Panel/Panel"
import {nToBr} from "../../tools/helpers"
import {setDescriptionExtended} from "../../modules/GameList"
import L from "../../lang/L"
import Cashback from "../Cashback/Cashback"

const MAX_RETRACTED_HEIGHT = 57
const ONE_ROW_HEIGHT = 19

class GameList extends Component {

	extendable = null

	state = {
		loadedImageKeys: [],
	}

	componentDidMount() {
		if (this.extendable) {
			if ((this.extendable.clientHeight - ONE_ROW_HEIGHT) > MAX_RETRACTED_HEIGHT) {
				this.props.setDescriptionExtended(false)
			}
		}
	}

	onImageLoad(key) {
		this.setState({loadedImageKeys: this.state.loadedImageKeys.concat([key])})
	}

	render() {
		let {title, description, list, isDescriptionExtended} = this.props.gameList
		let descriptionStyle = !isDescriptionExtended ? {maxHeight: MAX_RETRACTED_HEIGHT} : {}
		return <div className="GameList">
			<Panel title={title} noMargin={true} noShadow={true}>
				<div className="GameList__description-wrapper">
					<div className="GameList__description"
						 ref={extendable => this.extendable = extendable}
						 style={descriptionStyle}>
						{nToBr(description)}
					</div>
					{!isDescriptionExtended ?
						<div className="GameList__extend"
							 onClick={() => this.props.setDescriptionExtended(true)}>
							{L.t('extend')}
					</div> : null}
				</div>
				<div className="GameList__list">
					{list.map((game, key) => {
						return <div className="GameList__item" key={key}>
							<div className="GameList__item-left">
								<div className="GameList__item-image-wrapper">
									<img className="GameList__item-image"
										 alt={game.name}
										 onLoad={() => this.onImageLoad(key)}
										 src={game.imageUrl}/>
									{game.discount && this.state.loadedImageKeys.indexOf(key) !== -1 ? <div className="GameList__discount-badge">
										{game.getPercentDiscount()}
									</div> : null}
								</div>
								<div className="GameList__item-info">
									<div className="GameList__item-title">
										<span>
											{game.name}
										</span>
									</div>
									{game.getInitialDescription() && game.getInitialDescription().length ?
										<div className="GameList__item-description">
											<span>
												{game.description}
											</span>
										</div>
									: null}
								</div>
							</div>
							<div className="GameList__item-right">
								<div className="GameList__item-bottom">
									{game.cashback ? <Cashback cashback={game.getCashbackView()}/> : null}
									{game.discount ?
										<div className="GameList__item-price GameList__item-price--old">
											{game.price}
										</div>
										: null}
									<div className={"GameList__item-price" +
									(game.discount ? ' GameList__item-price--discounted' : '')}>
									<span>
										{game.discount ? game.getDiscountedPrice() : game.price}
									</span>
									</div>
									<div className="GameList__controls">
										<button className="Button Button--green">
											{game.buttonTextMobile}
										</button>
									</div>
								</div>
							</div>
						</div>
					})}
				</div>
			</Panel>
		</div>
	}
}


function map(state) {
	return {
		gameList: state.GameList,
	}
}

export default connect(map, {setDescriptionExtended})(GameList)
