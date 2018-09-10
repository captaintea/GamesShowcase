import React, {Component} from 'react'
import './style/Popup.css'
import VkSdk from "@happysanta/vk-sdk"

export default class Popup extends Component {

	state = {
		scrollTop: 0,
		positionCalculated: false,
	}

	body = null

	componentDidMount() {
		if (this.body) {
			VkSdk.getScrollPosition((scrollY, windowHeight, vkOffset) => {
				this.setState({
					scrollTop: (scrollY - vkOffset) + (windowHeight - this.body.clientHeight) / 2,
					positionCalculated: true,
				})
			})
		}
	}

	close(e) {
		this.props.onClose()
		e.stopPropagation()
	}

	render() {
		let style = {}
		if (this.state.positionCalculated) {
			style = {
				paddingTop: this.state.scrollTop,
				opacity: 1,
			}
		}
		return <div onClick={(e) => this.close(e)} className="Popup">
			<div className="Popup__wrapper" style={style}>
				<div className="Popup__window"
					 onClick={ (e) => {
						 e.stopPropagation()
						 return false
					 } }>
					<div onClick={ (e) => this.close(e) } className="Popup__close">
					</div>
					<div className="Popup__body" ref={el => this.body = el}>
						{this.props.children}
					</div>
				</div>
			</div>
		</div>
	}

}
