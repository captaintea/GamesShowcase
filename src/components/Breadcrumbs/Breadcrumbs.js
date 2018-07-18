import React, {Component} from "react"
import {connect} from "react-redux"
import "./Breadcrumbs.css"
import {popPage} from "../../modules/Page"

class Breadcrumbs extends Component {

    onLinkedItemClick(page, key) {
    	let pathLength = this.props.page.path.length
		let popCount = pathLength - (key)
    	for (let i = 1; i <= popCount; ++i) {
    		this.props.popPage()
		}
    }

    getBreadcrumbs() {
    	let page = this.props.page
		return page.path.concat([{name: page.name, params: page.params}])
	}

	render() {
	    let {isMobile} = this.props
        let classList = ['Breadcrumbs']
        if (isMobile) {
	        classList.push(['Breadcrumbs--mobile'])
        }
        let breadcrumbs = this.getBreadcrumbs()
		let lastItemKey = breadcrumbs.length - 1
		return <div className={classList.join(' ')}>
			<div className="Breadcrumbs__item-wrapper">
                {breadcrumbs.map((item, key) => {
                    if (key !== lastItemKey) {
                        return <div className="Breadcrumbs__item Breadcrumbs__item--linked"
                                    onClick={() => this.onLinkedItemClick(item.page, key)}
                                    key={key}>
                            {item.params.display_name}
                        </div>
                    } else {
                        return <div className="Breadcrumbs__item Breadcrumbs__item--final" key={key}>
							{item.params.display_name}
                        </div>
                    }
                })}
            </div>
		</div>
	}
}

function map(state) {
	return {
		page: state.Page,
	}
}

export default connect(map, {popPage})(Breadcrumbs)
