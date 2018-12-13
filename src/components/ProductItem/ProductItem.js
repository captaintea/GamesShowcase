import React, {Component} from "react"
import "./ProductItem.css"
import L from "../../lang/L"
import {isWindows} from "../../tools/helpers"

export default class ProductItem extends Component {

	state = {
		isImageLoaded: false,
	}

	onImageLoad() {
		this.setState({isImageLoaded: true})
	}

	renderPrice(product) {
		return <div>
			<div className={"ProductItem__price" +
			(product.discount ? ' ProductItem__price--discounted' : '')}>
				{product.discount ? product.getDiscountedPrice() : product.price}
			</div>
			{product.discount ?
				<div className="ProductItem__price ProductItem__price--old">
					{product.price}
				</div>
				: null}
			{product.cashback ?
				<div className="ProductItem__cashback">
					{product.getCalculatedCashback()}
				</div>
				: null}
		</div>
	}

	renderInsteadOfPrice(product) {
		return <div>
			<div className="ProductItem__instead-of-price">
				{product.downloadForWindows ? L.t('download_for_win') : product.getInsteadOfPriceView()}
			</div>
		</div>
	}

	render() {
		let {product, width} = this.props
		let style = {}
		if (width) {
			style.width = width
		}
		let linksStyle = {}
		if (product.downloadForWindows && !isWindows()) {
			style.opacity = 0.7
			linksStyle.pointerEvents = 'none'
		}
		return <div className="ProductItem" style={style}>
			<div className="ProductItem__image-wrapper">
				<a target="_blank" href={product.url} style={linksStyle}>
					<img className="ProductItem__image"
						 onLoad={() => this.onImageLoad()}
						 alt={product.name}
						 src={product.imageUrl}/>
					{product.discount && this.state.isImageLoaded ?
						<div className="ProductItem__discount-badge">
							{product.getPercentDiscount()}
						</div> : null}
					{product.platform ? <div className="ProductItem__platform">
						<div className="ProductItem__platform-text">
							{product.getPlatformView()}
						</div>
					</div> : null}
				</a>
			</div>
			<div className="ProductItem__title-wrapper">
				<a target="_blank" href={product.url} style={linksStyle}>
					<span className="ProductItem__title">
						{product.name}
					</span>
				</a>
			</div>
			{product.showPrice ? this.renderPrice(product) : this.renderInsteadOfPrice(product)}
		</div>
	}
}
