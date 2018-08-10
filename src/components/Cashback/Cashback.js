import React, {Component} from "react"
import "./Cashback.css"
import L from "../../lang/L"

export default class Cashback extends Component {

	state = {
		show: 0
	}

	t = null

	show() {
		clearTimeout(this.t)
		if (this.state.show === 0) {
			this.setState({show: 1}, () => {
				setTimeout(() => {
					if (this.state.show === 1) {
						this.setState({show: 2})
					}
				}, 10)
			})
		}
	}

	hide() {
		clearTimeout(this.t)
		this.t = setTimeout( () => {
			if (this.state.show === 2) {
				this.setState({show: 1}, () => {
					setTimeout(() => {
						if (this.state.show === 1) {
							this.setState({show: 0})
						}
					}, 300)
				})
			}
		}, 300 )
	}

	dropHide() {
		clearTimeout(this.t)
	}

	render() {
		let {cashback, dotBefore} = this.props
		let show = this.state.show
		let classList = ['Cashback']
		if (dotBefore) {
			classList.push('Cashback--dot-before')
		}
		return <div className={classList.join(' ')}>
			<div className="Cashback__wrapper">
				<div className="Cashback__logo"
					 onMouseEnter={ e => this.show() }
					 onMouseLeave={ e => this.hide() }>
					{ show ? <div onMouseLeave={ e => this.hide() }
								  onMouseEnter={ e => this.dropHide() }
								  onMouseMove={ e => this.dropHide() }
								  className={"Cashback__tooltip" + (show === 2 ? ' Cashback__tooltip--show' : '') + (this.props.center ? ' Cashback__tooltip--center' : '') }>
						{L.t('buy_cashback')}
					</div> : null}
				</div>
				<div className="Cashback__text">
					{cashback}
				</div>
			</div>
		</div>
	}
}
