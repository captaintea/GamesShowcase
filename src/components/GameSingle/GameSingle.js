import React, {Component} from "react"
import {connect} from "react-redux"
import "./GameSingle.css"
import L from "../../lang/L"
import {setDescriptionExtended} from "../../modules/GameList"

const MAX_RETRACTED_HEIGHT = 57

class GameSingle extends Component {

	extendable = null

	state = {
		isImageLoaded: false,
	}

	componentDidMount() {
		if (this.extendable) {
			if (this.extendable.clientHeight > MAX_RETRACTED_HEIGHT) {
				this.props.setDescriptionExtended(false)
			}
		}
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

	render() {
		let {list, description, isDescriptionExtended} = this.props
		let game = list[0]
		if (!game) {
			return null
		}
		let listDescriptionStyle = !isDescriptionExtended ? {maxHeight: MAX_RETRACTED_HEIGHT} : {}
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
										<button className="Button Button--green">
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
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="GameSingle__description"
				 ref={extendable => this.extendable = extendable}
				 style={listDescriptionStyle}>
				{description}
			</div>
			{!isDescriptionExtended ?
				<div className="GameSingle__extend"
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
	}
}

export default connect(map, {setDescriptionExtended})(GameSingle)
