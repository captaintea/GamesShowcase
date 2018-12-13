import React, {Component} from "react"
import "./ProductItemMobile.css"
import {isWindows} from "../../tools/helpers"
import L from "../../lang/L"

export default class ProductItemMobile extends Component {

	state = {
		isImageLoaded: false,
	}

	onImageLoad() {
		this.setState({isImageLoaded: true})
	}

	renderPrice(product) {
		return <div>
			<div className={"ProductItemMobile__price" +
			(product.discount ? ' ProductItemMobile__price--discounted' : '')}>
				{product.discount ? product.getDiscountedPrice() : product.price}
			</div>
			{product.discount ?
				<div className="ProductItemMobile__price ProductItemMobile__price--old">
					{product.price}
				</div>
				: null}
			{product.cashback ?
				<div className="ProductItemMobile__cashback">
					{product.getCalculatedCashback()}
				</div>
				: null}
		</div>
	}

	renderInsteadOfPrice(product) {
		return <div>
			<div className="ProductItemMobile__instead-of-price">
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
		return <div className="ProductItemMobile" style={style}>
			<div className="ProductItemMobile__image-wrapper">
				<a target="_blank" href={product.url} style={linksStyle}>
					<img className="ProductItemMobile__image"
						 onLoad={() => this.onImageLoad()}
						 alt={product.name}
						 src={product.imageUrl}/>
					{product.discount && this.state.isImageLoaded ?
						<div className="ProductItemMobile__discount-badge">
							{product.getPercentDiscount()}
						</div> : null}
				</a>
				{product.platform ? <div className="ProductItemMobile__platform">
					<div className="ProductItemMobile__platform-text">
						{product.getPlatformView()}
					</div>
				</div> : null}
			</div>
			<div className="ProductItemMobile__title-wrapper">
				<a target="_blank" href={product.url} style={linksStyle}>
					<span className="ProductItemMobile__title">
						{product.name}
					</span>
				</a>
			</div>
			{product.showPrice ? this.renderPrice(product) : this.renderInsteadOfPrice(product)}
		</div>
	}
}
