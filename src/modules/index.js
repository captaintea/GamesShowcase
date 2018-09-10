import {combineReducers} from "redux"
import Page from "./Page"
import CoverList from "./CoverList"
import GameList from "./GameList"
import GameInfoList from "./GameInfoList"
import VideoList from "./VideoList"
import AdditionList from "./AdditionList"
import RequirementList from "./RequirementList"
import CommonInfoList from "./CommonInfoList"
import CommunityList from "./CommunityList"
import LawModule from "./LawModule"
import DescriptionModule from "./DescriptionModule"
import WarningModule from "./WarningModule"
import PaymentModule from "./PaymentModule"

export default combineReducers({
	Page,
	CoverList,
	GameList,
	GameInfoList,
	VideoList,
	AdditionList,
	RequirementList,
	CommonInfoList,
	CommunityList,
	LawModule,
	DescriptionModule,
	WarningModule,
	PaymentModule,
})
