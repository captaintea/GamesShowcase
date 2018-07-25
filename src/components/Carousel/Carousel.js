import React, {Component} from "react"
import {connect} from "react-redux"
import "./Carousel.css"
import Slider from "react-slick"
import "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function SampleNextArrow(props) {
	const { onClick } = props
	return (
		<div className="Carousel__control Carousel__control--next" onClick={onClick}>
			<div className="Carousel__control-shadow">
			</div>
		</div>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props
	return (
		<div className="Carousel__control Carousel__control--prev" onClick={onClick}>
			<div className="Carousel__control-shadow" >

			</div>
		</div>
	);
}

class Carousel extends Component {

	isSingleImage() {
		return this.props.list.length === 1
	}

	render() {
		let {list} = this.props
		let settings = {
			customPaging: () => {
				return (
					<div className="Carousel__dot">
					</div>
				)
			},
			dots: true,
			infinite: true,
			centerMode: !this.isSingleImage(),
			className: "center",
			centerPadding: "89px",
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			dotsClass: "Carousel__dot-list",
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		}
		return <div className="Carousel">
			<Slider {...settings}>
				{list.map((cover, key) => {
					let style = {
						background: `url(${cover.url}) no-repeat center center`,
						backgroundSize: 'cover',
					}
					return <div className={"Carousel__image-wrapper" +
					(this.isSingleImage() ? ' Carousel__image-wrapper--single' : '')} key={key}>
						<div className="Carousel__image">
							<div className="Carousel__image-inner" style={style}>

							</div>
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

export default connect(map, {})(Carousel)
