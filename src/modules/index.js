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
})
