import React, {Component} from "react"
import {connect} from "react-redux"
import VkSdk from "@happysanta/vk-sdk"
import './DesktopContainer.css'
import Carousel from "../../components/Carousel/Carousel"
import GameSingle from "../../components/GameSingle/GameSingle"
import GameInfo from "../../components/GameInfo/GameInfo"
import VideoList from "../../components/VideoList/VideoList"
import {PAGE_ADDITION, PAGE_MAIN, PAGE_VIDEO} from "../../modules/Page"
import PageVideo from "../../components/PageVideo/PageVideo"
import AdditionList from "../../components/AdditionList/AdditionList"
import PageAddition from "../../components/PageAddition/PageAddition"
import RequirementList from "../../components/RequirementList/RequirementList"
import CommunityList from "../../components/CommunityList/CommunityList"
import Law from "../../components/Law/Law"
import GameList from "../../components/GameList/GameList"
import CommonInfoList from "../../components/CommonInfoList/CommonInfoList"
import Description from "../../components/Description/Description"

class DesktopContainer extends Component {


    state = {}

    constructor(props) {
        super(props)

        window.onChangeHeight = (force = false) => {
            this.fixHeight(force)
        }

        window.addFrameHeight = (height) => {
            this.addFrameHeight(height)
        }
    }

    componentDidMount() {
        this.afterRender()
    }

    componentDidUpdate() {
        this.afterRender()
    }


    afterRender() {
        this.fixHeight()
    }

    fixHeight(force) {
        let {clientHeight, clientWidth} = document.body
        clientWidth = Math.max(655, clientWidth)
        let newHeight = false
        let newWidth = false
        if (force || clientHeight !== this.lastHeight) {
            newHeight = this.lastHeight = clientHeight
        }
        if (clientWidth !== this.lastWidth) {
            newWidth = this.lastWidth = clientWidth
        }
        if (newWidth || newHeight) {
            this.resizeWindow(newWidth || this.lastWidth, newHeight || this.lastHeight)
        }
    }

    resizeWindow(width, height) {
        VkSdk.resize(width, height)
            .then(res => {
                let w = res.width
                let h = res.height
                if (w !== width || h !== height) {
                    let update = {}
                    if (w !== width) {
                        update.realWidth = w
                    }
                    if (h !== height) {
                        update.realHeight = h
                    }
                    this.setState(update)
                } else if (this.state.realWidth || this.state.realHeight) {
                    this.setState({realWidth: false, realHeight: false})
                }

            })
    }

    renderMainPage() {
    	let {isSingleGame} = this.props
		return <div className="DesktopContainer">
			<Carousel/>
			{isSingleGame ?
				<GameSingle/>
				:
				<GameList/>
			}
			<div className="DesktopContainer__divider">
				<div className="DesktopContainer__line">
				</div>
			</div>
			<GameInfo/>
			<VideoList/>
			<AdditionList/>
			<Description/>
			<RequirementList/>
			<CommonInfoList/>
			<CommunityList/>
			<Law/>
		</div>
	}

	renderVideoPage() {
    	return <div className="DesktopContainer">
			<PageVideo/>
		</div>
	}

	renderAdditionPage() {
		return <div className="DesktopContainer">
			<PageAddition/>
		</div>
	}

    renderPage(page) {
    	switch (page) {
			case PAGE_MAIN:
				return this.renderMainPage()
			case PAGE_VIDEO:
				return this.renderVideoPage()
			case PAGE_ADDITION:
				return this.renderAdditionPage()
			default:
				return null
		}
	}

    render() {
    	return this.renderPage(this.props.page)
    }
}

function mapStateToProps(state) {
	return {
		page: state.Page.name,
		isSingleGame: state.GameList.list.length <= 1,
	}
}

export default connect(mapStateToProps, {})(DesktopContainer)
