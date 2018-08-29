import React, {Component} from "react"
import "./Slider.css"
import Panel from "../Panel/Panel"

const ITEM_MARGIN_RIGHT = 12
const AFTER_SLIDE_OFFSET = 32

export default class Slider extends Component {

	sliderList = null

	state = {
		offset: 0,
		sliderWidth: 0,
		lastItem: false,
	}

	componentDidMount() {
		if (this.sliderList) {
			this.setState({sliderWidth: this.sliderList.clientWidth})
		}
	}

	getFullItemWidth() {
		return this.props.itemWidth + ITEM_MARGIN_RIGHT
	}

	getVisibleItemsCount() {
		if (this.props.list.length && this.state.sliderWidth) {
			let itemWidth = this.getFullItemWidth()
			return Math.floor(this.state.sliderWidth / itemWidth)
		} else {
			return 0
		}
	}

	getVisibleWidth() {
		if (this.props.list.length && this.state.sliderWidth) {
			let width =  this.getVisibleItemsCount() * this.getFullItemWidth()
			if (this.state.offset) {
				return width + AFTER_SLIDE_OFFSET
			} else {
				return width
			}
		} else {
			return 0
		}
	}

	setOffset(isLeft) {
		if (!isLeft) {
			if (!this.state.offset) {
				if (this.props.list.length === 5) {
					this.setState({offset: this.getFullItemWidth() - 62, lastItem: true})
				} else {
					this.setState({offset: this.state.offset + this.getFullItemWidth() - AFTER_SLIDE_OFFSET})
				}
			} else {
				let offset = this.state.offset + this.getFullItemWidth()
				if ((this.sliderList.scrollWidth - (this.getVisibleWidth() + this.state.offset)) < 200) {
					this.setState({lastItem: true})
					offset -= AFTER_SLIDE_OFFSET
				}
				this.setState({offset: offset})
			}
		} else {
			let offset = this.state.offset - this.getFullItemWidth()
			if (offset <= AFTER_SLIDE_OFFSET) {
				offset = 0
			} else if (this.state.lastItem) {
				offset += AFTER_SLIDE_OFFSET
			}
			this.setState({offset: offset, lastItem: false})
		}
	}

	getItemWidthWithPrevious(key) {
		let {itemWidth} = this.props
		return (itemWidth + ITEM_MARGIN_RIGHT) * (key + 1)
	}

	hasItemLeftArrow(key) {
		let width = this.getItemWidthWithPrevious(key)
		return width - this.state.offset < 70
	}

	hasItemRightArrow(key) {
		if (this.state.lastItem) {
			return false
		}
		return this.getVisibleWidth() + this.state.offset < this.getItemWidthWithPrevious(key)
	}

	isItemArrowed(key) {
		if (!this.state.sliderWidth) {
			return false
		}
		if (this.hasItemLeftArrow(key)) {
			return true
		}
		return this.hasItemRightArrow(key)
	}

	hasLeftArrow() {
		return this.state.offset
	}

	render() {
		let {list, title} = this.props
		let style = {}
		let itemStyle = {
			marginRight: ITEM_MARGIN_RIGHT,
		}
		style.transform = 'translate3d(' + - this.state.offset + 'px, 0px, 0px)'
		let hasRight = false
		return <div className="Slider" style={{maxWidth: this.props.deviceWidth}}>
			<Panel title={title}
						 noMargin={false}
						 noPaddingRight={true}
						 showAll={() => this.props.showAll()}>
				<div className="Slider__wrapper">
					<div className={"Slider__list"}
						 style={style}
						 ref={(el) => this.sliderList = el}>
						{list.map((item, key) => {
							let isArrowed = this.isItemArrowed(key)
							hasRight = this.hasItemRightArrow(key)
							return <div className={"Slider__item" + (isArrowed ? ' Slider__item--arrowed' : '')}
										key={key}
										style={key !== (list.length - 1) ? itemStyle : {}}>
								{this.props.renderItem(item, key)}
							</div>
						})}
					</div>
					{this.hasLeftArrow() ? <div className={"Slider__shadow Slider__shadow--left" +
						(!hasRight ? ' Slider__shadow--max' : '')}
												onClick={() => this.setOffset(true)}>
						<div className="Slider__shadow-wrapper">
							<div className="Slider__arrow Slider__arrow--left">
							</div>
							<div className="Slider__item-bg-opacity">
							</div>
						</div>
					</div> : null}
					{hasRight ? <div className={"Slider__shadow Slider__shadow--right" +
						(!this.hasLeftArrow() ? ' Slider__shadow--max' : '')}
									 onClick={() => this.setOffset(false)}>
						<div className="Slider__shadow-wrapper">
							<div className="Slider__arrow Slider__arrow--right">
							</div>
						</div>
					</div> : null}
				</div>
			</Panel>
		</div>
	}
}
