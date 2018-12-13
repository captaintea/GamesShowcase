import React from 'react'
import mount from "./tools/mount"
import Error from "./components/Error/Error"
import store from './store'
import VkSdk from "@happysanta/vk-sdk"
import {Provider} from "react-redux"
import L from "./lang/L"
import DesktopContainer from "./containers/DesktopContainer/DesktopContainer"
import MobileContainer from "./containers/MobileContainer/MobileContainer"
import './style/index.css'
import {initCoverList} from "./modules/CoverList"
import {initGameList} from "./modules/GameList"
import {initGameInfoList} from "./modules/GameInfoList"
import {initVideoList} from "./modules/VideoList"
import {initAdditionList} from "./modules/AdditionList"
import {initRequirementList} from "./modules/RequirementList"
import {initLaw} from "./modules/LawModule"
import {initCommunityList} from "./modules/CommunityList"
import {initHistory, setPageParams} from "./modules/Page"
import {initCommonInfoList} from "./modules/CommonInfoList"
import {initDescription} from "./modules/DescriptionModule"
import {setWarning} from "./modules/WarningModule"

VkSdk.init()
	.then(iFrameParams => L.init(iFrameParams.getLangCode()))
	.then(() => {

		// В настройках приложения должно быть указано, что веб версия лежит на
		// domain/app
		// а мобильная на domain/mobile. Иначе этот признак не будет работать.
		let isMobile = window.location.pathname.indexOf('/mobile') === 0

		initData()
		initHistory(store)
		store.dispatch(setPageParams({display_name: store.getState().GameList.title}))

		mount(<Provider store={store}>
			{isMobile ? <MobileContainer/> : <DesktopContainer/>}
		</Provider>)

	})
	.catch(e => {
		mount(<Error error={e}/>)
	})

