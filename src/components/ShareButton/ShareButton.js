import React, {Component} from "react"
import {connect} from "react-redux"
import "./ShareButton.css"
import L from "../../lang/L"
import VkSdk from "@happysanta/vk-sdk/index"
import {getAppLink} from "../../tools/helpers"

class ShareButton extends Component {

	share() {
		let {imageUrl, shareText} = this.props
		VkSdk.desktopShare(getAppLink(), imageUrl, shareText)
	}

	render() {
		return <div className="ShareButton">
			<button className="Button Button--white" onClick={() => this.share()}>
				<span className="ShareButton__share-icon">
				</span>
				<span>
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

export default connect(map, {})(ShareButton)
