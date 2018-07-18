import React, {Component} from "react"
import {connect} from "react-redux"
import "./ShareButtonMobile.css"
import L from "../../lang/L"
import VkSdk from "@happysanta/vk-sdk/index"
import {getAppLink} from "../../tools/helpers"

class ShareButtonMobile extends Component {

	share() {
		let {imageUrl, shareText} = this.props
		VkSdk.mobileShare(getAppLink(), imageUrl, shareText)
	}

	render() {
		let {marginTop, marginBottom} = this.props
		let style = {}
		if (marginTop) {
			style.marginTop = marginTop
		}
		if (marginBottom) {
			style.marginBottom = marginBottom
		}
		return <div className="ShareButtonMobile" style={style}>
			<button className="Button Button--light mobile" onClick={() => this.share()}>
				<span className="ShareButtonMobile__share">
					{L.t('share')}
				</span>
			</button>
		</div>
	}
}

function map(state) {
	return {

	}
}

export default connect(map, {})(ShareButtonMobile)