function initData() {
	let coverListMock = [
		{url: 'https://games-showcase.vkforms.ru/cover_1.jpeg'},
		{url: 'https://games-showcase.vkforms.ru/cover_2.jpeg'},
		{url: 'https://games-showcase.vkforms.ru/cover_3.jpeg'},
	]
	store.dispatch(initCoverList(coverListMock))
	let gameListMock = [
		{
			name: 'PLAYERUNKNOWN\\\'S BATTLEGROUNDS',
			description: 'Игра',
			price: 1999,
			discount: 15,
			image_url: 'https://pp.userapi.com/c836125/v836125754/6661d/nOaF3744Mak.jpg',
			button_text: 'Купить игру',
			button_text_mobile: 'Купить',
			cashback: 149,
			sale_start_at: '15 ноября 2018 00:00',
			sale_finish_at: '25 ноября 2018 00:00',
		},
		/*{
			name: 'ONE ROW TITLE',
			price: 1999,
			image_url: 'https://pp.userapi.com/c836125/v836125754/6661d/nOaF3744Mak.jpg',
			button_text: 'Купить',
			button_text_mobile: 'Купить',
			cashback: 5,
			is_cashback_in_percent: true,
		},
		{
			name: 'ONE ROW',
			description: 'Description',
			price: 1999,
			discount: 15,
			image_url: 'https://pp.userapi.com/c836125/v836125754/6661d/nOaF3744Mak.jpg',
			button_text: 'Купить',
			button_text_mobile: 'Купить',
		},*/
	]
	let gameTitle = 'Far Cry 5'
	let shareText = 'PLAYERUNKNOWN\\\'S BATTLEGROUNDS - отличная игра'
	let shareImageUrl = 'https://pp.userapi.com/c836125/v836125754/6661d/nOaF3744Mak.jpg'
	let gameDescription = 'Округ Хоуп в штате Монтана захвачен фанатиками культа Врата Эдема. ' +
		'Дайте отпор Иосифу Сиду и его братьям. Разожгите огонь сопротивления. Дайте отпор Иосифу Сиду и его братьям.' +
		' Разожгите огонь сопротивления.'
	store.dispatch(initGameList(gameTitle, gameDescription, gameListMock, shareText, shareImageUrl))
	let warning = {text: 'Активация ключа возможна только на территории Российской Федерации и СНГ'}
	store.dispatch(setWarning(warning))
	let infoTitle = 'Информация об игре'
	let infoListMock = [
		{title: 'Жанр', description: 'Выживание, шутер, экшен'},
		{title: 'Дата выхода', description: '17 декабря 2017'},
		{title: 'Разработчик', description: 'PUBG Corporation'},
		{title: 'Издатель', description: 'PUBG Corporation'},
	]
	store.dispatch(initGameInfoList(infoTitle, infoListMock))
	let videoListTitle = 'Видео об игре'
	let videoListMock = [
		{
			url: 'https://vk.com/video-128033123_456242381',
			preview_image_url: 'https://sun9-3.userapi.com/c848520/v848520263/27e52/GgwaqxXSbdQ.jpg',
			title: 'Полуфиналы: как это было',
			duration: 3850,
		},
		{
			url: 'https://vk.com/video?z=video-24136539_456255850%2Fpl_cat_football_2018_block',
			preview_image_url: 'https://sun9-6.userapi.com/c824200/v824200701/17a070/I0pcoBNFwm8.jpg',
			title: 'ВСЕ ГОЛЫ ДНЯ НА ЧМ 2018/ОБЗОР МАТЧЕЙ. СБОРНАЯ МИРА ОТ 11 ИЮЛЯ',
			duration: 3071,
		},
		{
			url: 'https://vk.com/video?z=video-24136539_456255870%2Fpl_cat_football_2018_block',
			preview_image_url: 'https://sun9-7.userapi.com/c834401/v834401976/1886f4/RufYpF5YY1Q.jpg',
			title: 'ХОРВАТИЯ - АНГЛИЯ! 1:1! ВТОРОЙ ТАЙМ',
			duration: 97,
		},
		{
			url: 'https://vk.com/video?z=video-24136539_456255870%2Fpl_cat_football_2018_block',
			preview_image_url: 'https://sun9-7.userapi.com/c834401/v834401976/1886f4/RufYpF5YY1Q.jpg',
			title: 'ХОРВАТИЯ - АНГЛИЯ! 1:1! ВТОРОЙ ТАЙМ',
			duration: 9,
		},
		{
			url: 'https://vk.com/video?z=video-24136539_456255870%2Fpl_cat_football_2018_block',
			preview_image_url: 'https://sun9-7.userapi.com/c834401/v834401976/1886f4/RufYpF5YY1Q.jpg',
			title: 'ХОРВАТИЯ - АНГЛИЯ! 1:1! ВТОРОЙ ТАЙМ',
			duration: 97,
		},
	]
	store.dispatch(initVideoList(videoListTitle, videoListMock))
	let additionListTitle = 'Дополнения'
	//platforms: pc: 'ПК', ps3: 'PS3', ps4: 'PS4', xbox: 'XBOX'
	//instead_of_price: payment_code, fill_code
	//need to add platform/instead_of_price key to lang file (ex. lang/locales/ru) to add new platform/instead_of_price
	let additionListMock = [
		{
			image_url: 'https://loremflickr.com/272/272',
			name: 'Speed & Momentum Crate',
			url: 'https://vk.com/id0',
			show_price: false,
			platform: 'ps4',
			instead_of_price: 'fill_code',
		},
		{
			image_url: 'https://unsplash.it/272?random',
			name: 'Ghosted Crate',
			url: 'https://static.dl.mail.ru/WarfaceLoader.exe',
			show_price: false,
			platform: 'ps4',
			instead_of_price: 'payment_code',
			download_for_windows: true,
		},
		{
			image_url: 'https://picsum.photos/272?random',
			name: 'Bengal Tiger',
			price: 319,
			url: 'https://vk.com/id0',
			show_price: true,
			discount: 30,
			cashback: 34,
			platform: 'PS3',
		},
		{
			image_url: 'https://loremflickr.com/272/272',
			name: 'Speed & Momentum Crate',
			price: 564,
			url: 'https://vk.com/id0',
			show_price: true,
			platform: 'xbox',
		},
		{
			image_url: 'https://unsplash.it/272?random',
			name: 'Ghosted Crate',
			price: 556,
			url: 'https://vk.com/id0',
			show_price: true,
			cashback: 54,
			platform: 'pc',
		},
		{
			image_url: 'https://picsum.photos/272?random',
			name: 'Bengal Tiger',
			price: 319,
			url: 'https://vk.com/id0',
			show_price: true,
			discount: 30,
			platform: 'ps4',
		},
	]
	store.dispatch(initAdditionList(additionListTitle, additionListMock))
	let description = {
		title: 'Подробнее об игре',
		code_short: <div>
			<h2>Что такое Shroud of the Avatar?</h2>
			<p>
				Shroud of the Avatar: Forsaken Virtues это новый вид RPG от третьего лица,
				который сочетает нарративность однопользовательской игры с ММО «песочницей». <br/>
				Она создается командой, в которую входят: Ричард «Lord British» Гэрриот – создатель серии игр «Ultima»,
				Старр Лонг – изначальный руководитель «Ultima Online» и Трейси Хикмен...
			</p>
		</div>,
		code: <div>
			<h2>Что такое Shroud of the Avatar?</h2>
			<p>
				Shroud of the Avatar: Forsaken Virtues это новый вид RPG от третьего лица,
				который сочетает нарративность однопользовательской игры с ММО «песочницей». <br/>
				Она создается командой, в которую входят: Ричард «Lord British» Гэрриот – создатель серии игр «Ultima»,
				Старр Лонг – изначальный руководитель «Ultima Online» и Трейси Хикмен – автор
				знаменитых романов по вселенной Dragonlance и множества модулей Dungeons & Dragons.
			</p>
			<p>
				Shroud of the Avatar часто ставит персонажей перед нелегким выбором.
				Действия игрока приводят к глубоким и подчас неочевидным последствиям в мире новой Британнии,
				поддерживая или разрушая принципы Истины, Любви и Отваги.
			</p>
			<h2>Ключевые особенности</h2>
			<p>
				Возвращаясь к истокам классических RPG, Shroud of the Avatar сочетает в себе множество
				ключевых особенностей, которые сделали серию Ultima такой популярной.
			</p>
			<ul>
				<li>
					Эпизодический контент: Shroud of the Avatar будет состоять из пяти эпизодов, в которых будут поведаны истории о добродетелях, созданные Ричардом Гэрриотом и Трейси Хикменом. Все они имеют предыстории в виде серии романов, первый из которых называется «Blade of the Avatar». Forsaken Virtues это название первого эпизода (доступ к которому вы можете приобрести).
				</li>
				<li>
					Боевая система: Совершенно новый подготовки и самого боя для RPG. Вы сможете создать колоду из навыков, доступный вам набор боевых умений будет динамически меняться во время боя.
				</li>
				<li>
					PvP: Открытые PvP флаги, специальные зоны, а также войны между гильдиями.
				</li>
				<li>
					Жилье игроков: Все здания, принадлежащие игрокам, являются частью единого общего мира и находятся вне инстансов. Число мест под застройку ограничено. Также имеются возможности для сожительства.
				</li>
				<li>
					Управляемая игроками экономика: Продуманная система ремесел, благодаря которой лучшие предметы может изготовить только игрок.
				</li>
				<li>
					Заплати один раз и играй: Никаких регулярных платежей. Каждый эпизод потребует единовременной оплаты, а абсолютно все, что можно найти в игре, возможно приобрести за внутриигровое золото.
				</li>
				<li>
					Социальная составляющая: Полноценная система гильдий, высокоактивное сообщество и города, полностью созданные и управляемые игроками.
				</li>
				<li>
					Открытая разработка: Игроки помогают сформировать игру при помощи своих отзывов о ежемесячных релизах, видеороликах, еженедельных обновлениях, постах в блогах, на форумах и т.п.
				</li>
			</ul>
			<h2>Доступные режимы игры</h2>
			<ul className="bulleted">
				<li>
					Однопользовательский оффлайн режим: Игроков ждет более чем 40 часов сюжета в интерактивном мире, где их решения будут иметь последствия, этические парадоксы, а также возможность вплести нить своей истории в полотно мира.
				</li>
				<li>
					Однопользовательский онлайн режим: Отличается от оффлайн режима только возможностью взаимодействовать с предметами и НПС, созданными другими игроками (такими как здания и торговцы).
				</li>
				<li>
					Командный онлайн режим: Исследуйте мир в компании друзей и творите историю совместными усилиями! Вы также сможете взаимодействовать с предметами и НПС, созданными другими игроками (такими как здания и торговцы).
				</li>
				<li>
					Многопользовательский онлайн режим: Станьте частью общего мира с его торговлей, сражениями и политикой вместе с тысячами других игроков, играющих на одном сервере.
				</li>
			</ul>
		</div>
	}
	store.dispatch(initDescription(description))
	let requirementListTitle = 'Системные требования'
	let requirementListMock = [
		{
			platform: 'Windows',
			block_list: [
				{
					title: 'Минимальные',
					list: [
						{
							feature: 'ОС',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Процессор',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Оперативная память',
							requirement: '8 GB ОЗУ',
						},
						{
							feature: 'Видеокарта',
							requirement: 'NVIDIA GeForce GTX 960 2GB /AMD Radeon R7 370 2GB',
						},
						{
							feature: 'DirectX',
							requirement: 'Версии 11',
						},
						{
							feature: 'Сеть',
							requirement: 'Широкополосное подключение к интернету',
						},
						{
							feature: 'Место на диске',
							requirement: '30 GB',
						},
					],
				},
				{
					title: 'Рекомендованные',
					list: [
						{
							feature: 'ОС',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Процессор',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Оперативная память',
							requirement: '8 GB ОЗУ',
						},
						{
							feature: 'Видеокарта',
							requirement: 'NVIDIA GeForce GTX 960 2GB /AMD Radeon R7 370 2GB',
						},
						{
							feature: 'DirectX',
							requirement: 'Версии 11',
						},
						{
							feature: 'Сеть',
							requirement: 'Широкополосное подключение к интернету',
						},
						{
							feature: 'Место на диске',
							requirement: '30 GB',
						},
					],
				},
			]
		},
		{
			platform: 'MAC',
			block_list: [
				{
					title: 'Минимальные',
					list: [
						{
							feature: 'ОС',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Процессор',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Оперативная память',
							requirement: '8 GB ОЗУ',
						},
						{
							feature: 'Видеокарта',
							requirement: 'NVIDIA GeForce GTX 960 2GB /AMD Radeon R7 370 2GB',
						},
						{
							feature: 'DirectX',
							requirement: 'Версии 11',
						},
						{
							feature: 'Сеть',
							requirement: 'Широкополосное подключение к интернету',
						},
						{
							feature: 'Место на диске',
							requirement: '30 GB',
						},
					],
				},
				{
					title: 'Стандартные',
					list: [
						{
							feature: 'ОС',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Процессор',
							requirement: '64-bit Windows 7, Windows 8.1, Windows 10',
						},
						{
							feature: 'Оперативная память',
							requirement: '8 GB ОЗУ',
						},
						{
							feature: 'Видеокарта',
							requirement: 'NVIDIA GeForce GTX 960 2GB /AMD Radeon R7 370 2GB',
						},
						{
							feature: 'DirectX',
							requirement: 'Версии 11',
						},
						{
							feature: 'Сеть',
							requirement: 'Широкополосное подключение к интернету',
						},
						{
							feature: 'Место на диске',
							requirement: '30 GB',
						},
					],
				},
			]
		},
	]
	store.dispatch(initRequirementList(requirementListTitle, requirementListMock))
	let law = {
		text: '© 2017 PUBG CORPORATION ALL RIGHTS RESERVED \n' +
		'PLAYERUNKNOWN\'S BATTLEGROUNDS and PUBG are registered trademarks, trademarks or service marks of PUBG',
	}
	let commonInfoTitle = 'Дополнительная информация'
	let commonInfoListMock = [
		{
			title: 'Инструкция по погашению',
			list: [
				{text: 'Создайте учетную запись Sony на сайте [https://playstation.com/|playstation.com]'},
				{text: 'Авторизируйтесь в PlayStationStore или в онлайн магазине Sony'},
				{text: 'Выберите пункт «Погашение кодов»'},
				{text: 'Введите 12 цифр цифрового кода и нажмите «Продолжить»'},
				{text: 'Далее следуйте инструкциям на экране'},
			],
		},
		{
			title: 'Бесплатная техническая поддержка',
			is_bulleted: true,
			list: [
				{text: 'Электронная почта [mailto:networksupport@ru.playstation.com|networksupport@ru.playstation.com]'},
				{text: 'Тел 8-800-200-76-67'},
			],
		},
	]
	store.dispatch(initCommonInfoList(commonInfoTitle, commonInfoListMock))
	let communityTitle = 'Сообщества игры'
	let communityListMock = [
		{
			url: 'https://vk.com/pubg',
			title: 'PUBG Mail.Ru',
			description: 'Русскоязычная версия',
			image_url: 'https://pp.userapi.com/c836125/v836125754/6661d/nOaF3744Mak.jpg',
		},
		{
			url: 'https://vk.com/playpubg',
			title: 'PLAYERUNKNOWN\'S BATTLEGROUNDS',
			description: 'Официальное сообщество',
			image_url: 'https://pp.userapi.com/c837630/v837630554/49368/r_CWGsLkddI.jpg',
		},
		{
			url: 'https://vk.com/pubgmobile',
			title: 'PUBG MOBILE',
			description: 'Мобильная версия',
			image_url: 'https://pp.userapi.com/c834102/v834102940/fe3bf/j9zrSA9xD0Y.jpg',
		},
	]
	store.dispatch(initCommunityList(communityTitle, communityListMock))
	store.dispatch(initLaw(law))
}
