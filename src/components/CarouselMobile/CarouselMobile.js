import React, {Component} from "react"
import {connect} from "react-redux"
import "./CarouselMobile.css"
import Slider from "react-slick"
import "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class CarouselMobile extends Component {

	carousel = null

	componentDidMount(){
		if (this.carousel) {
			this.carousel.addEventListener('touchstart', this.touchStart)
			this.carousel.addEventListener('touchmove', this.preventTouch, {passive: false})
		}
	}

	componentWillUnmount(){
		if (this.carousel) {
			this.carousel.removeEventListener('touchstart', this.touchStart)
			this.carousel.removeEventListener('touchmove', this.preventTouch, {passive: false})
		}
	}

	touchStart(e){
		this.firstClientX = e.touches[0].clientX
		this.firstClientY = e.touches[0].clientY
	}

	preventTouch(e){
		const minValue = 5 // threshold

		this.clientX = e.touches[0].clientX - this.firstClientX
		this.clientY = e.touches[0].clientY - this.firstClientY

		if(Math.abs(this.clientX) > minValue){
			e.preventDefault()
			e.returnValue = false
			return false
		}
	}

	isSingleImage() {
		return this.props.list.length === 1
	}

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
		return <div ref={(el) => {this.carousel = el}} className={"CarouselMobile"+ (this.isSingleImage() ? ' CarouselMobile--single' : '')}
					style={{maxWidth: this.props.deviceWidth}} onTouchMove={e => e.preventDefault()}>
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
