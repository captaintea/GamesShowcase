import React, {Component} from 'react'
import './style/WaitScreen.css';
import VkSdk from "@happysanta/vk-sdk/index"

export default class WaitScreen extends Component {

	state = {scrollTop: 0}

	content = null

	constructor(props) {
		super(props)
		let offset = this.props.offset ? this.props.offset : null
		VkSdk.getScrollPosition((scrollY, windowHeight, vkOffset) => {
			this.setState({scrollTop: (scrollY - vkOffset) + (windowHeight- offset) / 2})
		})
	}

    render() {
		let style = {
			paddingTop: this.state.scrollTop,
		}
        return <div className="WaitScreen" ref={el => this.content = el}>
            <div style={style} className="WaitScreen__wrapper">
                <div className="WaitScreen__animation">
                    <div className="bg"></div>
                </div>
            </div>            
        </div>
    }
}
