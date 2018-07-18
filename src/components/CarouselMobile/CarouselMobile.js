import React, {Component} from "react"
import {connect} from "react-redux"
import "./CarouselMobile.css"
import Slider from "react-slick"
import "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class CarouselMobile extends Component {

	render() {
		let {list} = this.props
		let settings = {
			customPaging: () => {
				return (
					<div className="CarouselMobile__dot">
					</div>
				)
			},
			dots: true,
			infinite: true,
			speed: 500,
			arrows: false,
			placeholders: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			dotsClass: "CarouselMobile__dot-list",
		};
		return <div className="CarouselMobile" style={{maxWidth: this.props.deviceWidth}} onTouchMove={e => e.preventDefault()}>
			<Slider {...settings}>
				{list.map((cover, key) => {
					let style = {
						background: `url(${cover.url}) no-repeat center center`,
						backgroundSize: 'cover',
					}
					return <div className="CarouselMobile__image" key={key} onTouchMove={e => e.preventDefault()}>
						<div className="CarouselMobile__image-inner" style={style} onTouchMove={e => e.preventDefault()}>

						</div>
					</div>
				})}
			</Slider>
		</div>
	}
}

function map(state) {
	return {
		list: state.CoverList.list,
	}
}

export default connect(map, {})(CarouselMobile)
