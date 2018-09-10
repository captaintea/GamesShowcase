import React, {Component} from 'react'
import {connect} from 'react-redux'
import "./MobileContainer.css"
import CarouselMobile from "../../components/CarouselMobile/CarouselMobile"
import GameSingleMobile from "../../components/GameSingleMobile/GameSingleMobile"
import GameInfoMobile from "../../components/GameInfoMobile/GameInfoMobile"
import VideoListMobile from "../../components/VideoListMobile/VideoListMobile"
import AdditionListMobile from "../../components/AdditionListMobile/AdditionListMobile"
import RequirementListMobile from "../../components/RequirementListMobile/RequirementListMobile"
import LawMobile from "../../components/LawMobile/LawMobile"
import CommunityListMobile from "../../components/CommunityListMobile/CommunityListMobile"
import GameListMobile from "../../components/GameListMobile/GameListMobile"
import {PAGE_ADDITION, PAGE_MAIN, PAGE_VIDEO, POPUP_EMAIL, POPUP_ERROR, setPageParams} from "../../modules/Page"
import PageVideoMobile from "../../components/PageVideoMobile/PageVideoMobile"
import PageAdditionMobile from "../../components/PageAdditionMobile/PageAdditionMobile"
import CommonInfoListMobile from "../../components/CommonInfoListMobile/CommonInfoListMobile"
import DescriptionMobile from "../../components/DescriptionMobile/DescriptionMobile"
import PopupMobile from "../../components/PopupMobile/PopupMobile"
import EmailMobile from "../../components/EmailMobile/EmailMobile"
import WaitScreenMobile from "../../components/WaitScreenMobile/WaitScreenMobile"
import ServerErrorMobile from "../../components/ServerErrorMobile/ServerErrorMobile"

class MobileContainer extends Component {

	static deviceWidth = null
	static deviceHeight = null

	constructor(props) {
		super(props)

        if (MobileContainer.deviceWidth === null) {
            MobileContainer.deviceWidth = window.innerWidth
        }

        if (MobileContainer.deviceHeight === null) {
            MobileContainer.deviceHeight = window.innerHeight
        }

        if ( this.isWidthInitiated() ) {
            this.recheckWidth()
        }
	}

    recheckWidth() {
        if ( this.isWidthInitiated() ) {
            setTimeout( () => {
                try {
                    MobileContainer.deviceWidth = document.documentElement.offsetWidth
                } catch (e) {
                    MobileContainer.deviceWidth = window.innerWidth
                }
                this.setState({ time: Date.now() })
                this.recheckWidth()
            }, 100 )
        }
    }

    isWidthInitiated() {
		return MobileContainer.deviceWidth > 10
	}

	scrollTop() {
		if (this.scrollNode) {
			this.scrollNode.scrollTop = 0
		}
	}

	onPopupClose() {
		this.props.setPageParams({})
	}

	renderPopupContent() {
		switch (this.props.popup) {
			case POPUP_EMAIL:
				return <EmailMobile/>
			case POPUP_ERROR:
				return <ServerErrorMobile message={this.props.paymentError}/>
			default:
				return null
		}
	}

	renderMainPage() {
		let {isSingleGame} = this.props
		return <div className="MobileContainer">
			<CarouselMobile deviceWidth={MobileContainer.deviceWidth} deviceHeight={MobileContainer.deviceHeight}/>
			{isSingleGame ?
				<GameSingleMobile/>
				:
				<GameListMobile deviceWidth={MobileContainer.deviceWidth} deviceHeight={MobileContainer.deviceHeight}/>
			}
			<GameInfoMobile/>
			<VideoListMobile deviceWidth={MobileContainer.deviceWidth}
							 deviceHeight={MobileContainer.deviceHeight}
							 scrollTop={() => this.scrollTop()}/>
			<AdditionListMobile deviceWidth={MobileContainer.deviceWidth}
								deviceHeight={MobileContainer.deviceHeight}
								scrollTop={() => this.scrollTop()}/>
			<DescriptionMobile/>
			<RequirementListMobile/>
			<CommonInfoListMobile/>
			<CommunityListMobile deviceWidth={MobileContainer.deviceWidth} deviceHeight={MobileContainer.deviceHeight}/>
			<LawMobile/>
		</div>
	}

	renderPage(page) {
		switch (page) {
			case PAGE_MAIN:
				return this.renderMainPage()
			case PAGE_VIDEO:
				return <PageVideoMobile scrollTop={() => this.scrollTop()}/>
			case PAGE_ADDITION:
				return <PageAdditionMobile scrollTop={() => this.scrollTop()}/>
			default:
				return null
		}
	}

	render() {
		let wrapperStyle = {
			height: MobileContainer.deviceHeight
		}
		return <div className="MobileContainer">
			<div style={wrapperStyle}
				 ref={node => this.scrollNode = node}
				 className="MobileContainer__wrapper">
				{this.renderPage(this.props.page)}
				{this.props.popup && !this.props.loading ? <div style={wrapperStyle}
										 onClick={() => this.onPopupClose()}
										 className="MobileContainer__shadow">
					<div onClick={e => e.stopPropagation()}>
						<PopupMobile onClose={() => this.onPopupClose()}>
							{this.renderPopupContent()}
						</PopupMobile>
					</div>
				</div> : null}
				{this.props.loading ? <WaitScreenMobile deviceHeight={MobileContainer.deviceHeight}/> : null}
			</div>
		</div>


	}
}

function mapStateToProps(state) {
	return {
		page: state.Page.name,
		isSingleGame: state.GameList.list.length <= 1,
		popup: state.Page.params.popup,
		loading: state.PaymentModule.loading,
		paymentError: state.PaymentModule.error,
	}
}

export default connect(mapStateToProps, {setPageParams})(MobileContainer)
